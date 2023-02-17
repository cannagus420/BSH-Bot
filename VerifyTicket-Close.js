const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
let event = context.params.event;
await lib.discord.channels['@0.2.0'].messages.create({
  channel_id: event.channel_id,
  content: ``,
  embed: {
    title: `Are you sure you want to close this ticket?`,
    type: 'rich',
    color: 0xff0345,
    description: `Click 🔒 to Confirm`,
  },
  components: [
    {
      type: 1,
      components: [
        {type: 2, label: '🔒', style: 4, custom_id: 'ticket-delete'},
      ],
    },
  ],
});
