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
    content: `You cannot edit <#${authorVc}>, Only TempVCs are able to be Managed!`,
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

let mentionedUser = context.params.event.mentions[0] ? context.params.event.mentions[0] : null
console.log(mentionedUser);

if (mentionedUser) {
  await lib.discord.guilds['@0.2.4'].members.voice.disconnect({
    user_id: `${mentionedUser.id}`,
    guild_id: `${context.params.event.guild_id}`
  });
  await lib.discord.channels['@0.3.2'].messages.create({
    channel_id: `${context.params.event.channel_id}`,
    content: `\`${mentionedUser.username}#${mentionedUser.discriminator}\` has been kicked from <#${authorVc}>!`,
    message_reference: { message_id: context.params.event.id, },
  });
} else {
  await lib.discord.channels['@0.3.2'].messages.create({
    channel_id: `${context.params.event.channel_id}`,
    content: `Please mention a user as shown below.\n> \`vc!kick @user\``,
    message_reference: { message_id: context.params.event.id, },
  });
}