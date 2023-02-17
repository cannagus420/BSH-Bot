const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
const event = context.params.event

await lib.discord.guilds['@0.1.0'].members.roles.update({
  guild_id: event.guild_id,
  user_id: event.user.id,
  role_id: process.env.NEW_ROLE_ID,
});