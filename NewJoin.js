const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
await lib.discord.guilds['@0.1.0'].members.roles.update({
  role_id: `${process.env.Role_Unverified}`,
  user_id: `${context.params.event.user.id}`,
  guild_id: `${context.params.event.guild_id}`,
});
await lib.discord.channels['@0.2.0'].messages.create({
  channel_id: `941782768801689620`,
  content: `Hiya <@${context.params.event.user.id}>, welcome to "Bud Smoker's Haven (18+)"! 
*~Visit <#941859151578026064> when you are ready to join vc with your ID. 
*~Please look for a ping in a new channel to confirm your ticket was created.  
*~Do not open more than one ticket or close your ticket.  
**NOTE: IF IT ISN'T OBVIOUS YOU'RE 18+ YOU WILL NEED TO PROVIDE AN EDITED PIC OF YOUR ID OR SHOW A STAFF MEMBER IN VC.**`,
  tts: false,
  embeds: [
    {
      type: 'rich',
      title: `Here's a list of our server rules!`,
      description: `PLEASE_READ_CAREFULLY`,
      color: 0xff5733,
      fields: [
        {
          name: `Rule 1`,
          value: `**ACT MATURELY**        
This server is 18+. We are all adults and you are expected to act accordingly.`,
        },
        {
          name: `Rule 2`,
          value: `**BE RESPECTFUL**          
Use respect with all members, including staff. Racism, Transphobia, Homophobia or any other slurs all count as disrespect and will be handled as such.`,
        },
        {
          name: `Rule 3`,
          value: `**KEEP CONTROVERSIAL/DEBATABLE/TRIGGERING TOPICS IN THE GRAVEYARD**          
This server is for chilling, smoking, sharing stories, and having a good time. Keep the vibes chill and the controversy to <#944632239453515846>.`,
        },
        {
          name: `Rule 4`,
          value: `**USE PROPER VC ETIQUETTE**          
Follow basic discord etiquette. Do not hot-mic. No interrupting or hijacking voice channels. Allow everyone to participate in the conversation.`,
        },
        {
          name: `Rule 5`,
          value: ` **ALWAYS FOLLOW DISCORD'S COMMUNITY GUIDELINES AND T.O.S**        
This includes but is not limited to; doxxing, dossing, d-dossing, swatting, hate speech, threats, and harassment. Any violators will be banned immediately.`,
        },
        {
          name: `Rule 6`,
          value: ` **NO PROMOTING OR PHISHING**          
Advertisements are kept to the <#942579720174841917> channel and need to be approved on a case by case basis, and posted by staff. No begging. No requesting, arranging, or phishing for the purchase or sale of any illicit substances or hardware. This includes cannabis.`,
        },
        {
          name: `Rule 7`,
          value: ` **NO DRAMA. BE RATIONAL AND FIND A RESOLUTION IN PRIVATE**          
Inter-server drama is not allowed. What happens outside this server stays outside it. Disputes that do arise within the server will be resolved between the involved parties privately. If finding a resolution proves difficult please reach out to staff by opening a ticket in <#943644369666330714>.`,
        },
        {
          name: `Rule 8`,
          value: ` **NO NUDES OF ANY KIND**        
Salacious images ARE NOT allowed in this server.`,
        },
        {
          name: `Rule 9`,
          value: ` **NO HARD DRUGS** 
The promotion, on cam use, or discussion of any drugs other than cannabis or psychedelics is strictly prohibited.`,
        },
      ],
    },
  ],
});
