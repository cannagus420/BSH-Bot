const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
const moment = require('moment-timezone');
if (!context.params.event.member.permission_names.includes(`MANAGE_CHANNELS`)) {
  console.log(`not admin`);
  await lib.discord.interactions['@1.0.0'].responses.ephemeral.create({
    token: `${context.params.event.token}`,
    content: `Sorry <@${context.params.event.member.user.id}>, You require the permission \`MANAGE_CHANNELS\` to use this command.`,
  });
  return;
}
let activeNodes = await lib.utils.kv.get({
  key: `AM_activeNodes_${context.params.event.guild_id}`,
  defaultValue: `[ 'mainOption-staff-channelCommands', 'mainOption-staff-userCommands' ]`,
});
console.log(activeNodes);
if (!activeNodes.includes(`mainOption-staff-channelCommands`)) {
  await lib.discord.interactions['@1.0.0'].responses.ephemeral.create({
    token: `${context.params.event.token}`,
    content: `Sorry <@${context.params.event.member.user.id}>, this Node is not activated. If you believe this is an error, please use \`/select-nodes\`.`,
  });
  return;
}
let lockdownChannels = await lib.utils.kv.get({
  key: `AM_lockdownChannels_${context.params.event.guild_id}`,
});
if (!lockdownChannels) {
  await lib.discord.interactions['@1.0.0'].responses.ephemeral.create({
    token: `${context.params.event.token}`,
    content: `Sorry <@${context.params.event.member.user.id}>. Please use \`/set-lockdown\` to select which channels get locked.`,
  });
  return;
}
let channelsMention = `_`;
for (let i = 1; i < lockdownChannels.split(`_`).length; i++) {
  channelsMention = channelsMention + `<#${lockdownChannels.split(`_`)[i]}> `;
}
await lib.discord.interactions['@1.0.0'].responses.create({
  token: `${context.params.event.token}`,
  content: `Channels included in Lockdowns are:\n${channelsMention}`,
});
