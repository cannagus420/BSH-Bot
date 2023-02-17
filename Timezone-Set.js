const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
const moment = require('moment-timezone');

if (!context.params.event.member.permission_names.includes(`ADMINISTRATOR`)) {
  console.log(`not admin`);
  await lib.discord.interactions['@1.0.0'].responses.ephemeral.create({
    token: `${context.params.event.token}`,
    content: `Sorry <@${context.params.event.member.user.id}>, You need to be an \`ADMINISTRATOR\` to use this menu.`,
  });
  return;
}
let oldTimeZone = await lib.utils.kv['@0.1.16'].get({
  key: `AM_timeZone${context.params.event.guild_id}`,
  defaultValue: `Asia/Calcutta`,
});

let newTimeZone = context.params.event.data.options[0].value;
console.log(newTimeZone);

if (moment.tz.zone(`${newTimeZone}`)) {
  await lib.utils.kv['@0.1.16'].set({
    key: `AM_timeZone${context.params.event.guild_id}`,
    value: `${newTimeZone}`,
  });
  await lib.discord.interactions['@1.0.0'].responses.ephemeral.create({
    token: `${context.params.event.token}`,
    content: `Set \`${newTimeZone}\` as the Current TimeZone.`,
  });
} else {
  await lib.discord.interactions['@1.0.0'].responses.ephemeral.create({
    token: `${context.params.event.token}`,
    content: `${newTimeZone} is not a valid timezone, Use \`timezone-list\` to view all avalible timezones.`,
  });
  return;
}

//log function
let activeNodes = await lib.utils.kv.get({
  key: `AM_activeNodes_${context.params.event.guild_id}`,
  defaultValue: `[ 'mainOption-staff-channelCommands', 'mainOption-staff-userCommands' ]`,
});
if (activeNodes.includes(`mainOption-loggingChannel`)) {
  try {
    let formattedTime = moment(context.params.event.received_at)
      .tz(`${newTimeZone}`)
      .format('DD/MM/YYYY - hh:mm');
    console.log(formattedTime);
    await lib.discord.channels['@0.3.0'].messages.create({
      channel_id: `${process.env.logChannelId}`,
      content: '',
      tts: false,
      embeds: [
        {
          type: 'rich',
          title: `TimeZone Changed`,
          description: ``,
          color: 0x4daded, //blue
          fields: [
            {
              name: `**Moderator**`,
              value: `<@${context.params.event.member.user.id}>`,
              inline: true,
            },
            {
              name: `**Time Zone**`,
              value: `Was: ${oldTimeZone}\nNow: ${newTimeZone}`,
              inline: true,
            },
          ],
          footer: {
            text: `User Id: ${context.params.event.member.user.id} • ${formattedTime}`,
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
