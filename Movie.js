const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
const movie = context.params.event.data.options[0].value;
const time = context.params.event.data.options[1].value;
let Movie_Pings = `945518697152405504`;
if (context.params.event.member.roles.includes(Movie_Pings)) {
  await lib.discord.channels['@0.3.2'].messages.create({
    channel_id: `947646796509892638`,
    content: `<@&945518697152405504>
    <@${context.params.event.member.user.id}> **scheduled a movie event!**
  **Time:** ${context.params.event.data.options[0].value} 
  **Movie:** ${context.params.event.data.options[1].value}`,
    tts: false,
    embeds: [
      {
        type: 'rich',
        title: `Grab your popcorn and weed folks! 🍿`,
        description: '',
        color: 0x00ffff,
        image: {
          url: `https://media.discordapp.net/attachments/901557716642828338/1050996310918037524/movie-time-poster-cinema-banner-stock-vector-25856996.jpg`,
          height: 0,
          width: 0,
        },
        url: `https://media.discordapp.net/attachments/901557716642828338/1050996310918037524/movie-time-poster-cinema-banner-stock-vector-25856996.jpg`,
      },
    ],
  });
} else {
  await lib.discord.interactions['@1.0.1'].responses.ephemeral.create({
    token: context.params.event.token,
    content: `Hey <@${context.params.event.member.user.id}>, you'll need to visit <#1000249298283405422> and add yourself to the <@&945518697152405504> role before you can use this command. 😃`,
    response_type: 'CHANNEL_MESSAGE_WITH_SOURCE',
  });
}
