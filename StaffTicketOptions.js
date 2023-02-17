const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

const everyone = await lib.discord.guilds['@0.1.0'].roles
  .list({
    guild_id: `${context.params.event.guild_id}`,
  })
  .then((roles) => roles.find((x) => x.name === '@everyone'));

let channel = await lib.discord.channels['@0.3.0'].retrieve({
  channel_id: `${context.params.event.channel_id}`,
});

let ticket = null;
if (context.params.event.data.values.includes(`ticketOption-userReport`)) {
  try {
    ticket = await lib.discord.guilds['@0.2.2'].channels.create({
      guild_id: `${context.params.event.guild_id}`,
      name: `${context.params.event.member.user.username}s ticket`,
      position: Number(channel.position) + 0,
      topic: `${context.params.event.member.user.username}'s ticket`,
      permission_overwrites: [
        {
          id: `${everyone.id}`,
          type: 0,
          deny: `${1 << 10}`,
        },
        {
          id: `${process.env.staffRoleId}`,
          type: 0,
          allow: `${1 << 10}`,
        },
        {
          id: `${context.params.event.member.user.id}`,
          type: 1,
          allow: `${1 << 10}`,
        },
      ],
      parent_id: `${channel.parent_id}`,
    });
  } catch (e) {
    await lib.discord.channels['@0.3.0'].messages.create({
      channel_id: `${context.params.event.channel_id}`,
      content: `There was an error creating the ticket, likley caused by the \`staffRoleId\` being incorrectly inputted into the environment varibles.`,
    });
    console.log(e);
    console.log(`ERROR; likley staffRoleId incorrect 1`);
    return;
  }

  await lib.discord.interactions['@0.0.0'].followups.ephemeral.create({
    token: `${context.params.event.token}`,
    content: `Your ticket has been created, please state your report in <#${ticket.id}>.`,
  });

  let message = await lib.discord.channels['@0.3.0'].messages.create({
    channel_id: `${ticket.id}`,
    content: `<@${context.params.event.member.user.id}>`,
    embed: {
      type: 'rich',
      title: `Here is your **User Report** Ticket ${context.params.event.member.user.username}!`,
      description: `Please provide the reasoning for your report and all evidence below, after which wait patiently for a member of our staff team to respond. Please do not ping staff members, we respond as soon as we are available.`,
      color: 0x5bed51,
      footer: {
        text: `To close the Ticket, click the button below.`,
      },
    },
    components: [
      {
        type: 1,
        components: [
          {
            type: 2,
            label: '🔒 Close',
            style: 3,
            custom_id: 'ticket-confirmClose',
          },
        ],
      },
    ],
  });
} else if (
  context.params.event.data.values.includes(`ticketOption-directTicket`)
) {
  try {
    ticket = await lib.discord.guilds['@0.2.2'].channels.create({
      guild_id: `${context.params.event.guild_id}`,
      name: `${context.params.event.member.user.username}s ticket`,
      position: Number(channel.position) + 0,
      topic: `${context.params.event.member.user.username}'s ticket`,
      permission_overwrites: [
        {
          id: `${everyone.id}`,
          type: 0,
          deny: `${1 << 10}`,
        },
        {
          id: `${process.env.staffRoleId}`,
          type: 0,
          allow: `${1 << 10}`,
        },
        {
          id: `${context.params.event.member.user.id}`,
          type: 1,
          allow: `${1 << 10}`,
        },
      ],
      parent_id: `${channel.parent_id}`,
    });
  } catch (e) {
    await lib.discord.channels['@0.3.0'].messages.create({
      channel_id: `${context.params.event.channel_id}`,
      content: `There was an error creating the ticket, likley caused by the \`staffRoleId\` being incorrectly inputted into the environment varibles.`,
    });
    console.log(e);
    console.log(`ERROR; likley staffRoleId incorrect 2`);
    return;
  }

  await lib.discord.interactions['@0.0.0'].followups.ephemeral.create({
    token: `${context.params.event.token}`,
    content: `Your ticket has been created, please state your query in <#${ticket.id}>.`,
  });

  let message = await lib.discord.channels['@0.3.0'].messages.create({
    channel_id: `${ticket.id}`,
    content: `@here <@${context.params.event.member.user.id}>`,
    embed: {
      type: 'rich',
      title: `Here is your **Direct** Ticket ${context.params.event.member.user.username}!`,
      description: `Please ask your quieries below, after which wait patiently for a member of our staff team to respond. Please do not ping staff members, we respond as soon as we are available.`,
      color: 0x5bed51,
      footer: {
        text: `To close the Ticket, click the button below.`,
      },
    },
    components: [
      {
        type: 1,
        components: [
          {
            type: 2,
            label: '🔒 Close',
            style: 3,
            custom_id: 'ticket-confirmClose',
          },
        ],
      },
    ],
  });
} else if (
  context.params.event.data.values.includes(`ticketOption-staffReport`)
) {
  ticket = await lib.discord.guilds['@0.2.2'].channels.create({
    guild_id: `${context.params.event.guild_id}`,
    name: `${context.params.event.member.user.username}s ticket`,
    position: Number(channel.position) + 0,
    topic: `${context.params.event.member.user.username}'s ticket`,
    permission_overwrites: [
      {
        id: `${everyone.id}`,
        type: 0,
        deny: `${1 << 10}`,
      },
      {
        id: `${context.params.event.member.user.id}`,
        type: 1,
        allow: `${1 << 10}`,
      },
    ],
    parent_id: `${channel.parent_id}`,
  });

  await lib.discord.interactions['@0.0.0'].followups.ephemeral.create({
    token: `${context.params.event.token}`,
    content: `Your ticket has been created, please state your query in <#${ticket.id}>.`,
  });

  let message = await lib.discord.channels['@0.3.0'].messages.create({
    channel_id: `${ticket.id}`,
    content: `<@${context.params.event.member.user.id}>`,
    embed: {
      type: 'rich',
      title: `Here is your **Staff Report** Ticket ${context.params.event.member.user.username}!`,
      description: `Please provide the reasoning for your report and all evidence below, after which wait patiently for a member of our Admin team to respond. If this report involves a member of the Admin team please contact the owner directly.`,
      color: 0x5bed51,
      footer: {
        text: `To close the Ticket, click the button below.`,
      },
    },
    components: [
      {
        type: 1,
        components: [
          {
            type: 2,
            label: '🔒 Close',
            style: 3,
            custom_id: 'ticket-confirmClose',
          },
        ],
      },
    ],
  });
} else {
  await lib.discord.interactions['@0.0.0'].followups.ephemeral.create({
    token: `${context.params.event.token}`,
    content: `Please contact a member of the staff team directly.`,
  });
}

let userInfo = await lib.discord.users['@0.2.0'].retrieve({
  user_id: `${context.params.event.member.user.id}`,
});
let channelInfo = await lib.discord.channels['@0.3.0'].retrieve({
  channel_id: `${context.params.event.channel_id}`,
});
let userAvatarUrl = userInfo.avatar_url ? userInfo.avatar_url : null;
let activeNodes = await lib.utils.kv.get({
  key: `AM_activeNodes_${context.params.event.guild_id}`,
});
//log function
if (activeNodes.includes(`mainOption-loggingChannel`)) {
  try {
    let date = context.params.event.received_at.split('T')[0];
    let time = context.params.event.received_at.split('T')[1].split('.')[0];

    let userInfo = await lib.discord.users['@0.2.0'].retrieve({
      user_id: `${context.params.event.member.user.id}`,
    });
    await lib.discord.channels['@0.3.0'].messages.create({
      channel_id: `${process.env.logChannelId}`,
      content: '',
      tts: false,
      embeds: [
        {
          type: 'rich',
          title: ``,
          description: ``,
          color: 0x4daded, //blue
          fields: [
            {
              name: `**Channel Info**`,
              value: `Link: <#${ticket.id}> \n Name: #${ticket.name}`,
              inline: true,
            },
            {
              name: `**User**`,
              value: `<@${context.params.event.member.user.id}>`,
              inline: true,
            },
          ],
          footer: {
            text: `Channel Id: ${ticket.id} • Date: ${date} | Time: ${time}`,
          },
          author: {
            name: `${userInfo.username} Created a Ticket`,
            icon_url: userAvatarUrl ? `${userAvatarUrl}` : ``,
          },
        },
      ],
    });
    console.log(`logged`);
    return;
  } catch (e) {
    console.log(e);
    await lib.discord.interactions['@0.0.0'].followups.ephemeral.create({
      token: `${context.params.event.token}`,
      content: `Sorry <@${context.params.event.member.user.id}>, There was an error when logging the command. Please check the ID in the environment variables is correct, or deactivate the logging Node with \`/select-nodes\`.`,
    });
  }
}

