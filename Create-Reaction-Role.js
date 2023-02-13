const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

let admin = false;

let role = context.params.event.data.options[0].value;

let name = context.params.event.data.options[1].value;

let description = context.params.event.data.options[2].value;

let hex = context.params.event.data.options[3].value;

let emoji = context.params.event.data.options[4].value;

let channel = context.params.event.data.options[5].value;

let server = await lib.discord.guilds['@0.1.0'].retrieve({
  guild_id: `${context.params.event.guild_id}`,
});

let rrStaff = process.env.REACTIONROLE_STAFF_ID;

if (context.params.event.member.roles.includes(rrStaff)) {
  admin = true;
}

let owner = server.owner_id;

if (owner === context.params.event.member.user.id) {
  admin = true;
}

if (admin === false) {
  return await lib.discord.interactions['@1.0.1'].followups.ephemeral.create({
    token: `${context.params.event.token}`,
    content: '',
    tts: false,
    embeds: [
      {
        type: 'rich',
        title: `Error`,
        description: `This command requires the <@&${process.env.REACTIONROLE_STAFF_ID}> role`,
        color: 0xe34c4c,
      },
    ],
  });
}

let newHex = `0x${hex}`;

try {
  let message = await lib.discord.channels['@0.3.0'].messages.create({
    channel_id: `${channel}`,
    content: '',
    tts: false,
    components: [
      {
        type: 1,
        components: [
          {
            style: 3,
            label: `Enable ${name}`,
            custom_id: `enableRole`,
            disabled: false,
            emoji: {
              id: null,
              name: `✅`,
            },
            type: 2,
          },
          {
            style: 4,
            label: `Disable ${name}`,
            custom_id: `disableRole`,
            disabled: false,
            emoji: {
              id: null,
              name: `📵`,
            },
            type: 2,
          },
        ],
      },
    ],
    embeds: [
      {
        type: 'rich',
        title: `${emoji} | ${name}`,
        description: `${description}`,
        color: parseInt(newHex),
      },
    ],
  });
  await lib.utils.kv['@0.1.16'].set({
    key: `role-${message.id}`,
    value: `${role}`
  });
  await lib.utils.kv['@0.1.16'].set({
    key: `name-${message.id}`,
    value: `${name}`
  });
  await lib.utils.kv['@0.1.16'].set({
    key: `message-${message.id}`,
    value: true,
  });
} catch (e) {
  console.log(e);
  await lib.discord.interactions['@1.0.1'].followups.ephemeral.create({
    token: `${context.params.event.token}`,
    content: '',
    tts: false,
    embeds: [
      {
        type: 'rich',
        title: `Error`,
        description: `${e}`,
        color: 0xe34c4c,
      },
    ],
  });
}
