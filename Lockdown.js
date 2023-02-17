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
let activeNodes = await lib.utils.kv.get({
  key: `AM_activeNodes_${context.params.event.guild_id}`,
  defaultValue: `[ 'mainOption-staff-channelCommands', 'mainOption-staff-userCommands' ]`,
});
console.log(activeNodes);
if (!activeNodes.includes(`mainOption-staff-channelCommands`)) {
  await lib.discord.interactions['@1.0.0'].responses.ephemeral.create({
    token: `${context.params.event.token}`,
    content: `Sorry <@${context.params.event.member.user.id}>, this Node is not activated. If you believe this is an error, please use \`/select-nodes\`.`,
  });
  return;
}
const everyone = await lib.discord.guilds['@0.1.0'].roles
  .list({guild_id: `${context.params.event.guild_id}`})
  .then((roles) => roles.find((x) => x.id === '941781614340505600'));
let lockdownChannels = await lib.utils.kv.get({
  key: `AM_lockdownChannels_${context.params.event.guild_id}`,
});
if (!lockdownChannels) {
  await lib.discord.interactions['@1.0.0'].responses.ephemeral.create({
    token: `${context.params.event.token}`,
    content: `Sorry <@${context.params.event.member.user.id}>. Please use \`/lockdown-set\` to select which channels get locked.`,
  });
  return;
}
let channelsMention = ``;
let message = context.params.event.data.options[0]
  ? context.params.event.data.options[0].value
  : `Lockdown commenced by <@${context.params.event.member.user.id}>, use \`/unlockdown\` to unlock the chats.`;
for (let i = 1; i < lockdownChannels.split(`_`).length; i++) {
  await lib.discord.channels['@0.1.1'].permissions.update({
    overwrite_id: `${everyone.id}`,
    channel_id: `${lockdownChannels.split(`_`)[i]}`,
    deny: `${1 << 11}`,
    type: 0,
  });
  channelsMention = channelsMention + ` <#${lockdownChannels.split(`_`)[i]}>`;
  await lib.discord.channels['@0.3.0'].messages.create({
    channel_id: `${lockdownChannels.split(`_`)[i]}`,
    content: '',
    tts: false,
    embeds: [
      {
        type: 'rich',
        title: `🔒 This channel is now Locked`,
        description: `${message}`,
        color: 0xf32f2f, //red
      },
    ],
  });
}
await lib.discord.interactions['@1.0.0'].followups.ephemeral.create({
  token: `${context.params.event.token}`,
  content: `🔒 Lockdown Complete! Locked ${channelsMention}.`,
}); //log function
if (activeNodes.includes(`mainOption-loggingChannel`)) {
  try {
    let timeZone = await lib.utils.kv['@0.1.16'].get({
      key: `AM_timeZone${context.params.event.guild_id}`,
      defaultValue: `Asia/Calcutta`,
    });
    let formattedTime = moment(context.params.event.received_at)
      .tz(`${timeZone}`)
      .format('DD/MM/YYYY - hh:mm');
    console.log(formattedTime);
    await lib.discord.channels['@0.3.0'].messages.create({
      channel_id: `${process.env.logChannelId}`,
      content: '',
      tts: false,
      embeds: [
        {
          type: 'rich',
          title: `🔒 Lockdown`,
          description: ``,
          color: 0xf32f2f, //red
          fields: [
            {
              name: `**Channels Locked**`,
              value: `${channelsMention}`,
              inline: true,
            },
            {
              name: `**Moderator**`,
              value: `<@${context.params.event.member.user.id}>`,
              inline: true,
            },
            {
              name: `**Message**`,
              value: message ? `${message}` : `Unspecified`,
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

