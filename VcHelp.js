const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

await lib.discord.channels['@0.3.2'].messages.create({
  channel_id: `${context.params.event.channel_id}`,
  content: `Here is the help menu for Temp VCs!`,
  message_reference: {message_id: context.params.event.id},
  embeds: [
    {
      type: 'rich',
      title: `Help Menu`,
      description: `My prefix is \`vc!\`!`,
      color: 0x00ffff,
      fields: [
        {
          name: `vc!lock`,
          value: `Locks your TempVc`,
        },
        {
          name: `vc!limit`,
          value: `Caps your vc to a certain amount of users`,
        },
        {
          name: `vc!claim`,
          value: `Claim a vc if it has no owner. Admins can use \`vc!claim asAdmin\` to claim another users vc.`,
        },
        {
          name: `vc!freeze`,
          value: `Freezes a vc in its current setting`,
        },
        {
          name: `vc!kick`,
          value: `Kick a user from your TempVc`,
        },
        {
          name: `vc!ban`,
          value: `Kicks and denies a user from connecting to your TempVc`,
        },
        {
          name: `vc!owner`,
          value: `Check the owner of your TempVc or transfer ownership`,
        },
        {
          name: `vc!rename`,
          value: `Change the name of your TempVc`,
        },
      ],
    },
  ],
});
