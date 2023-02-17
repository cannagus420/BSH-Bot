const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
const moment = require('moment-timezone');
if (!context.params.event.member.permission_names.includes(`MANAGE_CHANNELS`)) {
  console.log(`not admin`);
  await lib.discord.interactions['@1.0.0'].responses.ephemeral.create({
    token: `${context.params.event.token}`,
    content: `Sorry <@${context.params.event.member.user.id}>, You require the permission \`MANAGE_CHANNELS\` to use this command.`,
  });
  return;
}
let channelsMention = ``;
let channels = ``;
for (let i = 0; i < context.params.event.data.options.length; i++) {
  channels = channels + `_` + context.params.event.data.options[i].value;
  channelsMention =
    channelsMention + ` <#${context.params.event.data.options[i].value}>,`;
}
await lib.utils.kv.set({
  key: `AM_lockdownChannels_${context.params.event.guild_id}`,
  value: channels,
});
await lib.discord.interactions['@1.0.0'].responses.ephemeral.create({
  token: `${context.params.event.token}`,
  content: `✅ Your Options have been Saved!`,
});
console.log(channels);
console.log(channelsMention);
let activeNodes = await lib.utils.kv.get({
  key: `AM_activeNodes_${context.params.event.guild_id}`,
});
let timeZone = await lib.utils.kv['@0.1.16'].get({
  key: `AM_timeZone${context.params.event.guild_id}`,
  defaultValue: `Asia/Calcutta`,
});
let formattedTime = moment(context.params.event.received_at)
  .tz(`${timeZone}`)
  .format('DD/MM/YYYY - hh:mm');
console.log(formattedTime);
if (activeNodes.includes(`mainOption-loggingChannel`)) {
  try {
    let date = context.params.event.received_at.split('T')[0];
    let time = context.params.event.received_at.split('T')[1].split('.')[0];
    await lib.discord.channels['@0.3.0'].messages.create({
      channel_id: `${process.env.logChannelId}`,
      content: '',
      tts: false,
      embeds: [
        {
          type: 'rich',
          title: `Lockdown Settings Changed`,
          description: ``,
          color: 0x4daded, //blue
          fields: [
            {
              name: `**Moderator**`,
              value: `<@${context.params.event.member.user.id}>`,
              inline: true,
            },
            {
              name: `**Selected Channels**`,
              value: channelsMention ? `${channelsMention}` : `None`,
              inline: true,
            },
          ],
          footer: {
            text: `Moderator Id: ${context.params.event.member.user.id} • ${formattedTime}`,
          },
        },
      ],
    });
    console.log(`logged`);
    return;
  } catch (e) {
    console.log(e);
    await lib.discord.interactions['@1.0.0'].responses.ephemeral.create({
      token: `${context.params.event.token}`,
      content: `Sorry <@${context.params.event.member.user.id}>, There was an error when logging the command. Please check the ID in the environment variables is correct, or deactivate the logging Node with \`/select-nodes\`.`,
    });
  }
}
