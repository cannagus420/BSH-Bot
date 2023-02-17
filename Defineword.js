const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
const moment = require('moment-timezone');
const axios = require('axios');
let activeNodes = await lib.utils.kv.get({
  key: `AM_activeNodes_${context.params.event.guild_id}`,
  defaultValue: `[ 'mainOption-staff-channelCommands', 'mainOption-staff-userCommands' ]`,
});
console.log(activeNodes);
if (!activeNodes.includes(`mainOption-user-utilityCommands`)) {
  await lib.discord.interactions['@1.0.0'].responses.ephemeral.create({
    token: `${context.params.event.token}`,
    content: `Sorry <@${context.params.event.member.user.id}>, this Node is not activated. If you believe this is an error, please contact the staff team.`,
  });
  return;
}
const word = context.params.event.data.options[0].value;
try {
  const {data} = await axios.get(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
  );
  console.log(data[0].meanings);
  let timeZone = await lib.utils.kv['@0.1.16'].get({
    key: `AM_timeZone${context.params.event.guild_id}`,
    defaultValue: `Asia/Calcutta`,
  });
  let formattedTime = moment(context.params.event.received_at)
    .tz(`${timeZone}`)
    .format('DD/MM/YYYY - hh:mm');
  console.log(formattedTime);
  let definition1 = data[0].meanings[0].definitions[0].definition
    ? data[0].meanings[0].definitions[0].definition
    : `None`;
  let example1 = data[0].meanings[0].definitions[0].example
    ? data[0].meanings[0].definitions[0].example
    : `None`;
  let definition2 = data[0].meanings[1].definitions[0].definition
    ? data[0].meanings[1].definitions[0].definition
    : `None`;
  let example2 = data[0].meanings[1].definitions[0].example
    ? data[0].meanings[1].definitions[0].example
    : `None`;
  let synonyms1_1 = data[0].meanings[0].definitions[0].synonyms
    ? data[0].meanings[0].definitions[0].synonyms[0]
    : `None`;
  let synonyms1_2 = data[0].meanings[0].definitions[0].synonyms
    ? data[0].meanings[0].definitions[0].synonyms[1]
    : ``;
  let synonyms1_3 = data[0].meanings[0].definitions[0].synonyms
    ? data[0].meanings[0].definitions[0].synonyms[2]
    : ``;
  let synonyms2_1 = data[0].meanings[1].definitions[0].synonyms
    ? data[0].meanings[1].definitions[0].synonyms[0]
    : `None`;
  let synonyms2_2 = data[0].meanings[1].definitions[0].synonyms
    ? data[0].meanings[1].definitions[0].synonyms[1]
    : ``;
  let synonyms2_3 = data[0].meanings[1].definitions[0].synonyms
    ? data[0].meanings[1].definitions[0].synonyms[2]
    : ``;
  let partOfSpeech2 = data[0].meanings[1].partOfSpeech
    ? ` / ${data[0].meanings[1].partOfSpeech}`
    : ``;
  let message = await lib.discord.channels['@0.2.0'].messages.create({
    channel_id: `${context.params.event.channel_id}`,
    content: ``,
    tts: false,
    embeds: [
      {
        type: 'rich',
        title: `Dictionary: ${word}`,
        description: ``,
        color: 0xcb4a43,
        fields: [
          {
            name: `**Phonetic**`,
            value: `${data[0].phonetic}`,
            inline: true,
          },
          {
            name: `**Part Of Speech**`,
            value: `${data[0].meanings[0].partOfSpeech}`,
            inline: true,
          },
          {
            name: `**.**`,
            value: `.`,
            inline: true,
          },
          {
            name: `**Definition**`,
            value: `${definition1}`,
            inline: true,
          },
          {
            name: `**Example**`,
            value: `${example1}`,
            inline: true,
          },
          {
            name: `**Synonyms**`,
            value: `${synonyms1_1}\n${synonyms1_2}\n${synonyms1_3}`,
            inline: true,
          },
          {
            name: `**Definition**`,
            value: `${definition2}`,
            inline: true,
          },
          {
            name: `**Example**`,
            value: `${example2}`,
            inline: true,
          },
          {
            name: `**Synonyms**`,
            value: `${synonyms2_1}\n${synonyms2_2}\n${synonyms2_3}`,
            inline: true,
          },
          {name: `**Origin**`, value: `${data[0].origin}`, inline: false},
        ],
        footer: {
          text: `Requested by ${context.params.event.member.user.username} • ${formattedTime}`,
        },
      },
    ],
  });
} catch (e) {
  console.log(e);
  await lib.discord.interactions['@1.0.0'].responses.ephemeral.create({
    token: `${context.params.event.token}`,
    content: `Sorry, failed to retrieve \`${word}\`. Please try again in a couple seconds.`,
  });
} 
