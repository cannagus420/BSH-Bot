const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
await lib.discord.interactions['@1.0.1'].responses.ephemeral.create({
  token: context.params.event.token,
  response_type: 'CHANNEL_MESSAGE_WITH_SOURCE',
content:'',
  embeds: [
    {
      type: 'rich',
      title: `Member Slash Commands`,
      description: ` `,
      color: 0x00ffff,
      fields: [
        {
          name: `1: /talk`,
          value: `**Talk Command:**\nPings the \`@ServerSaint\` role and creates a personal thread for those who need to talk with someone about what's going on in life.\n**Command:**\nUse \`/talk\` anywhere to chat privately with a @ServerSaint in the <#986494841330487306> channel.`,
        },
        {
          name: `2: /suggest`,
          value: `**Suggest Command:**\nSubmits your suggestion for the server. \n**Command:**\nUse \`/suggest\` in any channel to submit your suggestion to our <#946539495711445022> channel.`,
        },
        {
          name: `3: /sesh`,
          value: `**Sesh Ping Command:**\nPings the \`@SeshPings\` role for vc. \n**Command:**\nUse \`/sesh\` in any channel to send a ping to <#942150773364641833>`,
        },
        {
          name: `4: /profile`,
          value: `**XP Command:**\nGet (your/your friend's) placement on the leaderboard or your/your friend's xp rank in the server. \n**Commands:**\n\`/leaderboard\` Shows the server's leaderboard \n\`/profile\` check your rank\n\`/profile (@friend)\` Lets you check your friend's current level, rank, and Eventcord profile.`,
        },
        {
          name: `5: /bump`,
          value: `**Server Bump Command:**\n Bumps us up the list of servers (makes us more visible) on the Disboard platform.\n**Command:**\nUse \`/bump\` in the <#941836523802886144> channel`,
        },
        {
          name: `6: /astrology`,
          value: `**Horoscope Command:**\n Gives you your daily horoscope.\n**Command:**\nUse \`/astrology {your astrological sign} (timeframe)< **optional**\` in the <#942867168935170058>  channel.`,
        },
        {
          name: `7: /movie`,
          value: `**Movie Ping Command:**\nPings the \`@Movie Pings\` role to let everyone know you're about to stream a movie. \n**Command:**\nUse \`/movie\` in any channel.\n **MOVIES ARE TO BE STREAMED IN A GENERATED VC PLEASE!**\"`,
        },
        {
          name: `8: /confess`,
          value: `**Confess Command:**\nSubmits your anonymous confession to the <#942632245519331408> channel.\n**Command:** \nUse \`/confess\` in any channel.`,
        },
        {
          name: `9: /game`,
          value: `**Gaming Ping:**\nPings everyone with the \`@GamingPings\` role to let them know you're trying to play.\n**Command:** \nJust use \`/game\` in any channel to send your ping to the <#1055690216238755860> channel.`,
        },
        {
          name: `10: /topic`,
          value: `**Topic Generator:**\nGenerates a random topic question. \n**Command:**\nUse \`/topic\` in <#941700134213935116> to create a new topic`,
        },
        {
          name: `11: /rps`,
          value: `**Rock Paper Scissors Game:**\nStarts a round of rps with the bot. \n**Command:**\nUse \`/rps\` in <#941700134213935116> to start a game.`,
          },
          {
          name: `12: /8ball`,
          value: `**Magic 8ball:**\nAsk the 8ball a question and get a randomly generated answer. \n**Command:**\nUse \`/8ball\` in <#941700134213935116>`,
          },
      ],
    },
  ],
});