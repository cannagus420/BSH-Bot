const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
const event = context.params.event;
const user = event.member.user;
// * ----------------------- * //

const responses = [
  'As I see it, yes.',
  'Ask again later.',
  'Better not tell you now.',
  'Cannot predict now.',
  'Concentrate and ask again.',
  'Don’t count on it.',
  'It is certain.',
  'It is decidedly so.',
  'Most likely.',
  'My reply is no.',
  'My sources say no.',
  'Outlook not so good.',
  'Outlook good.',
  'Reply hazy, try again.',
  'Signs point to yes.',
  'Very doubtful.',
  'Without a doubt.',
  'Yes.',
  'Yes – definitely.',
  'You may rely on it.',
];

const random = Math.floor(Math.random() * responses.length);
console.log(random, responses[random]);
// * ----------------------- * //

let question = event.data.options[0].value;
// * ----------------------- * //

await lib.discord.channels['@0.2.2'].messages.create({
  channel_id: event.channel_id,
  content: '',
  embeds: [
    {
      type: 'rich',
      title: `Question: ${question}`,
      description: `${(random, responses[random])}`,
      color: 0xffffff,
      author: {
        name: `${user.username}#${user.discriminator} used /8ball`,
      },
    },
  ],
});