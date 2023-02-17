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
    content: `Sorry <@${context.params.event.member.user.id}>, this Node is not activated. If you believe this is an error, please contact the staff team.`,
  });
  return;
}

let timeZone = await lib.utils.kv['@0.1.16'].get({
  key: `AM_timeZone${context.params.event.guild_id}`,
  defaultValue: `Asia/Calcutta`,
});
let formattedTime = moment(context.params.event.received_at)
  .tz(`${timeZone}`)
  .format('DD/MM/YYYY - hh:mm');
console.log(formattedTime);

let message = context.params.event.data.options[0].value;
let optionArray = [
  {
    option: `1️⃣ ${context.params.event.data.options[1].value}`,
  },
  {
    option: `2️⃣ ${context.params.event.data.options[2].value}`,
  },
  {
    option: context.params.event.data.options[3]
      ? `3️⃣ ${context.params.event.data.options[3].value}`
      : null,
  },
  {
    option: context.params.event.data.options[4]
      ? `4️⃣ ${context.params.event.data.options[4].value}`
      : null,
  },
  {
    option: context.params.event.data.options[5]
      ? `5️⃣ ${context.params.event.data.options[5].value}`
      : null,
  },
  {
    option: context.params.event.data.options[6]
      ? `6️⃣ ${context.params.event.data.options[6].value}`
      : null,
  },
  {
    option: context.params.event.data.options[7]
      ? `7️⃣ ${context.params.event.data.options[7].value}`
      : null,
  },
  {
    option: context.params.event.data.options[8]
      ? `8️⃣ ${context.params.event.data.options[8].value}`
      : null,
  },
  {
    option: context.params.event.data.options[9]
      ? `9️⃣ ${context.params.event.data.options[9].value}`
      : null,
  },
  {
    option: context.params.event.data.options[10]
      ? `🔟 ${context.params.event.data.options[10].value}`
      : null,
  },
];

let options = ``;
for (let i = 0; i < Number(context.params.event.data.options.length) - 1; i++) {
  options = options + `\n \n ${optionArray[i].option}`;
}

let pollMessage = await lib.discord.channels['@0.3.0'].messages.create({
  channel_id: `${context.params.event.channel_id}`,
  content: '',
  tts: false,
  embeds: [
    {
      type: 'rich',
      title: `${message}`,
      description: `${options}`,
      color: 0x4daded, //blue
      footer: {
        text: `Poll By ${context.params.event.member.user.username} • ${formattedTime}`,
      },
    },
  ],
});

await lib.discord.channels['@0.3.0'].messages.reactions.create({
  emoji: `1️⃣`,
  message_id: `${pollMessage.id}`,
  channel_id: `${context.params.event.channel_id}`,
});
await lib.discord.channels['@0.3.0'].messages.reactions.create({
  emoji: `2️⃣`,
  message_id: `${pollMessage.id}`,
  channel_id: `${context.params.event.channel_id}`,
});
try {
  if (context.params.event.data.options[3].value) {
    await lib.discord.channels['@0.3.0'].messages.reactions.create({
      emoji: `3️⃣`,
      message_id: `${pollMessage.id}`,
      channel_id: `${context.params.event.channel_id}`,
    });
  }
  if (context.params.event.data.options[4].value) {
    await lib.discord.channels['@0.3.0'].messages.reactions.create({
      emoji: `4️⃣`,
      message_id: `${pollMessage.id}`,
      channel_id: `${context.params.event.channel_id}`,
    });
  }
  if (context.params.event.data.options[5].value) {
    await lib.discord.channels['@0.3.0'].messages.reactions.create({
      emoji: `5️⃣`,
      message_id: `${pollMessage.id}`,
      channel_id: `${context.params.event.channel_id}`,
    });
  }
  if (context.params.event.data.options[6].value) {
    await lib.discord.channels['@0.3.0'].messages.reactions.create({
      emoji: `6️⃣`,
      message_id: `${pollMessage.id}`,
      channel_id: `${context.params.event.channel_id}`,
    });
  }
  if (context.params.event.data.options[7].value) {
    await lib.discord.channels['@0.3.0'].messages.reactions.create({
      emoji: `7️⃣`,
      message_id: `${pollMessage.id}`,
      channel_id: `${context.params.event.channel_id}`,
    });
  }
  if (context.params.event.data.options[8].value) {
    await lib.discord.channels['@0.3.0'].messages.reactions.create({
      emoji: `8️⃣`,
      message_id: `${pollMessage.id}`,
      channel_id: `${context.params.event.channel_id}`,
    });
  }
  if (context.params.event.data.options[9].value) {
    await lib.discord.channels['@0.3.0'].messages.reactions.create({
      emoji: `9️⃣`,
      message_id: `${pollMessage.id}`,
      channel_id: `${context.params.event.channel_id}`,
    });
  }
  if (context.params.event.data.options[10].value) {
    await lib.discord.channels['@0.3.0'].messages.reactions.create({
      emoji: `🔟`,
      message_id: `${pollMessage.id}`,
      channel_id: `${context.params.event.channel_id}`,
    });
  }
} catch (e) {
  null;
}

let channelInfo = await lib.discord.channels['@0.3.0'].retrieve({
  channel_id: `${context.params.event.channel_id}`,
});
let messageLink = `https://discord.com/channels/${context.params.event.guild_id}/${context.params.event.channel_id}/${pollMessage.id}`;
//log function
if (activeNodes.includes(`mainOption-loggingChannel`)) {
  try {
    await lib.discord.channels['@0.3.0'].messages.create({
      channel_id: `${process.env.logChannelId}`,
      content: '<@$!994726682223198379>',
      tts: false,
      embeds: [
        {
          type: 'rich',
          title: `New Poll`,
          description: ``,
          color: 0x5bed51, //green
          fields: [
            {
              name: `**Channel**`,
              value: `<#${channelInfo.id}>`,
              inline: true,
            },
            {
              name: `**User**`,
              value: `<@${context.params.event.member.user.id}>`,
              inline: true,
            },
            {
              name: `**Amount of Options**`,
              value: Number(context.params.event.data.options.length) - 1,
              inline: true,
            },
            {
              name: `**Message Link**`,
              value: `${messageLink}`,
              inline: true,
            },
          ],
          footer: {
            text: `Message Id: ${pollMessage.id} • ${formattedTime}`,
          },
        },
      ],
    });
    console.log(`logged`);
    return;
  } catch (e) {
    console.log(e);
    await lib.discord.interactions['@1.0.0'].responses.ephemeral.create({
      token: `${context.params.event.token}`,
      content: `Sorry <@${context.params.event.member.user.id}>, There was an error when logging the command. Please check the ID in the environment variables is correct, or deactivate the logging Node with \`/select-nodes\`.`,
    });
  }
}
