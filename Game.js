const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
let Movie_Pings = `1055691438974840853`;
if (context.params.event.member.roles.includes(Movie_Pings)) {
  await lib.discord.channels['@release'].messages.create({
    channel_id: `1055690216238755860`,
    content: `<@&1055691438974840853>`,
    tts: false,
    embeds: [
      {
        type: 'rich',
        title: `Game On! 🎮`,
        description: `<@!${context.params.event.member.user.id}> said: ${context.params.event.data.options[0].value}`,
        color: 0x00ffff,
        image: {
          url: `https://media.discordapp.net/attachments/901557716642828338/1051014054795288727/gaming-addiction-counseling-in-Long-Island.jpg`,
          height: 0,
          width: 0,
        },
        url: `https://media.discordapp.net/attachments/901557716642828338/1051014054795288727/gaming-addiction-counseling-in-Long-Island.jpg`,
      },
    ],
  });
} else {
  await lib.discord.interactions['@1.0.1'].responses.ephemeral.create({
    token: context.params.event.token,
    content: `Hey <@!${context.params.event.member.user.id}>, you'll need to visit <#1000249298283405422> and add yourself to the <@&1055691438974840853> role before you can use this command. 😃`,
    response_type: 'CHANNEL_MESSAGE_WITH_SOURCE',
  });
}
