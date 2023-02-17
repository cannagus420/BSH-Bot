const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

// Creates command on first run
let firstCheck = await lib.utils.kv['@0.1.16'].get({
  key: `EmbedCommand-Check`,
  defaultValue: true,
});

// Checks to see if you have the Embed Role
if (firstCheck) {
  await lib.discord.commands['@0.0.0'].create({
    guild_id: '941700133702205491',
    name: 'embed',
    description: 'Create an Embed sent by the bot!',
    options: [
      {
        type: 3,
        name: 'title',
        description: 'The Title of your Embed (Formating will not work)',
        required: true,
      },
      {
        type: 3,
        name: 'description',
        description: 'The Description of your Embed',
        required: true,
      },
      {
        type: 3,
        name: 'color',
        description:
          'Provide the Color Hex Code of the Embed (Example: FFFFFF (White))',
        required: true,
      },
      {
        type: 3,
        name: 'url',
        description:
          "If you'd like an URL add it! (make sure it's in https:// format)",
      },
      {
        type: 3,
        name: 'image',
        description:
          "Attach an image link if you'd like! (make sure it's in https:// format)",
      },
      {
        type: 3,
        name: 'footer',
        description: 'The Footer of your embed',
      },
    ],
  });

  await lib.utils.kv['@0.1.16'].set({
    key: `EmbedCommand-Check`,
    value: false,
  });

  return 'Slash command created successfully';
}

if (context.params.event.id === '0000000000000000')
  return 'Please run the slash command from Discord';

let author = context.params.event.member.roles;
if (author.includes(process.env.EMBED_ROLE)) {
  // Command Option variables
  let title = context.params.event.data.options[0].value;
  let description = context.params.event.data.options[1].value;
  let color = context.params.event.data.options[2].value;
  let url = context.params.event.data.options[3];
  let image = context.params.event.data.options[4];
  let footer = context.params.event.data.options[5];
  // Converting Variables
  if (!url) {
    url = '';
  } else {
    url = url.value;
  }

  if (!image) {
    image = '';
  } else {
    image = image.value;
  }

  if (!footer) {
    footer = '';
  } else {
    footer = footer.value;
  }
  // Adds 0x to color value, and removes it as a string
  color = '0x' + color;
  color = parseInt(color, 16);

  // Creates embed
  await lib.discord.channels['@0.1.1'].messages.create({
    channel_id: `${context.params.event.channel_id}`,
    content: '',
    tts: false,
    embed: {
      type: 'rich',
      title: title,
      description: description,
      color: color,
      image: {
        url: image,
        height: 0,
        width: 0,
      },
      footer: {
        text: footer,
      },
      url: url,
    },
  });
} else {
  await lib.discord.interactions['@1.0.1'].followups.ephemeral.create({
    token: `context.param.event.token`,
    content: `This command isn't for you, stoner.`
  });
  }