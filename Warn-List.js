const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
const moment = require('moment-timezone');

if (!context.params.event.member.permission_names.includes(`MANAGE_MESSAGES`)) {
  console.log(`not admin`);
  await lib.discord.interactions['@1.0.0'].responses.ephemeral.create({
    token: `${context.params.event.token}`,
    content: `Sorry <@${context.params.event.member.user.id}>, You require the permission \`MANAGE_MESSAGES\` to use this command.`,
  });
  return;
}

let activeNodes = await lib.utils.kv.get({
  key: `AM_activeNodes_${context.params.event.guild_id}`,
  defaultValue: `[ 'mainOption-staff-channelCommands', 'mainOption-staff-userCommands' ]`,
});
console.log(activeNodes);
if (!activeNodes.includes(`mainOption-staff-userCommands`)) {
  await lib.discord.interactions['@1.0.0'].responses.ephemeral.create({
    token: `${context.params.event.token}`,
    content: `Sorry <@${context.params.event.member.user.id}>, this Node is not activated. If you believe this is an error, please use \`/select-nodes\`.`,
  });
  return;
}

let userInfo = await lib.discord.users['@0.2.0'].retrieve({
  user_id: `${context.params.event.data.options[0].value}`,
});

let userWarns = await lib.utils.kv['@0.1.16'].get({
  key: `AM_warns-per-user_${userInfo.id}_${context.params.event.guild_id}`,
});

let reasonList = ``;
let dateList = ``;
if (userWarns) {
  for (let i = 0; i < userWarns.length; i++) {
    if (userWarns[i].full === true) {
      reasonList =
        reasonList + i + ` - ` + `**` + userWarns[i].reason + `**` + `\n`;
    }
  }

  for (let i = 0; i < userWarns.length; i++) {
    if (userWarns[i].full === true) {
      dateList = dateList + userWarns[i].date + `\n`;
    }
  }
}

await lib.discord.interactions['@1.0.0'].responses.create({
  token: `${context.params.event.token}`,
  content: ``,
  tts: false,
  embeds: [
    {
      type: 'rich',
      title: ``,
      description: userWarns ? `To remove a warning use /warn-remove.` : ``,
      color: 0x00ffff, //blue
      fields: [
        {
          name: `ID - Warnings`,
          value: reasonList ? reasonList : `None`,
          inline: true,
        },
        {
          name: `Date - Time`,
          value: dateList ? dateList : `N/A`,
          inline: true,
        },
      ],
      author: {
        name: `${userInfo.username}#${userInfo.discriminator}'s Warnings`,
        icon_url: userInfo.avatar_url ? `${userInfo.avatar_url}` : ``,
      },
      footer: {
        text: `Dates and times are based on the timzone selected when the warn was given.`,
      },
    },
  ],
});

