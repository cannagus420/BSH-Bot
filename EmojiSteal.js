 const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

const event = context.params.event;
const { guild_id, channel_id, author, content } = event;

async function send(content){
  await lib.discord.channels['@0.3.0'].messages.create({
    channel_id,
    content
  });
};

function parseEmoji(emoji){
  if (!emoji.startsWith('<')) return 'The emoji you specified is not a real emoji.';
  let isAnimated = emoji.startsWith('<a:');
  let name = emoji.split(':')[1];
  let id = emoji.split(':')[2].replace('>', '');
  let url = `https://cdn.discordapp.com/emojis/${id}${isAnimated ? '.gif' : '.png'}`;
  return {name, id, isAnimated, url};
};

let args = content.split(' ').slice(1);
if(!args.length) return send(`Specify some emojis.`);
let madeEmojis = [];

for (const rawEmoji of args){
  try{
    let emoji = await parseEmoji(rawEmoji);
    let result = await lib.http.request['@1.1.6']({
      method: 'GET',
      url: emoji.url
    });
    let createdEmoji = await lib.discord.guilds['@0.2.1'].emojis.create({
      guild_id,
      name: emoji.name,
      image: result.body
    });
    madeEmojis.push(`${createdEmoji.animated ? '<a:' : '<:'}${createdEmoji.name}:${createdEmoji.id}>`);
    await send(`Added: \`${emoji.url}\`!`);
  } catch (e){
    console.log(e);
    if(e.message === 'Maximum number of emojis reached (50): code 30008: (discord/guilds@0.2.1/emojis/create)') return send('Maximum number of emojis reached! (50)')
    else await send('An error ocurred whilst adding the emojis!');
  };
};
return send('Added emojis: ' + madeEmojis.join(' '));