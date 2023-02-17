const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
const moment = require('moment-timezone');

if (!context.params.event.member.permission_names.includes(`ADMINISTRATOR`)) {
  console.log(`not admin`);
  await lib.discord.interactions['@1.0.0'].responses.ephemeral.create({
    token: `${context.params.event.token}`,
    content: `Sorry <@${context.params.event.member.user.id}>, You need to be an \`ADMINISTRATOR\` to use this menu.`,
  });
  return;
}

let allTimeZones = moment.tz.names();
let timeZones = ``;

let searchWord = context.params.event.data.options[0].value;
searchWord = searchWord.charAt(0).toUpperCase() + searchWord.slice(1);
console.log(searchWord);
for (let i = 0; i < allTimeZones.length; i++) {
  if (allTimeZones[i].includes(`${searchWord}`)) {
    timeZones = timeZones + `"${allTimeZones[i]}", `;
  }
}
console.log(timeZones);

try {
  await lib.discord.interactions['@1.0.0'].responses.ephemeral.create({
    token: `${context.params.event.token}`,
    content: ``,
    embeds: [
      {
        type: 'rich',
        title: `Type one of these into the /timezone-set command\nTime Zones including "${searchWord}"`,
        description: timeZones ? `${timeZones}` : `None`,
        color: 0x00ffff,
      },
    ],
  });
} catch (e) {
  console.log(e);
  await lib.discord.interactions['@1.0.0'].responses.ephemeral.create({
    token: `${context.params.event.token}`,
    content: `Sorry, that message is too long to send, try searching for a city.`,
  });
}
