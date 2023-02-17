const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
let event = context.params.event;
let message = context.params.event.content;
if (message.startsWith(`${process.env.PREFIX}ticketcreate`)) { //prefix = $//
  await lib.discord.channels['@0.1.0'].messages.destroy({
    channel_id: event.channel_id,
    message_id: event.id,
  });
  await lib.discord.channels['@0.1.1'].messages.create({
    channel_id: `${context.params.event.channel_id}`,
    content: ``,
    embed: {
      title: `React Below To Create A Verification Ticket.
      Note: If it isn't obvious you're 18+ an edited pic of your i.d will be required.
      **ONLY CLICK ONCE PLS!!**`,
      type: 'rich',
      color: 0xff0345,
      description: `React with 📩 to open a ticket`,
    },

    components: [
      {
        type: 1,
        components: [
          {
            type: 2, 
            label: '📩 ',
            style: 3,
            custom_id: 'ticket-open',
          },
        ],
      },
    ],
  });
}
