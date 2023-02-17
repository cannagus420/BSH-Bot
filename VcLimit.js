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

let input = context.params.event.content.split(' ').length > 1 ? Number(context.params.event.content.split(' ').slice(1).join(` `)) : null;
console.log(`sad =`, input);

if (isNaN(input) || !input && input != 0) {
  await lib.discord.channels['@0.3.2'].messages.create({
    channel_id: `${context.params.event.channel_id}`,
    content: `Please mention number of users to limit the vc to as shown below.\n> \`vc!limit 4\``,
    message_reference: { message_id: context.params.event.id, },
  });
}

await lib.discord.channels['@0.3.2'].update({
  channel_id: `${authorVc}`,
  user_limit: input
});

await lib.discord.channels['@0.3.2'].messages.create({
  channel_id: `${context.params.event.channel_id}`,
  content: `Set the limit of <#${authorVc}> to ${input}.\n> To remove the limit, set it as 0`,
  message_reference: { message_id: context.params.event.id, },
});