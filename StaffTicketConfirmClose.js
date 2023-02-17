const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

let confirmMessage = await lib.discord.channels['@0.3.0'].messages.create({
  channel_id: `${context.params.event.channel_id}`,
  content: ``,
  embed: {
    type: 'rich',
    title: ``,
    description: `Click the button below to Confirm closing this Ticket`,
    color: 0x5bed51,
  },
  components: [
    {
      type: 1,
      components: [
        {
          type: 2,
          label: 'Confirm',
          style: 4,
          custom_id: 'ticket-close',
        },
      ],
    },
  ],
});

let sleep = async (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

await sleep(20000);

try {
await lib.discord.channels['@0.3.0'].messages.destroy({
  message_id: `${confirmMessage.id}`,
  channel_id: `${context.params.event.channel_id}`
});
} catch (e) {
  null
}


