const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

let authorId = context.params.event.author.id;

var voiceData = await lib.utils.kv['@0.1.16'].get({
  key: `voice_${context.params.event.guild_id}`, // Guild_ID
  defaultValue: `[]`,
});
let authorVcs = Object.values(voiceData).filter(function (value) {
  return value.userId == `${authorId}`;
});

if (authorVcs.length <= 0) {
  return lib.discord.channels['@0.3.2'].messages.create({
    channel_id: `${context.params.event.channel_id}`,
    content: `You are not connected to a VC.`,
    message_reference: { message_id: context.params.event.id, },
  });
}
const authorVc = authorVcs[0].channelId;

let vcTemp = await lib.utils.kv['@0.1.16'].get({
  key: `tempVc_${authorVc}`,
  defaultValue: {isTemp: false, owner: null},
});

if (vcTemp.isTemp != true) {
  return lib.discord.channels['@0.3.2'].messages.create({
    channel_id: `${context.params.event.channel_id}`,
    content: `You cannot edit <#${authorVc}>, Only TempVCs are able to be Claimed!`,
    message_reference: { message_id: context.params.event.id, },
  });
}

if (vcTemp.owner == `frozen`) {
  return lib.discord.channels['@0.3.2'].messages.create({
    channel_id: `${context.params.event.channel_id}`,
    content: `<#${authorVc}> is frozen!\n> This means it cannot be claimed nor edited.`,
    message_reference: { message_id: context.params.event.id, },
  });
}
if (vcTemp.owner) {
  var vcOwnerInfo = await lib.discord.guilds['@0.2.4'].members.retrieve({
    user_id: `${vcTemp.owner}`,
    guild_id: `${context.params.event.guild_id}`,
  });
}
//end of setup

let input = context.params.event.content.split(' ').length > 1 ? context.params.event.content.split(' ').slice(1).join(` `) : null;

if (input = `asAdmin`) {
  let authorInfo = await lib.discord.guilds['@0.2.4'].members.retrieve({
    user_id: `${authorId}`,
    guild_id: `${context.params.event.guild_id}`
  });
  let roles = await lib.discord.guilds['@0.2.4'].roles.list({
    guild_id: `${context.params.event.guild_id}`
  });
  
  for (let i = 0; i < authorInfo.roles.length; i++) {
    let roleInfo = roles.find((role) => {
      return role.id == authorInfo.roles[i];
    });
    console.log(roleInfo.permission_names);
    if (roleInfo.permission_names.includes(`MANAGE_CHANNELS`) || 
    roleInfo.permission_names.includes(`ADMINISTRATOR`)) {
      //is admin
      vcTemp.owner = null; //will remove owner allowing code below to make author the owner
    }
  }
}

if (vcTemp.owner == authorId) {
  return lib.discord.channels['@0.3.2'].messages.create({
    channel_id: `${context.params.event.channel_id}`,
    content: `You already own <#${authorVc}>!`,
    message_reference: { message_id: context.params.event.id, },
  });
}

if (vcTemp.owner == null) {
  vcTemp.owner = `${authorId}`;
  console.log(vcTemp);
  await lib.utils.kv['@0.1.16'].set({
    key: `tempVc_${authorVc}`,
    value: vcTemp,
    ttl: 8640, //1 day
  });

  await lib.discord.channels['@0.3.2'].messages.create({
    channel_id: `${context.params.event.channel_id}`,
    content: `You are now the Owner of <#${authorVc}>!`,
    message_reference: { message_id: context.params.event.id, },
  });
} else {
  await lib.discord.channels['@0.3.2'].messages.create({
    channel_id: `${context.params.event.channel_id}`,
    content: `You cannot claim <#${authorVc}>, it already belongs to \`${vcOwnerInfo.user.username}#${vcOwnerInfo.user.discriminator}\`!`,
    message_reference: { message_id: context.params.event.id, },
  });
}