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
let userInfo = await lib.discord.users['@0.2.0'].retrieve({
  user_id: `${context.params.event.data.options[0].value}`,
});
let timeZone = await lib.utils.kv['@0.1.16'].get({
  key: `AM_timeZone${context.params.event.guild_id}`,
  defaultValue: `Asia/Calcutta`,
});
let formattedTime = moment(context.params.event.received_at)
  .tz(`${timeZone}`)
  .format('DD/MM/YYYY - hh:mm');
console.log(formattedTime);
console.log(userInfo);
if (userInfo.banner) {
  let extention = userInfo.banner.startsWith('a_') ? 'gif' : 'png';
  let banner_url = `https://cdn.discordapp.com/banners/${userInfo.id}/${userInfo.banner}.${extention}size=512`;
  await lib.discord.interactions['@1.0.0'].responses.create({
    token: `${context.params.event.token}`,
    content: '',
    tts: false,
    embeds: [
      {
        type: 'rich',
        title: `Here is ${userInfo.username}'s Banner`,
        description: ``,
        color: 0x5bed51, //green
        image: {url: `${banner_url}`, height: 0, width: 0},
        footer: {
          text: `Requested by ${context.params.event.member.user.username} • ${formattedTime}`,
        },
      },
    ],
  });
  return;
}
await lib.discord.interactions['@1.0.0'].responses.create({
  token: `${context.params.event.token}`,
  content: '',
  tts: false,
  embeds: [
    {
      type: 'rich',
      title: `Here is ${userInfo.username}'s Banner Colour`,
      description: ``,
      color: 0x5bed51, //green
      image: {
        url: `https://api.alexflipnote.dev/color/image/${userInfo.banner_color.replace(
          '#',
          ''
        )}`,
        height: 0,
        width: 0,
      },
      footer: {
        text: `Requested by ${context.params.event.member.user.username} • ${formattedTime}`,
      },
    },
  ],
});

