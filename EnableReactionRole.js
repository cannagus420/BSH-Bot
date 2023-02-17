const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

let role = await lib.utils.kv['@0.1.16'].get({
  key: `role-${context.params.event.message.id}`,
});

let name = await lib.utils.kv['@0.1.16'].get({
  key: `name-${context.params.event.message.id}`,
});

try {
  if (context.params.event.member.roles.includes(role)) {
    await lib.discord.interactions['@1.0.1'].followups.ephemeral.create({
      token: `${context.params.event.token}`,
      content: '',
      tts: false,
      embeds: [
        {
          type: 'rich',
          title: `Error`,
          description: `You already have this role. To disable it, click the disable ${name} button`,
          color: 0xe34c4c,
        },
      ],
    });
    return;
  } else {
    await lib.discord.guilds['@0.2.4'].members.roles.update({
      role_id: `${role}`,
      user_id: `${context.params.event.member.user.id}`,
      guild_id: `${context.params.event.guild_id}`,
    });
    await lib.discord.interactions['@1.0.1'].followups.ephemeral.create({
      token: `${context.params.event.token}`,
      content: '',
      tts: false,
      embeds: [
        {
          type: 'rich',
          title: `Success 🎉`,
          description: `The \`${name}\` role has been added.`,
          color: 0x35bb09,
        },
      ],
    });
  }
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
