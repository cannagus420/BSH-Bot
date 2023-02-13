// authenticates you with the API standard library
// type `await lib.` to display API autocomplete
const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

//The Admin Role
let role = `${process.env.ROLE_ID}`;

//If They Have The Admin Role
if (context.params.event.member.roles.includes(role)) {
  //The Text From The Slash Command
  let status = context.params.event.data.options[0].value;
  let type = context.params.event.data.options[1].value;
  let name = context.params.event.data.options[2].value;
  let url = context.params.event.data.options[3];
  
  // Converting variable from URL option
  if (!url) {
    url = '';
  } else {
    url = url.value;
  }
  
    
  await lib.discord.users['@0.1.5'].me.status.update({
      activity_name: name,
      activity_type: type,
      status: status,
      url: url,
    });
    
    // This code posts in our Discord channel when our command is run!
    return await lib.discord.interactions['@1.0.0'].responses.ephemeral.create({
    token: `${context.params.event.token}`,
    response_type: 'CHANNEL_MESSAGE_WITH_SOURCE',
    content: 'Your Status was changed successfully!',
    });
  }
  else {
    //Send A Denied Message
    let deny = await lib.discord.interactions['@1.0.0'].responses.ephemeral.create({
    token: `${context.params.event.token}`,
    response_type: 'CHANNEL_MESSAGE_WITH_SOURCE',
    content: 'This commands not for you, stoner',
    });
  }
  