const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

let mutedUsers = await lib.utils.kv['@0.1.16'].get({
  key: `AM_mutedUsers_${process.env.guildId}`,
  defaultValue: null
});
if (!mutedUsers) {
  console.log(`none`);
  return
}

let mutedUsersArray = mutedUsers.split('_')

for (let i = 0; i < mutedUsersArray.length - 1; i++) {
  console.log(i);
  await lib.discord.guilds['@0.2.2'].members.timeout.update({
    user_id: `${mutedUsersArray[i]}`,
    guild_id: `${process.env.guildId}`,
    communication_disabled_until_seconds: 2419200,
    reason: `Remuted for 28 days as user was Muted Permanently`
  });
}
