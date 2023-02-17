const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
let Sesh_Pings = `942147943484498022`;
if (context.params.event.member.roles.includes(Sesh_Pings)) {
  await lib.discord.channels['@release'].messages.create({
    channel_id: `942150773364641833`,
    content: `<@&942147943484498022>`,
    tts: false,
    embeds: [
      {
        type: 'rich',
        title: `It's smoke time!`,
        description: `<@!${context.params.event.member.user.id}> just used the **Sesh Ping** command. Go hop in vc and get high af with them! 😎🚬`,
        color: 0x00ffff,
        image: {
          url: `https://media.discordapp.net/attachments/901557716642828338/1050135065914523800/its-4-20-somewhere-neon-sign-3-1.jpg`,
          height: 0,
          width: 0,
        },
        url: `https://media.discordapp.net/attachments/901557716642828338/1050135065914523800/its-4-20-somewhere-neon-sign-3-1.jpg`,
      },
    ],
  });
} else {
await lib.discord.interactions['@1.0.1'].responses.ephemeral.create({
  token: context.params.event.token,
  content: `Hey <@!${context.params.event.member.user.id}>, you'll need to visit <#1000249298283405422> and add yourself to the <@&942147943484498022> role before you can use this command. 😃`,
  response_type: 'CHANNEL_MESSAGE_WITH_SOURCE',
});
}