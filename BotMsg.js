const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
const event = context.params.event
// Get the message the user entered
const content = event.data.options[0].value
// Send the message to channel as the bot
if (event.member.permission_names.includes('ADMINISTRATOR')) {
await lib.discord.channels['@0.1.2'].messages.create({    
channel_id: event.channel_id, content,  
});
}else {
  await lib.discord.interactions['@1.0.1'].followups.ephemeral.create({
    token: `context.params.event.token`,
    content: `This command isn't for you, stoner.`
  });
  }