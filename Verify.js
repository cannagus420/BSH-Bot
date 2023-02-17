const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
console.log(`options[0].value`, context.params.event.data.options[0].value);
let ADMIN_ROLE = '1031375602927800370';
if (context.params.event.member.roles.includes(ADMIN_ROLE)) {
  await lib.discord.guilds['@0.1.0'].members.roles.update({
    role_id: `941781614340505600`, //verified role
    user_id: context.params.event.data.options[0].value, // bing
    guild_id: `941700133702205491`, //server id
  });
  await lib.discord.guilds['@0.2.3'].members.roles.destroy({
    role_id: `949891994354851893`, // unverified role
    user_id: context.params.event.data.options[0].value, // required
    guild_id: `941700133702205491`, // required
  });
  await lib.discord.channels['@0.2.0'].messages.create({
    content: `Hiya <@${context.params.event.data.options[0].value}>, welcome in! \n Please be sure to read over <#989222696455921694> if you've not already and get ya some <#941812089364840468>, <#1000249298283405422>, and a <#982678994145120326>! \nFor a list of all the slash commands you can use in the server, use </how-to:1057153250463318167>.\n And remember, if you come across any issues or have a question you can open a ticket in <#943644369666330714>. \nThanks for **jointing** 🙃`,
    channel_id: `941700134213935116`,
  });
} else {
  await lib.discord.interactions['@1.0.1'].responses.ephemeral.create({
    token: context.params.event.token,
    content: `This command isn't for you, stoner.`,
    response_type: 'CHANNEL_MESSAGE_WITH_SOURCE',
  });
}
