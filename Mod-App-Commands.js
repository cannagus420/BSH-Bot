const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

if (context.params.event.content === 'apply') {
  await lib.discord.channels['@0.1.2'].messages.create({
    channel_id: `${context.params.event.channel_id}`,
    content: '',
    tts: false,
    components: [
      {
        type: 1,
        components: [
          {
            custom_id: `apply`,
            placeholder: `Apply Here`,
            options: [
              {
                label: `To Join Staff`,
                value: `1`,
                description: `Apply here to join the staff team!`,
                default: false,
              },
            ],
            min_values: 1,
            max_values: 1,
            type: 3,
          },
        ],
      },
    ],
    embeds: [
      {
        type: 'rich',
        title: `Applications`,
        description: `Apply below to join the staff team`,
        color: 0x00ffff,
        thumbnail: {
          url: `https://j3v8m9d3.stackpathcdn.com/photos/7qvnP86/cke/20210616110925.jpg`,
          height: 0,
          width: 0,
        },
      },
    ],
  });
}
