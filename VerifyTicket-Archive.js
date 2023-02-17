// authenticates you with the API standard library// type `await lib.` to display API autocomplete
const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
let messageCount = parseInt(context.params.event.content);
if (!messageCount || messageCount < 1 || messageCount > 100) {
  let messages = await lib.discord.channels['@0.2.0'].messages.list({
    channel_id: `${context.params.event.channel_id}`,
    limit: messageCount,
  });
  let archiveContent = messages
    .reverse()
    .map((message) => {
      let displayText = [
        `User: ${message.author.username}#${message.author.discriminator}`,
        `Timestamp: ${message.timestamp}`,
        `Content: ${message.content}`,
      ];
      if (message.embeds) {
        displayText.push(`Embeds: ${JSON.stringify(message.embeds, null, 2)}`);
      }
      if (message.components) {
        displayText.push(
          `Components: ${JSON.stringify(message.components, null, 2)}`
        );
      }
      return displayText.join('\n');
    })
    .join('\n' + '-'.repeat(64) + '\n');
  await lib.discord.channels['@0.2.0'].messages.create({
    channel_id: `${process.env.logChannelId}`,
    content: `The last tickets archive.`,
    filename: `messages.txt`,
    file: Buffer.from(archiveContent),
  });
  let result = await lib.discord.channels['@0.1.1'].destroy({
    channel_id: `${context.params.event.channel_id}`,
  });
}
