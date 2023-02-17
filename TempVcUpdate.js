const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

let vcHubChannels = [process.env.vcHubId, `1035758999561322586`]; //replace if you want to change the ID in the file rather than in the Environment Varibles ot have multiple hubs

console.log(context.params.event.member.user.username);
let author = context.params.event.member.user;
let joinedChannelId = context.params.event.channel_id ? context.params.event.channel_id : null;
let guildId = context.params.event.guild_id;

//retrieve voiceData from KV
var voiceData = await lib.utils.kv['@0.1.16'].get({
  key: `voice_${guildId}`, // Guild_ID
  defaultValue: `[]`,
});
console.log(`voiceData (old voice data) =`, voiceData);

// Tries to save the ID of the channel the user just left (as leftVcId), if they havnt just left a VC it will be null
let leftChannelObject = Object.values(voiceData).filter(function (value) {
  return value.userId == `${author.id}`;
});
var leftVcId = leftChannelObject[0] ? leftChannelObject[0].channelId : null;
var leftVcInfo = await lib.utils.kv['@0.1.16'].get({
  key: `tempVc_${leftVcId}`,
  defaultValue: {isTemp: false, owner: null},
});
console.log(`leftVcInfo =`, leftVcInfo);
console.log(`leftVcId =`, leftVcId);

//if the last VC they left was a temp VC
if (leftVcInfo.isTemp) {
  console.log(`Left Vc is temp`);
  var remainingChannelUsers = Object.values(voiceData).filter(function (value) {
    return (
      value.channelId == `${leftVcId}` &&
      value.userId != `${author.id}`
    );
  }); //Filter all the users in the VC excluding the user who left (as they are not there anymore)
  
  //if the leaving user is owner. change owner to null
  if (leftVcInfo.owner == author.id && remainingChannelUsers.length > 0) {
    await lib.utils.kv['@0.1.16'].set({
      key: `tempVc_${leftVcId}`,
      value: {isTemp: true, owner: null},
      ttl: 86400, //1 day
    }); // change owner to null
  }
  
  if (remainingChannelUsers.length <= 0 && !vcHubChannels.includes(leftVcId) && joinedChannelId != leftVcId) {
    //if there is noone else, and a you have left a vc, which is NOT the hub channel, and the joined channel is not leftVc (leftVc is current VC if the user didnt actually leave, e.g, when muting). If all thats true it gets deleted
    try {
      await lib.discord.channels['@0.3.2'].destroy({
        channel_id: `${leftVcId}`,
      });
      await lib.utils.kv['@0.1.16'].clear({
        key: `tempVc_${leftVcId}`,
      });
      console.log(`Destroyed`);
    } catch (e) {
      console.log(`Error Destroying`);
    }
  }
}

//if channel ID is provided (joining VC or already in VC)
if (joinedChannelId) {
  console.log(`Joined (or member updated)`);
  var voiceValues = Object.values(voiceData).filter(function (value) {
    return value.userId != `${author.id}`;
  }); // sets voiceValues as all the users in any VC excluding the user, this is used as a reset before we add the user to the array. Its expected that this will do nothing to the array as the user shouldnt be there yet

  let currentInfo = {
    userId: `${author.id}`,
    channelId: `${joinedChannelId}`,
  }; //create an object with userId and channelID
  
  if (vcHubChannels.includes(joinedChannelId) && !leftVcInfo.isTemp) {
    //enabling the code to the right stops the creation of tempVCs when moving from a tempVc to the hub
    console.log(`in Hub`);

    let hubInfo = await lib.discord.channels['@0.3.2'].retrieve({
      channel_id: `${joinedChannelId}`,
    }); //to get the category (parent) info of the HUB

    let tempChannel = await lib.discord.guilds['@0.2.4'].channels.create({
      guild_id: `${guildId}`,
      name: `${author.username}'s TempVc`, //name
      type: 2, //voice channel
      parent_id: hubInfo.parent_id ? `${hubInfo.parent_id}` : ``, //same category as HUB
    });

    try {
      await lib.discord.guilds['@0.2.4'].members.voice.update({
        user_id: `${author.id}`,
        guild_id: `${guildId}`,
        channel_id: `${tempChannel.id}`,
      }); //move the user to thier new VC
      currentInfo.channelId = tempChannel.id; //update user's location to the new VC

      await lib.utils.kv['@0.1.16'].set({
        key: `tempVc_${tempChannel.id}`,
        value: {isTemp: true, owner: `${author.id}`},
        ttl: 86400, //1 day (24 hours)
      }); // set info about the TempVC
    } catch (e) {
      await lib.discord.channels['@0.3.2'].destroy({
        channel_id: `${tempChannel.id}`,
      }); //if there was an error moving the user they may have joined and quickly left the HUB, this will delete the temp VC
      var tempChannelDeleted; //sets true if the tempVC gets deleted for the reason above
      await lib.utils.kv['@0.1.16'].clear({
        key: `tempVc_${tempChannel.id}`,
      });
    }
  }
  if (!tempChannelDeleted && !vcHubChannels.includes(joinedChannelId)) {
    //if the VC was not deleted
    var voiceValues = voiceValues.concat(currentInfo); //add object to voiceData array (new array called voiceValues) => {}
  }
} else if (!joinedChannelId) {
  //if no channel ID is provided (leaving VC)

  var voiceValues = Object.values(voiceData).filter(function (value) {
    return value.userId != `${author.id}`;
  }); //filter voiceData to remove all objects that have the user, (new array called voiceValues)
}
console.log(`voiceValues (new voice data) =`, voiceValues);

//sets voiceValues to KV
await lib.utils.kv['@0.1.16'].set({
  key: `voice_${guildId}`,
  value: voiceValues,
  ttl: 1209600, // 2 weeks
});



// DEBUGGING LINE

/*
await lib.discord.channels['@0.3.2'].messages.create({
  channel_id: `944466611543375912`, //replace with a channel ID
  content: `1. <@${voiceValues[0] ? voiceValues[0].userId : null}> <#${voiceValues[0] ? voiceValues[0].channelId : null}>\n2. <@${voiceValues[1] ? voiceValues[1].userId : null}>: <#${voiceValues[1] ? voiceValues[1].channelId : null}>`
});
*/
