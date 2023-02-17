const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
const moment = require('moment-timezone');

if (!context.params.event.member.permission_names.includes(`BAN_MEMBERS`)) {
  console.log(`not admin`);
  await lib.discord.interactions['@1.0.0'].responses.ephemeral.create({
    token: `${context.params.event.token}`,
    content: `Sorry <@${context.params.event.member.user.id}>, You require the permission \`BAN_MEMBERS\` to use this command.`,
  });
  return;
}

let activeNodes = await lib.utils.kv.get({
  key: `AM_activeNodes_${context.params.event.guild_id}`,
  defaultValue: `[ 'mainOption-staff-channelCommands', 'mainOption-staff-userCommands' ]`,
});
console.log(activeNodes);
if (!activeNodes.includes(`mainOption-staff-userCommands`)) {
  await lib.discord.interactions['@1.0.0'].responses.ephemeral.create({
    token: `${context.params.event.token}`,
    content: `Sorry <@${context.params.event.member.user.id}>, this Node is not activated. If you believe this is an error, please use \`/select-nodes\`.`,
  });
  return;
}

let userInfo = await lib.discord.users['@0.2.0'].retrieve({
  user_id: `${context.params.event.data.options[0].value}`,
});

let reason = context.params.event.data.options[1]
  ? context.params.event.data.options[1].value
  : `Unspecified`;
try {
  await lib.discord.guilds['@0.2.2'].bans.destroy({
    user_id: `${userInfo.id}`,
    guild_id: `${context.params.event.guild_id}`,
  });
} catch (e) {
  await lib.discord.interactions['@1.0.0'].responses.ephemeral.create({
    token: `${context.params.event.token}`,
    content: `<@${context.params.event.member.user.id}>, That user isn't banned.`,
  });
  return;
}

let server = await lib.discord.guilds['@0.2.2'].retrieve({
  guild_id: `${context.params.event.guild_id}`,
  with_counts: false,
});
//notifi message
await lib.discord.users['@0.2.0'].dms.create({
  recipient_id: `${userInfo.id}`,
  content: ``,
  embeds: [
    {
      type: 'rich',
      title: `You have been Unbanned from ${server.name}.`,
      description: ``,
      color: 0x5bed51, //green
      fields: [
        {
          name: `Reason:`,
          value: `${reason}`,
        },
      ],
    },
  ],
});

//confirm message
await lib.discord.channels['@0.3.0'].messages.create({
  channel_id: `${context.params.event.channel_id}`,
  content: '',
  tts: false,
  embeds: [
    {
      type: 'rich',
      title: ``,
      description: `**Reason:** ${reason}.`,
      color: 0x5bed51, //green
      author: {
        name: `${userInfo.username}#${userInfo.discriminator} has been Unbanned`,
        icon_url: userInfo.avatar_url ? `${userInfo.avatar_url}` : ``,
      },
    },
  ],
});

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
      channel_id: `${process.env.logChannelId}`,
      content: '',
      tts: false,
      embeds: [
        {
          type: 'rich',
          title: ``,
          description: ``,
          color: 0x5bed51, //green
          fields: [
            {
              name: `**User**`,
              value: `${userInfo.username}#${userInfo.discriminator}`,
              inline: true,
            },
            {
              name: `**Moderator**`,
              value: `<@${context.params.event.member.user.id}>`,
              inline: true,
            },
            {
              name: `**Reason**`,
              value: reason ? `${reason}` : `Unspecified`,
              inline: true,
            },
          ],
          footer: {
            text: `User Id: ${userInfo.id} • ${formattedTime}`,
          },
          author: {
            name: `${userInfo.username}#${userInfo.discriminator} has been Unbanned`,
            icon_url: userInfo.avatar_url ? `${userInfo.avatar_url}` : ``,
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
