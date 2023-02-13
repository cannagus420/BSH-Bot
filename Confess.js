const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
let confessor = context.params.event.member.user.id;
await lib.discord.channels['@0.3.0'].messages.create({
  channel_id: `942632245519331408`,
  content: ``,
  tts: false,
  embeds: [
    {
      type: 'rich',
      title: `Confession`,
      description: [
        context.params.event.data.options[0].value,
        ].join('\n'),
      color: 0x00ffff,
    },
  ],
});
console.log(confessor)