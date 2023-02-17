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
if (!activeNodes.includes(`mainOption-staff-userCommands`)) {
  await lib.discord.interactions['@1.0.0'].responses.ephemeral.create({
    token: `${context.params.event.token}`,
    content: `Sorry <@${context.params.event.member.user.id}>, this Node is not activated. If you believe this is an error, please use \`/select-nodes\`.`,
  });
  return;
} //let statments
let userID = context.params.event.data.options[1]
  ? context.params.event.data.options[1].value
  : null;
let amount = context.params.event.data.options[0].value;
let messages = await lib.discord.channels['@0.1.1'].messages.list({
  channel_id: `${context.params.event.channel_id}`,
  limit: 100,
});
let messages_to_delete = messages.map((m) => m.id).slice(0, amount);
console.log(messages_to_delete.length);
if (messages_to_delete.length <= 1 || messages_to_delete.length > 100) {
  await lib.discord.interactions['@1.0.0'].responses.ephemeral.create({
    token: `${context.params.event.token}`,
    content: `Sorry <@${context.params.event.member.user.id}>, You cannot Purge less than 2 or more than 100 messages.`,
  });
  return;
} // filter to user
if (userID) {
  messages_to_delete = messages
    .filter((m) => m.author.id === userID)
    .map((m) => m.id)
    .slice(0, amount);
}
try {
  //delete
  await lib.discord.channels['@0.2.0'].messages.bulkDelete({
    channel_id: `${context.params.event.channel_id}`,
    messages: messages_to_delete,
  });
} catch (e) {
  await lib.discord.interactions['@1.0.0'].responses.ephemeral.create({
    token: `${context.params.event.token}`,
    content: `Bots cannot delete messages over 14 days old.`,
    response_type: 'CHANNEL_MESSAGE_WITH_SOURCE',
  });
} //delete confirmation
await lib.discord.interactions['@1.0.0'].responses.ephemeral.create({
  token: `${context.params.event.token}`,
  content: '',
  tts: false,
  embeds: [
    {
      type: 'rich',
      title: `Purged ${amount} Messages`,
      description: userID
        ? `Deleted \`${amount} messages\` sent by <@${userID}> in <#${context.params.event.channel_id}>.`
        : `Deleted \`${amount} messages\` in <#${context.params.event.channel_id}>.`,
      color: 0x5bed51, //green
    },
  ],
});
let channelInfo = await lib.discord.channels['@0.3.0'].retrieve({
  channel_id: `${context.params.event.channel_id}`,
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
          title: `Purged Messages`,
          description: ``,
          color: 0xf32f2f, //red
          fields: [
            {name: `**Channel**`, value: `<#${channelInfo.id}>`, inline: true},
            {
              name: `**Moderator**`,
              value: `<@${context.params.event.member.user.id}>`,
              inline: true,
            },
            {name: `**Amount Purged**`, value: `${amount}`, inline: true},
            {
              name: `**Filter User**`,
              value: userID ? `<@${userID}>` : `No Filtered`,
              inline: true,
            },
          ],
          footer: {
            text: `Channel Id: ${context.params.event.channel_id} • ${formattedTime}`,
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
