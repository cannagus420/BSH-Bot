const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
const moment = require('moment-timezone');

if (!context.params.event.member.permission_names.includes(`MANAGE_MESSAGES`)) {
  console.log(`not admin`);
  await lib.discord.interactions['@1.0.0'].responses.ephemeral.create({
    token: `${context.params.event.token}`,
    content: `Sorry <@${context.params.event.member.user.id}>, You require the permission \`MANAGE_MESSAGES\` to use this command.`,
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

let rateLimit = context.params.event.data.options[0].value;
if (rateLimit > 21600 || rateLimit < 0) {
  await lib.discord.interactions['@1.0.0'].responses.ephemeral.create({
    token: `${context.params.event.token}`,
    content: `Sorry <@${context.params.event.member.user.id}>, Slowmode can only be set from 0 to 21600 seconds.`,
  });
  return;
}

let channelInfo = await lib.discord.channels['@0.3.0'].retrieve({
  channel_id: `${context.params.event.channel_id}`,
});
await lib.discord.channels['@0.1.1'].update({
  channel_id: `${context.params.event.channel_id}`,
  rate_limit_per_user: parseInt(rateLimit) || 0,
});
if (rateLimit === 0) {
  await lib.discord.channels['@0.3.0'].messages.create({
    channel_id: `${context.params.event.channel_id}`,
    content: '',
    tts: false,
    embeds: [
      {
        type: 'rich',
        title: `Slowmode has been Removed`,
        description: `<@!${context.params.event.member.user.id}> removed this channel's slowmode!`,
        color: 0x5bed51, //green
      },
    ],
  });
} else if (rateLimit === 1) {
  await lib.discord.channels['@0.3.0'].messages.create({
    channel_id: `${context.params.event.channel_id}`,
    content: '',
    tts: false,
    embeds: [
      {
        type: 'rich',
        title: `Slowmode set to 1 Second`,
        description: `<@!${context.params.event.member.user.id}> changed this channel's slowmode to 1 second!`,
        color: 0x5bed51, //green
      },
    ],
  });
} else {
  await lib.discord.channels['@0.3.0'].messages.create({
    channel_id: `${context.params.event.channel_id}`,
    content: '',
    tts: false,
    embeds: [
      {
        type: 'rich',
        title: `Slowmode set to ${rateLimit} Seconds`,
        description: `<@!${context.params.event.member.user.id}> changed this channel's slowmode to ${rateLimit} seconds!`,
        color: 0x5bed51, //green
      },
    ],
  });
}

//log function
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
      channel_id: `975967856430829618`,
      content: '',
      tts: false,
      embeds: [
        {
          type: 'rich',
          title: `Slowmode Updated`,
          description: ``,
          color: 0x5bed51, //green
          fields: [
            {
              name: `**Channel**`,
              value: `<#${channelInfo.id}>`,
              inline: true,
            },
            {
              name: `**Slowmode**`,
              value: `Was: ${channelInfo.rate_limit_per_user}
                      Now: ${rateLimit}`,
              inline: true,
            },
            {
              name: `**Moderator**`,
              value: `<@${context.params.event.member.user.id}>`,
              inline: true,
            },
          ],
          footer: {
            text: `Channel Id: ${channelInfo.id} • ${formattedTime}`,
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

