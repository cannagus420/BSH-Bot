// authenticates you with the API standard library// type `await lib.` to display API autocomplete
const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
let event = context.params.event;
console.log(event);
let user = await lib.discord.users['@0.0.6'].retrieve({
  user_id: event.member.user.id,
});
console.log({user});
let result = await lib.discord.guilds['@0.1.0'].channels.create({
  guild_id: `${context.params.event.guild_id}`, // required
  name: `${event.member.user.username}`, // required
  topic: `Verifying ${event.member.user.username}`,
  parent_id: `942540750938312735`,
  permission_overwrites: [
    {
      id: context.params.event.guild_id, //Put your guild ID here (This will stop everyone from seeing the ticket, only staff and the user who made the ticket)
      type: 0,
      deny: `${1 << 10}`,
    },
    {
      id: `${process.env.staffRoleId}`, // Your staff's Role ID (So staff can see the ticket)
      type: 0,
      allow: `${1 << 10}`,
    },
  ],
});
await lib.discord.channels['@0.1.1'].permissions.update({
  overwrite_id: event.member.user.id, // user ID goes here
  channel_id: result.id, // channel ID goes here
  allow: `${1 << 10}`,
  type: 1,
});
await lib.discord.channels['@0.2.0'].messages.create({
  channel_id: result.id,
  content: `@here`,
  embed: {
    title: `${event.member.user.username} has created a ticket!`,
    type: 'rich',
    color: 0xff0345,
    description: `Hello! To proceed ping the <@&941758667819188234>. A staff member will hop in <#941784811327066133> asap.    If it isn't obvious you're 18+ you'll need to provide an edited pic of your i.d. with only the YEAR of birth and photo visible.    **PLEASE DON'T CLOSE/DELETE TICKET!**`,
  },
  components: [
    {
      type: 1,
      components: [
        {type: 2, label: '🔒 Close', style: 3, custom_id: 'ticket-close'},
      ],
    },
  ],
});
