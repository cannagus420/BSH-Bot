const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
await lib.discord.channels['@0.3.2'].messages.create({
  channel_id: `986494841330487306`,
  content: `<@&1000283645497585804>`,
  tts: false,
  embeds: [
    {
      type: 'rich',
      title: `There's a hurting soul that needs acknowledging `,
      description: `<@!${context.params.event.member.user.id}> just triggered the **Talk** command. Come lend an ear and a heart. ❤️`,
      color: 0x00ffff,
      image: {
        url: `https://media.discordapp.net/attachments/986494841330487306/1054640434783191050/FB_IMG_1671342909300.jpg`,
        height: 0,
        width: 0,
      },
    },
  ],
});
await lib.discord.channels['@0.3.2'].threads.create({
  channel_id: `986494841330487306`,
  name: `<@${context.params.event.member.user.username}>`,
  auto_archive_duration: 1440,
  message_id: ``,
  type: 'GUILD_PUBLIC_THREAD',
});
