const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
let mod_role = `1031375602927800370`;
if (context.params.event.member.roles.includes(mod_role)) {
  await lib.discord.channels['@0.3.2'].messages.create({
    channel_id: `${context.params.event.channel_id}`,
    content: '',
    tts: false,
    embeds: [
      {
        type: 'rich',
        title: `<#944632239453515846>`,
        description: '',
        color: 0x00ffff,
        image: {
          url: `https://media.discordapp.net/attachments/941799792143650826/1044854633455177728/graveyard.jpg`,
          height: 0,
          width: 0,
        },
        url: `https://media.discordapp.net/attachments/941799792143650826/1044854633455177728/graveyard.jpg`,
      },
    ],
  });
} else {
  await lib.discord.interactions['@1.0.1'].responses.ephemeral.create({
    token: context.params.event.token,
    content: `This command isn't for you, stoner.`,
    response_type: 'CHANNEL_MESSAGE_WITH_SOURCE',
  });
}
