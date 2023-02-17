const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
const moment = require('moment-timezone');
let timeZone = await lib.utils.kv['@0.1.16'].get({
  key: `AM_timeZone${context.params.event.guild_id}`,
  defaultValue: `Asia/Calcutta`,
});
let formattedTime = moment(context.params.event.received_at)
  .tz(`${timeZone}`)
  .format('DD/MM/YYYY - hh:mm');
console.log(formattedTime);
await lib.discord.channels['@0.3.0'].messages.create({
  channel_id: `${context.params.event.channel_id}`,
  content: ``,
  embeds: [
    {
      type: 'rich',
      title: `Command List`,
      description: `This App is designed to be user friendly unlike this help list. To get started user \`/select-nodes\`.\n\nRequired: \`[]\`\nOptional: \`()\`\n‎`,
      color: 0x00ffff,
      fields: [
        {
          //invis character: ‎‎
          name: `Staff Channel-Commands Node`,
          value: `These Commands are for Staff members with adequate permissions focused toward moderating channels.\n**/lock (message)** - Denies Members from sending messages in current channel.\n**/unlock** - Allows Members to send messages in current channel.\n**/slowmode [integer]** - Sets the slowmode of the Current Channel.\n**/lockdown (message)** - Locks all the channels listed in /set-lockdown.\n**/unlockdown** - Unlocks all the channels listed in /set-lockdown.\n**/lockdown-list** - Lists what channels are selected for /lockdown.\n**/purge [amount] (user)** - Bulk Deletes a specified amount of messages.\n‎‎‎‎`,
          inline: false,
        },
        {
          name: `Staff User-Commands Node`,
          value: `These Commands are for Staff members with adequate permissions focued toward moderating users.\n**/timeout [user] [seconds] (reason)** - Timeout a user.\n**/untimeout [user] (reason)** - Removes a user's timeout.\n**/ban [user] (delete-days) (reason)** - Ban a user.\n**/unban [user] (reason)** - Unban a user, accepts user IDs as well.\n**/kick [user] (reason)** - \n**/softban [user] (delete-days) (reason)** - Bans and immediately unbans a user.\n**/mute [user] (reason)** - Puts the user into permanent Timeout.\n**/unmute [user]** - Removes a Perm or temporary Timeout.\n‎**/warn [user] (reason)** - Warns a user.\n**/warn-list [user]** - Retrieve a list of Wanings given to a user.\n**/warn-remove [user] (warnId)** - Remove one warning from a user.\n**/warn-clear [user]** - Clear all warnings for a member.\n.`,
          inline: false,
        },
        {
          name: `User Utility-Commands Node`,
          value: `Commands anyone can use if the node is active.\n**/poll [message] [option1] [option2] (option3) (option4) (option5)** - Create a poll for others to vote upon.\n**/whois [user]** - Get info about a certian user.\n**/roleinfo [role]** - Get info about a certain role.\n**/serverinfo** - Get info about the current Guild.\n**/defineword [word]** - Lookup a word from the english dictionary (idea from LaRose#8695).\n**/avatar [user]** - Get the avatar of a user.\n**/banner [user]** - Get the banner of a user.\n‎`,
          inline: false,
        },
        {
          name: `Commands with No Required Node`,
          value: `**/select-nodes** - Select which nodes to activate.\n**/setup-ticket** - Setup the ticket system in the current channel.\n**/set-lockdown** - Select which channels to include in lockdowns.\n**/timezone-set** - Set your preferred timezone for logging messages.\n**/timezone-list [search-word]** - Retrieve a list of valid Timezones\n‎`,
          inline: false,
        },
        {
          name: `Logging Channel Node`,
          value: `This Node activates the Logging channel which keeps records of all Moderation commands used from this App!\n‎`,
          inline: false,
        },
      ],
      footer: {
        text: `Created and Developed by MeltedButter#9266`,
        icon_url: `https://cdn.discordapp.com/attachments/707564386700754986/904348835625725972/butter.jpeg`,
      },
    },
  ],
});
