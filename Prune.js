const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
await lib.googlesheets.query['@0.3.1'].distinct({
  spreadsheetId: ``,
  range: `Members List!A:H`,
  bounds: 'FIRST_EMPTY_ROW',
  where: [{}],
  limit: {count: 0, offset: 0},
  field: `roles`,
});
let results =
await lib.discord.guilds['@0.2.4'].prune.create({
  guild_id: `941700133702205491`,
  days: 1,
  compute_prune_count: true,
  include_roles: [
    `949891994354851893`
  ] 
});
console.log(results)