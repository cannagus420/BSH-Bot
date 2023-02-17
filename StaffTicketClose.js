const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

let messageToDelete = await lib.discord.channels['@0.3.0'].messages.list({
  channel_id: `${context.params.event.channel_id}`,
  limit: 1
});
await lib.discord.channels['@0.3.0'].messages.destroy({
  message_id: `${messageToDelete[0].id}`,
  channel_id: `${context.params.event.channel_id}`
});

let date = context.params.event.received_at.split('T')[0];
let time = context.params.event.received_at.split('T')[1].split('.')[0];

await lib.discord.channels['@0.3.0'].permissions.destroy({
  overwrite_id: `${context.params.event.member.user.id}`,
  channel_id: `${context.params.event.channel_id}`,
});

await lib.discord.channels['@0.3.0'].permissions.update({
  overwrite_id: `${process.env.staffRoleId}`,
  channel_id: `${context.params.event.channel_id}`,
  deny: `${(1 << 11) | (1 << 4) | (1 << 6) | (1 << 13)}`,
  type: 0,
});

let archiveCategoryId = await lib.utils.kv.get({
  key: `AM_archiveCategory_${context.params.event.guild_id}`,
});

await lib.discord.channels['@0.3.0'].update({
  channel_id: `${context.params.event.channel_id}`,
  parent_id: `${archiveCategoryId}`,
});

let message = await lib.discord.channels['@0.3.0'].messages.create({
  channel_id: `${context.params.event.channel_id}`,
  content: ``,
  embed: {
    type: 'rich',
    title: `This Ticket is now archived`,
    description: `Click the button below to delete the channel.`,
    color: 0x5bed51,
    footer: {
      text: `closed by: ${context.params.event.member.user.username}#${context.params.event.member.user.discriminator}• Date: ${date} | Time: ${time}`,
    },
  },
  components: [
    {
      type: 1,
      components: [
        {
          type: 2,
          label: 'Delete',
          style: 4,
          custom_id: 'ticket-delete',
        },
      ],
    },
  ],
});

let userInfo = await lib.discord.users['@0.2.0'].retrieve({
  user_id: `${context.params.event.member.user.id}`
});
let channelInfo = await lib.discord.channels['@0.3.0'].retrieve({
  channel_id: `${context.params.event.channel_id}`
});
let userAvatarUrl = userInfo.avatar_url ? userInfo.avatar_url : null;
let activeNodes = await lib.utils.kv.get({
  key: `AM_activeNodes_${context.params.event.guild_id}`,
});
//log function
if (activeNodes.includes(`mainOption-loggingChannel`)) {
  try {
    await lib.discord.channels['@0.3.0'].messages.create({
      channel_id: `${process.env.logChannelId}`,
      content: '',
      tts: false,
      embeds: [
        {
          type: 'rich',
          title: ``,
          description: ``,
          color: 0x4daded, //blue
          fields: [
            {
              name: `**Channel Info**`,
              value: `Link: <#${channelInfo.id}> \n Name: #${channelInfo.name}`,
              inline: true,
            },
            {
              name: `**Archiver**`,
              value: `<@${context.params.event.member.user.id}>`,
              inline: true,
            },
          ],
          footer: {
            text: `Channel Id: ${channelInfo.id} • Date: ${date} | Time: ${time}`,
          },
          author: {
            name: `${userInfo.username} Archived a Ticket`,
            icon_url: userAvatarUrl ? `${userAvatarUrl}` : ``,
          },
        },
      ],
    });
    console.log(`logged`);
    return;
  } catch (e) {
    console.log(e);
    await lib.discord.interactions['@0.0.0'].followups.ephemeral.create({
      token: `${context.params.event.token}`,
      content: `Sorry <@${context.params.event.member.user.id}>, There was an error when logging the command. Please check the ID in the environment variables is correct, or deactivate the logging Node with \`/select-nodes\`.`,
    });
  }
}


