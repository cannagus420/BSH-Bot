const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

let question_2 = await lib.utils.kv['@0.1.16'].get({
  key: `${context.params.event.author.id}_question2`
});
let question_3 = await lib.utils.kv['@0.1.16'].get({
  key: `${context.params.event.author.id}_question3`
});
let question_4 = await lib.utils.kv['@0.1.16'].get({
  key: `${context.params.event.author.id}_question4`
});
let question_5 = await lib.utils.kv['@0.1.16'].get({
  key: `${context.params.event.author.id}_question5`
});
let question_6 = await lib.utils.kv['@0.1.16'].get({
  key: `${context.params.event.author.id}_question6`
});
let question_7 = await lib.utils.kv['@0.1.16'].get({
  key: `${context.params.event.author.id}_question7`
});
let question_8 = await lib.utils.kv['@0.1.16'].get({
  key: `${context.params.event.author.id}_question8`
});
let question_9 = await lib.utils.kv['@0.1.16'].get({
  key: `${context.params.event.author.id}_question9`
});
let question_9_done = await lib.utils.kv['@0.1.16'].get({
  key: `${context.params.event.author.id}_question9_done`
});
let application_active = await lib.utils.kv['@0.1.16'].get({
  key: `${context.params.event.author.id}_application_active`
});
if(application_active === 'yes' && context.params.event.content === 'cancel')
{
  
    await lib.utils.kv['@0.1.16'].clear({
      key: `${context.params.event.author.id}_application_active`
    });
    await lib.discord.channels['@0.2.0'].messages.create({
      channel_id: context.params.event.channel_id, 
      content: ``,
       "tts": false,
       "embeds": [
      {
        "type": "rich",
        "title": ``,
        "description": `**Your application is cancelled**`,
        "color": 0xf90606
        },
        ]
        });
        await lib.discord.channels['@0.1.1'].messages.create({
              channel_id: `${process.env.LOG_CHANNEL}`,
              content: `<@${context.params.event.author.id}>used the cancel command during application process.`,
        });
  return;
  }
if(question_2 === 'yes' && application_active)
{
  await lib.discord.channels['@0.2.0'].messages.create({
    channel_id: context.params.event.channel_id,
    content: ``,
    "tts": false,
       "embeds": [
      {
        "type": "rich",
        "title": ``,
        "description": `**Q.2** Do you have any experience moderating any other servers?`,
        "color": 0x00FFFF,
        "footer": {
          "text": "Type cancel to cancel your application"
          } 
        },
        ] 
  });
  await lib.utils.kv['@0.1.16'].clear({
    key: `${context.params.event.author.id}_question2`
  });
  await lib.utils.kv['@0.1.16'].set({
    key: `${context.params.event.author.id}_question3`,
    value: `yes`
  });
  await lib.utils.kv['@0.1.16'].set({
    key: `${context.params.event.author.id}_answer1`,
    value: context.params.event.content
  });
}
else if(question_3 === 'yes' && application_active)
{
  await lib.discord.channels['@0.2.0'].messages.create({
    channel_id: context.params.event.channel_id,
    content: ``,
    "tts": false,
      "embeds": [
     {
       "type": "rich",
       "title": ``,
       "description": `**Q.3** What are weaknesses that you have?`,
       "color": 0x00FFFF,
       "footer": {
         "text": "Type cancel to cancel your application"
         } 
       },
       ] 
  });
  await lib.utils.kv['@0.1.16'].clear({
    key: `${context.params.event.author.id}_question3`
  });
  await lib.utils.kv['@0.1.16'].set({
    key: `${context.params.event.author.id}_question4`,
    value: `yes`
  });
  await lib.utils.kv['@0.1.16'].set({
    key: `${context.params.event.author.id}_answer2`,
    value: context.params.event.content
  });
}
else if(question_4 === 'yes' && application_active)
{
  await lib.discord.channels['@0.2.0'].messages.create({
    channel_id: context.params.event.channel_id,
    content: ``,
    "tts": false,
     "embeds": [
    {
      "type": "rich",
      "title": ``,
      "description": `**Q.4** A user started to spam the server. What will you do?`,
      "color": 0x00FFFF,
      "footer": {
        "text": "Type cancel to cancel your application"
        } 
      },
      ] 
  });
  await lib.utils.kv['@0.1.16'].clear({
    key: `${context.params.event.author.id}_question4`
  });
  await lib.utils.kv['@0.1.16'].set({
    key: `${context.params.event.author.id}_question5`,
    value: `yes`
  });
  await lib.utils.kv['@0.1.16'].set({
    key: `${context.params.event.author.id}_answer3`,
    value: context.params.event.content
  });
}
else if(question_5 === 'yes' && application_active)
{
  await lib.discord.channels['@0.2.0'].messages.create({
    channel_id: context.params.event.channel_id,
    content: ``,
    "tts": false,
     "embeds": [
    {
      "type": "rich",
      "title": ``,
      "description": `**Q.5** A user started a fight with another server member. What will you do?`,
      "color": 0x00FFFF,
      "footer": {
        "text": "Type cancel to cancel your application"
        } 
      },
      ] 
  });
  await lib.utils.kv['@0.1.16'].clear({
    key: `${context.params.event.author.id}_question5`
  });
  await lib.utils.kv['@0.1.16'].set({
    key: `${context.params.event.author.id}_question6`,
    value: `yes`
  });
  await lib.utils.kv['@0.1.16'].set({
    key: `${context.params.event.author.id}_answer4`,
    value: context.params.event.content
  });
}
else if(question_6 === 'yes' && application_active)
{
  await lib.discord.channels['@0.2.0'].messages.create({
    channel_id: context.params.event.channel_id,
    content: ``,
    "tts": false,
     "embeds": [
    {
      "type": "rich",
      "title": ``,
      "description": `**Q.6** Why Do you think that you're fit for this position?`,
      "color": 0x00FFFF,
      "footer": {
        "text": "Type cancel to cancel your application"
        } 
      },
      ] 
  });
  await lib.utils.kv['@0.1.16'].clear({
    key: `${context.params.event.author.id}_question6`
  });
  await lib.utils.kv['@0.1.16'].set({
    key: `${context.params.event.author.id}_question7`,
    value: `yes`
  });
  await lib.utils.kv['@0.1.16'].set({
    key: `${context.params.event.author.id}_answer5`,
    value: context.params.event.content
  });
}
else if(question_7 === 'yes' && application_active)
{
  await lib.discord.channels['@0.2.0'].messages.create({
    channel_id: context.params.event.channel_id,
    content: ``,
    "tts": false,
     "embeds": [
    {
      "type": "rich",
      "title": ``,
      "description": `**Q.7** Chat started turning toxic. What will you do?`,
      "color": 0x00FFFF,
      "footer": {
        "text": "Type cancel to cancel your application"
        } 
      },
      ] 
  });
  await lib.utils.kv['@0.1.16'].clear({
    key: `${context.params.event.author.id}_question7`
  });
  await lib.utils.kv['@0.1.16'].set({
    key: `${context.params.event.author.id}_question8`,
    value: `yes`
  });
  await lib.utils.kv['@0.1.16'].set({
    key: `${context.params.event.author.id}_answer6`,
    value: context.params.event.content
  });
}
else if(question_8 === 'yes' && application_active)
{
  await lib.discord.channels['@0.2.0'].messages.create({
    channel_id: context.params.event.channel_id,
    content: ``,
    "tts": false,
     "embeds": [
    {
      "type": "rich",
      "title": ``,
      "description": `**Q.8** One quality that you have that everyone should have?`,
      "color": 0x00FFFF,
      "footer": {
        "text": "Type cancel to cancel your application"
        } 
      },
      ] 
  });
  await lib.utils.kv['@0.1.16'].clear({
    key: `${context.params.event.author.id}_question8`
  });
  await lib.utils.kv['@0.1.16'].set({
    key: `${context.params.event.author.id}_question9`,
    value: `yes`
  });
  await lib.utils.kv['@0.1.16'].set({
    key: `${context.params.event.author.id}_answer7`,
    value: context.params.event.content
  });
}
else if(question_9 === 'yes' && application_active)
{
  await lib.discord.channels['@0.2.0'].messages.create({
    channel_id: context.params.event.channel_id,
    content: ``,
    "tts": false,
     "embeds": [
    {
      "type": "rich",
      "title": ``,
      "description": `**Q.9** Do you know any moderation bot commands? If yes, Mention some.`,
      "color": 0x00FFFF,
      "footer": {
        "text": "Type cancel to cancel your application"
        } 
      },
      ] 
  });
  await lib.utils.kv['@0.1.16'].clear({
    key: `${context.params.event.author.id}_question9`
  });
   await lib.utils.kv['@0.1.16'].set({
    key: `${context.params.event.author.id}_question9_done`,
    value: `yes`
  });
  await lib.utils.kv['@0.1.16'].set({
    key: `${context.params.event.author.id}_answer8`,
    value: context.params.event.content
  });
}
else if(question_9_done === 'yes' && application_active)
{
  let ans1 = await lib.utils.kv['@0.1.16'].get({
    key: `${context.params.event.author.id}_answer1`
  });
  let ans2 = await lib.utils.kv['@0.1.16'].get({
    key: `${context.params.event.author.id}_answer2`
  });
  let ans3 = await lib.utils.kv['@0.1.16'].get({
    key: `${context.params.event.author.id}_answer3`
  });
  let ans4 = await lib.utils.kv['@0.1.16'].get({
    key: `${context.params.event.author.id}_answer4`
  });
  let ans5 = await lib.utils.kv['@0.1.16'].get({
    key: `${context.params.event.author.id}_answer5`
  });
  let ans6 = await lib.utils.kv['@0.1.16'].get({
    key: `${context.params.event.author.id}_answer6`
  });
  let ans7 = await lib.utils.kv['@0.1.16'].get({
    key: `${context.params.event.author.id}_answer7`
  });
  let ans8 = await lib.utils.kv['@0.1.16'].get({
    key: `${context.params.event.author.id}_answer8`
  });
  let ans9 = context.params.event.content;
  await lib.discord.channels['@0.2.0'].messages.create({
    channel_id: context.params.event.channel_id ,
    content: ``,
    "tts": false,
      "embeds": [
     {
      "type": "rich",
       "title": ``,
      "description": `**Your Application is submitted**`,
       "color": 0x1585db
           },
           ] 
  });
await lib.discord.channels['@0.2.0'].messages.create({
    channel_id: `944329584294391828`,
    content: ``,
     "tts": false,
      "embeds": [
     {
       "type": "rich",
       "title": `Application Review `,
       "description": `**Applicant**:<@!${context.params.event.author.id}>\n\n **Q.1 What is your age and Why do you want to become a moderator?**\n *Ans.1 ${ans1}*\n\n **Q.2 Do you have any experience moderating any other servers?**\n *Ans.2 ${ans2}*\n\n   **Q.3 What are weaknesses that you have?**\n *Ans.3 ${ans3}*\n\n **Q.4 A user started to spam the server. What will you do?**\n *Ans.4 ${ans4}*\n\n  **Q.5 A user started a fight with another server member. What will you do?** \n *Ans.5 ${ans5}*\n\n  **Q.6 Why Do you think that you're fit for this position?**\n *Ans.6 ${ans6}*\n\n  **Q.7 Chat started turning toxic. What will you do?**\n *Ans.7 ${ans7}*\n\n  **Q.8 One quality that you have and no one should have?**\n *Ans.8 ${ans8}*\n\n  **Q.9 Do you know any moderation bot commands? If yes, Mention some.**\n *Ans.9 ${ans9}*`,
       "color": 0x00FFFF,
      },
       ] 
  });
  await lib.utils.kv['@0.1.16'].clear({
    key: `${context.params.event.author.id}_question9_done`
  });
  for (let i = 1; i < 9; i++) {
    await lib.utils.kv['@0.1.16'].clear({
      key: `${context.params.event.author.id}_answer${i}`
    });
  }
}





