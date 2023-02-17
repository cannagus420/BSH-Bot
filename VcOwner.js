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

let mentionedUser = context.params.event.mentions[0] ? context.params.event.mentions[0] : null

if (!mentionedUser) {
  if (vcOwnerInfo && vcOwnerInfo.user.id == authorId) {
    await lib.discord.channels['@0.3.2'].messages.create({
      channel_id: `${context.params.event.channel_id}`,
      content: `You are the owner of <#${authorVc}>.\n> You can transfer ownership using \`/owner @user\``,
      message_reference: { message_id: context.params.event.id, },
    });
  } else if (vcOwnerInfo) {
    await lib.discord.channels['@0.3.2'].messages.create({
      channel_id: `${context.params.event.channel_id}`,
      content: `The current owner of <#${authorVc}> is \`${vcOwnerInfo.user.username}#${vcOwnerInfo.user.discriminator}\`.\n> They can transfer ownership using \`/owner @user\``,
      message_reference: { message_id: context.params.event.id, },
    });
  } else {
    await lib.discord.channels['@0.3.2'].messages.create({
      channel_id: `${context.params.event.channel_id}`,
      content: `Noone is the owner of <#${authorVc}>!\n> Claim it with \`vc!claim\``,
      message_reference: { message_id: context.params.event.id, },
    });
  }
} else {
  vcTemp.owner = mentionedUser.id;
  await lib.utils.kv['@0.1.16'].set({
    key: `tempVc_${authorVc}`,
    value: vcTemp,
    ttl: 8640, //1 day
  })
  await lib.discord.channels['@0.3.2'].messages.create({
    channel_id: `${context.params.event.channel_id}`,
    content: `You have transfered ownership of <#${authorVc}> to \`${mentionedUser.username}#${mentionedUser.discriminator}\`!`,
    message_reference: { message_id: context.params.event.id, },
  });
}