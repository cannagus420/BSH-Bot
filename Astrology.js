/**
 * ASTROLOGY HOROSCOPE DISCORD SLASH COMMAND
 * by vibrantium#0953
 
 * * Warning:
 * 1. Make sure this is a slash command titled "astrology"
 * 2. Make sure it has a REQUIRED option titled "sign" & the choices are the twelve signs of the zodiac. ALL SHOULD BE IN LOWERCASE.
 * 3. Make sure it has an OPTIONAL option titled "timeframe" & the choices are: today, yesterday, tomorrow. Value is the same as title. 
 */

// DEPENDENCIES - Do not modify & do NOT DELETE
const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
const axios = require('axios');

/** This is how your slash command registration code should look like in the slash command builder:
await lib.discord.commands['@0.0.0'].create({
  "guild_id": "YOUR-GUILD-ID", // Modify with your own Guild ID serial number
  "name": "astrology",
  "description": "get your horoscope for today!",
  "options": [
    {
      "type": 3,
      "name": "sign",
      "description": "view horoscope for which sign?",
      "choices": [
        {
          "name": "aries",
          "value": "aries"
        },
        {
          "name": "taurus",
          "value": "taurus"
        },
        {
          "name": "gemini",
          "value": "gemini"
        },
        {
          "name": "cancer",
          "value": "cancer"
        },
        {
          "name": "leo",
          "value": "leo"
        },
        {
          "name": "virgo",
          "value": "virgo"
        },
        {
          "name": "libra",
          "value": "libra"
        },
        {
          "name": "scorpio",
          "value": "scorpio"
        },
        {
          "name": "sagittarius",
          "value": "sagittarius"
        },
        {
          "name": "capricorn",
          "value": "capricorn"
        },
        {
          "name": "aquarius",
          "value": "aquarius"
        },
        {
          "name": "pisces",
          "value": "pisces"
        }
      ],
      "required": true
    },
    {
      "type": 3,
      "name": "timeframe",
      "description": "view horoscope for today, tomorrow, or yesterday?",
      "choices": [
        {
          "name": "today",
          "value": "today"
        },
        {
          "name": "tomorrow",
          "value": "tomorrow"
        },
        {
          "name": "yesterday",
          "value": "yesterday"
        }
      ]
    }
  ]
}); // End of slash command registration. Delete everything before this if you've registed the slash command manually
*/

// ACTUAL CODE
// Do not delete anything below, this is what the bot will do to serve your result

// I like to use try-catch just so the bot won't type forever if something goes wrong
try {
  await lib.discord.interactions['@1.0.1'].responses.create({
    token: `${context.params.event.token}`,
    response_type: 'DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE',
  });

  // Teaching the bot to pick up our option input
  let sign = context.params.event.data.options[0].value
  let tf = context.params.event.data.options[1]

  // If user selects no timeframe, defaults to today
  var when;
  if (!tf) {
    when = `today`;
  } else {
    when = tf.value;
  }

  // Getting horoscope data from Aztro API
  let aztro = await axios
    .request({
      method: 'POST',
      url: `https://aztro.sameerkumar.website/?sign=${sign}&day=${when}`,
    })
    .then(function (s) {
      return s.data;
    });

  // Pulling from another horoscope provider. Ohmanda is only available for option "today"
  var ohmanda = ``;
  if (when === `today`) {
    ohmanda = await axios
      .request({
        method: 'GET',
        url: `https://ohmanda.com/api/horoscope/${sign}/`,
      })
      .then(function (s) {
        return `${s.data.horoscope} _(Credit: astrology.com)_\n\n`;
      });
  }

  // Final result presentation
  await lib.discord.interactions['@1.0.1'].followups.create({
    token: `${context.params.event.token}`,
    channel_id: context.params.event.channel_id,
    content: ``,
    embeds: [
      {
        type: 'rich',
        title: `${when.replace(/^\w/, (c) =>
          c.toUpperCase()
        )} for ${sign.replace(/^\w/, (c) => c.toUpperCase())}`,
        description: `__${aztro[`current_date`]}__\n${ohmanda}${
          aztro[`description`]
        } _(Credit: horoscope.com)_`,
        fields: [
          {
            name: `${sign.replace(/^\w/, (c) => c.toUpperCase())} Season`,
            value: `${aztro[`date_range`]}`,
            inline: true,
          },
          {
            name: `Mood`,
            value: `${aztro[`mood`]}`,
            inline: true,
          },
          {
            name: `Compatibility`,
            value: `${aztro[`compatibility`]}`,
            inline: true,
          },
          {
            name: `Lucky Number`,
            value: `${aztro[`lucky_number`]}`,
            inline: true,
          },
          {
            name: `Lucky Color`,
            value: `${aztro[`color`]}`,
            inline: true,
          },
          {
            name: `Lucky Time`,
            value: `${aztro[`lucky_time`]}`,
            inline: true,
          },
        ],
        thumbnail: {
          url: `https://i.imgur.com/Fea3TW8.png`, // Editable
          height: 0,
          width: 0,
        },
      },
    ], // end of embed
  }); // End of final result presentation
} catch (e) {
  // end of try

  // Start of error handling
  console.log(e);

  // Start of error message
  await lib.discord.interactions['@1.0.1'].followups.create({
    token: `${context.params.event.token}`,
    channel_id: context.params.event.channel_id,
   content: `Uh oh stoner, looks like an unexpected error has occurred. Take a toke and try again.`, // Feel free to modify your own error message
  }); // end of error message
} // end of error handling
