const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
if (context.params.event.content.startsWith('!sendmsg')) {
  const args = context.params.event.content.split(' ').slice(1);
  if (!args.length || !args[1])
    return lib.discord.channels['@0.2.0'].messages.create({
      content: `Wrong Command Usage, \`!sendmsg <@member/#channel> <message>\``,
      channel_id: context.params.event.channel_id,
    });
  const target = args[0];
  const message = args.slice(1).join(' ');
  const isMember = context.params.event.mentions[0]?.id ? true : false;
  try {
    if (isMember)
      await lib.discord.users['@0.1.4'].dms.create({
        recipient_id: context.params.event.mentions[0].id,
        content: message,
      });
    else
      await lib.discord.channels['@0.2.0'].messages.create({
        content: message,
        channel_id: target.match(/\d+/)[0],
      });
  } catch (e) {
    return lib.discord.channels['@0.2.0'].messages.create({
      content: `Something went wrong, unable to send message`,
      channel_id: context.params.event.channel_id,
    });
  }
  return lib.discord.channels['@0.2.0'].messages.create({
    content: `✅ | Sent the message.`,
    channel_id: context.params.event.channel_id,
  });
}