const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
let adminRole = `1031375602927800370`;
if (context.params.event.member.roles.includes(adminRole)) {
  await lib.discord.channels.messages.create({
    channel_id: `${context.params.event.channel_id}`,
    content: '<@&947690063972696134>',
    tts: false,
    embeds: [
      {
        type: 'rich',
        title: `This Week's Trivia Is Out!
        Good Luck Everyone! 😃`,
        description: [
      `1st place: 400 bonus xp
         2nd place: 300 bonus xp
         3rd place: 200 bonus xp`,
          context.params.event.data.options[0].value,
        ].join('\n'),
        color: 0x00ffff,
      },
    ],
  });
} else {
  await lib.discord.interactions['@1.0.1'].responses.ephemeral.create({
    token: context.params.event.token,
    content: `This command isn't for you, stoner.`,
    response_type: 'CHANNEL_MESSAGE_WITH_SOURCE',
  });
}
