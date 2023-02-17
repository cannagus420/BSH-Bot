const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
if (!context.params.event.member.permission_names.includes(`ADMINISTRATOR`)) {
  console.log(`not admin`);
  await lib.discord.interactions['@1.0.0'].responses.ephemeral.create({
    token: `${context.params.event.token}`,
    content: `Sorry <@${context.params.event.member.user.id}>, You need to be an \`ADMINISTRATOR\` to use this menu.`,
  });
  return;
}

let channelInfo = await lib.discord.channels['@0.3.0'].retrieve({
  channel_id: `${context.params.event.data.options[0].value}`,
});
if (channelInfo.type !== 4) {
  await lib.discord.interactions['@1.0.0'].responses.ephemeral.create({
    token: `${context.params.event.token}`,
    content: `<#${context.params.event.data.options[0].value}> is not a **Catagory**!`,
  });
  return;
}

await lib.utils.kv.set({
  key: `AM_archiveCategory_${context.params.event.guild_id}`,
  value: `${context.params.event.data.options[0].value}`,
});

await lib.discord.channels['@0.1.1'].messages.create({
  channel_id: `${context.params.event.channel_id}`,
  content: ``,
  embed: {
    title: `Create a Ticket`,
    type: 'rich',
    description: `Select why you want to contact staff from the drop down menu, doing so will create a ticket.`,
    color: 0x2d8bef,
    footer: {
      text: ``,
      icon_url: ``,
      proxy_icon_url: ``,
    },
  },
  components: [
    {
      type: 1,
      components: [
        {
          custom_id: `ticket-options`,
          placeholder: `Select Reason`,
          options: [
            {
              label: `Report a user`,
              value: `ticketOption-userReport`,
              description: `Report a user for breaking the server rules`,
              default: false,
            },
            {
              label: `Message a Staff Member`,
              value: `ticketOption-directTicket`,
              description: `Open a direct conversation with our staff team`,
              default: false,
            },
            {
              label: `Report a staff member`,
              value: `ticketOption-staffReport`,
              description: `Contacts the Admin team privately`,
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
});

const everyone = await lib.discord.guilds['@0.1.0'].roles
  .list({
    guild_id: `${context.params.event.guild_id}`,
  })
  .then((roles) => roles.find((x) => x.name === '@everyone'));

await lib.discord.channels['@0.1.1'].permissions.update({
  overwrite_id: `${everyone.id}`,
  channel_id: `${context.params.event.channel_id}`,
  deny: `${1 << 11}`,
  type: 0,
});
