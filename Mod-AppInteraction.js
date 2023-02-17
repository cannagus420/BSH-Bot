const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

module.exports = async (event, context) => {
  let sleep = async (ms) => {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  };
  const {
    id: message_id,
    channel_id,
    content,
    embeds,
    components,
  } = event.message;

  // Update the message with same the data to reset the selected option
  await lib.discord.channels['@0.1.1'].messages.update({
    message_id,
    channel_id,
    content,
    embeds,
    components,
  });
  if (context.params.event.data.values[0] === `1`) {
    await lib.discord.channels['@0.1.1'].messages.create({
      channel_id: `${process.env.LOG_CHANNEL}`,
      content: `<@${context.params.event.member.user.id}> started the application process`,
    });
    try {
      let dmChannel = await lib.discord.users['@0.0.1'].me.channels.create({
        recipient_id: context.params.event.member.user.id,
      });
      let message = await lib.discord.channels['@0.1.1'].messages.create({
        channel_id: dmChannel.id, // required({
        content: '',
        tts: false,
        embed: {
          type: 'rich',
          title: `Staff Application `,
          description: `Thank you for showing interest in staff applications. You will be asked some question which you have to answer honestly.\n\n **React below to start when you are ready**`,
          color: 0xa3ff78,
          thumbnail: {
            url: `https://j3v8m9d3.stackpathcdn.com/photos/7qvnP86/cke/20210616110925.jpg`,
            height: 0,
            width: 0,
          },
          footer: {
            text: `This process will timeout in 30 seconds`,
          },
        },
      });
      await lib.discord.channels['@0.1.0'].messages.reactions.create({
        emoji: `✅`,
        message_id: message.id,
        channel_id: dmChannel.id,
      });
      await lib.utils.kv['@0.1.16'].set({
        key: `${context.params.event.member.user.id}_reaction`,
        value: {
          message_id: `${message.id}`,
          channel_id: `${message.channel_id}`,
        },
      });
      let data = await lib.http.request['@1.1.6'].post({
        url: `https://discord.com/api/webhooks/${context.params.event.application_id}/${context.params.event.token}`,
        headers: {
          authorization: `Bot ${process.env.discord_bot_token}`,
        },
        params: {
          content: `**:white_check_mark: <@${context.params.event.member.user.id}> Your application has started, please check your Dms.**`,
          message_reference: {
            message_id: `${context.params.event.message.id}`,
          },
          flags: 64,
        },
      });
      await sleep(20000);
      await lib.discord.channels['@0.2.0'].messages.update({
        message_id: message.id ,
        channel_id: dmChannel.id
      });
      let reacted = await lib.utils.kv['@0.1.16'].get({
        key: `${context.params.event.member.user.id}_reacted`,
      });
      console.log(reacted);
      if (!reacted) {
      await lib.discord.channels['@0.2.0'].messages.update({
          message_id: message.id, // required
          channel_id: dmChannel.id, // required
          content: ``,
          tts: false,
          embed: {
            type: 'rich',
            title: `Staff Application -TimeOut`,
            description: `**This Process has timed out**`,
            color: 0xf90606,
            thumbnail: {
              url: `https://j3v8m9d3.stackpathcdn.com/photos/7qvnP86/cke/20210616110925.jpg`,
              height: 0,
              width: 0,
              footer: {
                text: `Staff`,
                icon_url: ``,
              },
            },
          },
        });
      }
       let timeout = await lib.utils.kv['@0.1.16'].set({
         key: `${context.params.event.member.user.id}_timeout`,
        value: {
           message_id: `${message.id}`,
            channel_id: `${message.channel_id}`,
          },
       });
      console.log(`updated message in dm`);
    } catch (err) {
      let data = await lib.http.request['@1.1.6'].post({
        url: `https://discord.com/api/webhooks/${context.params.event.application_id}/${context.params.event.token}`,
        headers: {
          authorization: `Bot ${process.env.discord_bot_token}`,
        },
        params: {
          content: `:x: <@${context.params.event.member.user.id}> **I could not send you a DM, please open your DM.**`,
          message_reference: {
            message_id: `${context.params.event.message.id}`,
          },
          flags: 64,
        },
      });
    }
  }
};
