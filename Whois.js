const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
const {Tools} = require('autocode-discordjs');
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

const userInfo = await lib.discord.guilds['@0.1.0'].members.retrieve({
  user_id: `${context.params.event.data.options[0].value}`,
  guild_id: `${context.params.event.guild_id}`,
});

let timeZone = await lib.utils.kv['@0.1.16'].get({
  key: `AM_timeZone${context.params.event.guild_id}`,
  defaultValue: `Asia/Calcutta`,
});
let formattedTime = moment(context.params.event.received_at)
  .tz(`${timeZone}`)
  .format('DD/MM/YYYY - hh:mm');
console.log(formattedTime);

let formattedJoinDate = moment(userInfo.joined_at)
  .tz(`${timeZone}`)
  .format('DD/MM/YYYY - hh:mm');
let premiumSince = `Not a Booster`;
if (userInfo.premium_since) {
  premiumSince = moment(userInfo.premium_since)
    .tz(`${timeZone}`)
    .format('DD/MM/YYYY - hh:mm');
}

await lib.discord.interactions['@1.0.0'].responses.create({
  token: `${context.params.event.token}`,
  content: '',
  tts: false,
  embeds: [
    {
      type: 'rich',
      title: ``,
      description: ``,
      color: 0x5bed51, //green
      fields: [
        {
          name: `**Tag**`,
          value: `${userInfo.user.username}#${userInfo.user.discriminator}`,
          inline: true,
        },
        {
          name: `**Mention**`,
          value: `<@${userInfo.user.id}>`,
          inline: true,
        },
        {
          name: `**User ID**`,
          value: `${userInfo.user.id}`,
          inline: true,
        },
        {
          name: `**Date Joined**`,
          value: `${formattedJoinDate}`,
          inline: true,
        },
        {
          name: `**Boosting Since**`,
          value: premiumSince ? `${premiumSince}` : `Not a Booster`,
          inline: true,
        },
        {
          name: 'Badges',
          value: userInfo.user.public_flags
            ? Tools.getUserBadges(userInfo.user.public_flags)
                .map((x) => `**\`${x}\`**`)
                .join(' | ')
            : 'No Badges',
          inline: true,
        }, 
        {
          name: `Roles [${userInfo.roles.length}]`,
          value: userInfo.roles.length
            ? userInfo.roles.map((x) => `<@&${x}>`).join(' ')
            : 'No Roles',
          inline: true,
        },
      ],
      footer: {
        text: `Requested by ${context.params.event.member.user.username} • ${formattedTime}`,
      },
      author: {
        name: `${userInfo.user.username}`,
        icon_url: userInfo.user.avatar_url ? `${userInfo.user.avatar_url}` : ``,
      },
    },
  ],
});

