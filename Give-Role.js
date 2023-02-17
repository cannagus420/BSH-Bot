// authenticates you with the API standard library// type `await lib.` to display API autocomplete
const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
let user = context.params.event.data.options[0].value;
let role = context.params.event.data.options[1].value;
const now = new Date();
let time = Math.round(new Date(now).getTime() / 1000);
console.log(time);
if (context.params.event.member.permission_names.includes('ADMINISTRATOR')) {
  await lib.discord.guilds['@release'].members.roles.update({
    role_id: `${role}`,
    user_id: `${user}`,
    guild_id: `${context.params.event.guild_id}`,
  });
  await lib.discord.interactions['@1.0.1'].responses.ephemeral.create({
    token: `${context.params.event.token}`,
    content: `You gave <@${user}> the role <@&${role}>!`,
    tts: false,
    response_type: 'CHANNEL_MESSAGE_WITH_SOURCE',
  });
  await lib.discord.channels['@0.3.2'].messages.create({
    channel_id: `${process.env.LOG_CHANNEL}`,
    content: ``,
    embeds: [
      {
        type: `rich`,
        title: `A role has been added to a user!`,
        description: ``,
        color: 0x2fcc71,
        fields: [
          {name: 'Role', value: '<@&' + role + '>'},
          {name: 'User', value: '<@' + user + '>'},
          {
            name: 'Authorizer',
            value: '<@' + context.params.event.member.user.id + '>',
          },
          {name: 'Time', value: '<t:' + time + '>'},
        ],
      },
    ],
  });
} else {
  await lib.discord.interactions['@1.0.1'].responses.ephemeral.create({
    token: `${context.params.event.token}`,
    content: `This command isn't for you, stoner.`,
    response_type: 'CHANNEL_MESSAGE_WITH_SOURCE',
  });
}
