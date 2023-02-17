const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

let channelInfo = await lib.discord.channels['@0.3.0'].retrieve({
  channel_id: `${context.params.event.channel_id}`
});

await lib.discord.channels['@0.3.0'].destroy({
  channel_id: `${context.params.event.channel_id}`,
});

let userInfo = await lib.discord.users['@0.2.0'].retrieve({
  user_id: `${context.params.event.member.user.id}`
});
let userAvatarUrl = userInfo.avatar_url ? userInfo.avatar_url : null;
let activeNodes = await lib.utils.kv.get({
  key: `AM_activeNodes_${context.params.event.guild_id}`,
});
//log function
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
          title: ``,
          description: ``,
          color: 0x4daded, //blue
          fields: [
            {
              name: `**Channel Info**`,
              value: `Name: #${channelInfo.name}`,
              inline: true,
            },
            {
              name: `**Deleter**`,
              value: `<@${context.params.event.member.user.id}>`,
              inline: true,
            },
          ],
          footer: {
            text: `User Id: ${userInfo.id} • Date: ${date} | Time: ${time}`,
          },
          author: {
            name: `${userInfo.username} Deleted an Archived Ticket`,
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


