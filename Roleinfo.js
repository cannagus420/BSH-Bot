const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
const moment = require('moment-timezone');
let activeNodes = await lib.utils.kv.get({
  key: `AM_activeNodes_${context.params.event.guild_id}`,
  defaultValue: `[ 'mainOption-staff-channelCommands', 'mainOption-staff-userCommands' ]`,
});
console.log(activeNodes);
if (!activeNodes.includes(`mainOption-user-utilityCommands`)) {
  await lib.discord.interactions['@1.0.0'].responses.ephemeral.create({
    token: `${context.params.event.token}`,
    content: `Sorry <@${context.params.event.member.user.id}>, this Node is not activated. If you believe this is an error, please use \`/select-nodes\`.`,
  });
  return;
}
const allRoleInfo = await lib.discord.guilds['@0.2.2'].roles.list({
  guild_id: `941700133702205491`,
});
console.log(allRoleInfo);
let roleInfo = null;
for (let i = 0; i < allRoleInfo.length; i++) {
  if (allRoleInfo[i].id === `${context.params.event.data.options[0].value}`) {
    roleInfo = allRoleInfo[i];
  }
}
let timeZone = await lib.utils.kv['@0.1.16'].get({
  key: `AM_timeZone${context.params.event.guild_id}`,
  defaultValue: `Asia/Calcutta`,
});
let formattedTime = moment(context.params.event.received_at)
  .tz(`${timeZone}`)
  .format('DD/MM/YYYY - hh:mm');
console.log(formattedTime);
await lib.discord.interactions['@1.0.0'].responses.create({
  token: `${context.params.event.token}`,
  content: '',
  tts: false,
  embeds: [
    {
      type: 'rich',
      title: `${roleInfo.name} Role Info`,
      description: `<@&${roleInfo.id}>`,
      color: 0x5bed51, //green
      fields: [
        {
          name: `**Role ID**`,
          value: `${roleInfo.id}`,
          inline: true,
        },
        {
          name: `**Color**`,
          value: `${roleInfo.color}`,
          inline: true,
        },
        {
          name: `**Hierarchy Position**`,
          value: `${roleInfo.position}`,
          inline: true,
        },
        {
          name: `**Icon**`,
          value: roleInfo.icon ? `${roleInfo.icon}` : `none`,
          inline: true,
        },
        {
          name: `**Displayed separately**`,
          value: roleInfo.hoist ? `Yes` : `No`,
          inline: true,
        },
        {
          name: 'Mentionable',
          value: roleInfo.mentionable ? `Yes` : `No`,
          inline: true,
        },
        {
          name: 'Is Bot Role',
          value: roleInfo.managed ? `Yes` : `No`,
          inline: true,
        },
      ],
      footer: {
        text: `Requested by ${context.params.event.member.user.username} • ${formattedTime}`,
      },
    },
  ],
});
