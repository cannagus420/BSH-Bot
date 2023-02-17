const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

let message1 = await lib.discord.channels['@0.2.1'].messages.retrieve({
  message_id: context.params.event.message_id,
  channel_id: context.params.event.channel_id
});

if (message1.embeds[0].title === 'Staff Application -TimeOut') return;

let message = await lib.utils.kv['@0.1.16'].get({
  key: `${context.params.event.user_id}_reaction`,
});

let emoji_added = context.params.event.emoji.name;

if(!message) return;
if (
  context.params.event.message_id === message.message_id &&
  emoji_added === '✅'
) {
  await lib.discord.channels['@0.2.0'].messages.update({
    message_id: message.message_id,
    channel_id: message.channel_id,
    content: ``,
    embed: {
      "type": `rich`,
      'title': `  Staff Application - Started`,
      'description': `**You Application Process is Started.**\n Some question will asked to you below and you have no time limit to answer them . `,
      color: 0xa3ff78,
       "thumbnail": {
        "url": `https://j3v8m9d3.stackpathcdn.com/photos/7qvnP86/cke/20210616110925.jpg`,
        "height": 0,
        "width": 0,
      },
    }
  });
  await lib.utils.kv['@0.1.16'].clear({
    key: `${context.params.event.user_id}_reaction`, // required
  });
  await lib.discord.channels['@0.2.0'].messages.create({
    channel_id: context.params.event.channel_id,
    content: ``,
    "tts": false,
     "embeds": [
    {
      "type": "rich",
      "title": ``,
      "description": `**Q.1** Why do you want to become a moderator?`,
      "color": 0x00FFFF,
      "footer": {
        "text": "Type cancel to cancel your application"
        } 
      },
      ] 
  });
  await lib.utils.kv['@0.1.16'].set({
    key: `${context.params.event.user_id}_question2`, 
    value: `yes` 
  });
  await lib.utils.kv['@0.1.16'].set({
    key: `${context.params.event.user_id}_reacted`, 
    value: `yes`,
    ttl: 25
  });
  await lib.utils.kv['@0.1.16'].set({
    key: `${context.params.event.user_id}_application_active`,
    value: 'yes'
  });
  await lib.utils.kv['@0.1.16'].set({
    key: `${context.params.event.author.id}_answer1`,
    value: context.params.event.content
  });
}