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

let serverInfo = await lib.discord.guilds['@0.2.2'].retrieve({
  guild_id: `${context.params.event.guild_id}`,
  with_counts: true,
});
let allChannels = await lib.discord.guilds['@0.2.2'].channels.list({
  guild_id: `${context.params.event.guild_id}`,
});
let textChannels = allChannels.filter((channels) => channels.type === 0);
let voiceChannels = allChannels.filter((channels) => channels.type === 2);
let categories = allChannels.filter((channels) => channels.type === 4);

let region = serverInfo.region;
region = region.charAt(0).toUpperCase() + region.slice(1);

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
      title: ``,
      description: ``,
      color: 0x5bed51, //green
      fields: [
        {
          name: `**Owner**`,
          value: `<@${serverInfo.owner_id}>`,
          inline: true,
        },
        {
          name: `**Server ID**`,
          value: `${serverInfo.id}`,
          inline: true,
        },
        {
          name: `**Approx Members**`,
          value: Number(serverInfo.approximate_member_count),
          inline: true,
        },
        {
          name: `**Num of Roles**`,
          value: `${serverInfo.roles.length}`,
          inline: true,
        },
        {
          name: `**Channels [${allChannels.length}]**`,
          value: `Text Channels: ${textChannels.length} \n Voice Channels: ${voiceChannels.length} \n Categories: ${categories.length}`,
          inline: true,
        },
        {
          name: `**Rules Channel**`,
          value: serverInfo.rules_channel_id
            ? `<#${serverInfo.rules_channel_id}>`
            : `Not Set`,
          inline: true,
        },
        {
          name: 'Region',
          value: `${region}`,
          inline: true,
        },
        {
          name: `**Boost level**`,
          value: `${serverInfo.premium_tier}`,
          inline: true,
        },
        {
          name: `**Boosts**`,
          value: `${serverInfo.premium_subscription_count}`,
          inline: true,
        },
      ],
      footer: {
        text: `Requested by ${context.params.event.member.user.username} • ${formattedTime}`,
      },
      author: {
        name: `${serverInfo.name}`,
        icon_url: serverInfo.icon_url ? `${serverInfo.icon_url}` : ``,
      },
    },
  ],
});

