const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
await lib.discord.channels['@0.3.0'].messages.create({
  channel_id: `946539495711445022`,
  content: `<@${context.params.event.member.user.id}>`,
  tts: false,
  embeds: [
    {
      type: 'rich',
      title: `Suggestion:`,
      description: [context.params.event.data.options[0].value].join('\n'),
      color: 0x00ffff,
    },
  ],
});