const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
let mod_role = `1031375602927800370`;
if (context.params.event.member.roles.includes(mod_role)) {
  await lib.discord.channels['@release'].messages.create({
    message_id: `1041569362659778651`,
    channel_id: `1041569362659778651`,
    content: `<@${context.params.event.data.options[0].value}> 
  ${context.params.event.data.options[1].value}`,
  });
} else {
  await lib.discord.interactions['@1.0.1'].responses.ephemeral.create({
    token: context.params.event.token,
    content: `This command isn't for you, stoner.`,
    response_type: 'CHANNEL_MESSAGE_WITH_SOURCE',
  });
}
