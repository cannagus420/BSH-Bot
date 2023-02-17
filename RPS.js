const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
const axios = require('axios');
let acceptedReplies = ['Rock', 'Paper', 'Scissors'];
let random = Math.floor(Math.random() * acceptedReplies.length);
let result = acceptedReplies[random];
let channel_ID = `${context.params.event.channel_id}`;
let winimage = `https://cdn.discordapp.com/attachments/961991593877995620/1000876081487810570/unknown.png`;
let loseimage = `https://cdn.discordapp.com/attachments/961991593877995620/1000876081903042651/unknown.png`;
let tieimage = `https://cdn.discordapp.com/attachments/961991593877995620/1000876082263756920/unknown.png`;
let choice = context.params.event.data.options[0].value;
console.log(`Bot Result: ${result}`);
if (result === choice)
  return lib.discord.channels['@0.1.2'].messages.create({
    channel_id: `${channel_ID}`,
    content: `It's a tie! <@!${context.params.event.member.user.id}>`,
    embed: {
      title: 'Tie!',
      description: `**Game Review:**\n\nWe had the same choice.\n**Choice:** \`${result}\``,
      color: 0xf2e35c,
      thumbnail: {url: `${tieimage}`, height: 0, width: 0},
      footer: {text: `Player: ${context.params.event.member.user.username}`},
    },
  });
console.log(`User Picked: ${choice}`);
switch (choice) {
  case 'Rock':
    {
      if (result === 'Paper') {
        return lib.discord.channels['@0.1.2'].messages.create({
          channel_id: `${channel_ID}`,
          content: `GG <@!${context.params.event.member.user.id}>`,
          embed: {
            title: 'I win!',
            description: `**Game Review:**\n\n**My pick:** \`${result}\`\n**Your pick:** \`${choice}\``,
            color: 0xf55b5b,
            thumbnail: {url: `${loseimage}`, height: 0, width: 0},
            footer: {
              text: `Player: ${context.params.event.member.user.username}`,
            },
          },
        });
      } else
        return lib.discord.channels['@0.1.2'].messages.create({
          channel_id: `${channel_ID}`,
          content: `GG <@!${context.params.event.member.user.id}>`,
          embed: {
            title: 'You Win!',
            description: `**Game Review:**\n\n**My pick:** \`${result}\`\n**Your pick:** \`${choice}\``,
            color: 0x3ade21,
            thumbnail: {url: `${winimage}`, height: 0, width: 0},
            footer: {
              text: `Player: ${context.params.event.member.user.username}`,
            },
          },
        });
    }
    break;
  case 'Paper':
    {
      if (result === 'Scissors') {
        return lib.discord.channels['@0.1.2'].messages.create({
          channel_id: `${channel_ID}`,
          content: `GG <@!${context.params.event.member.user.id}>`,
          embed: {
            title: 'I win!',
            description: `**Game Review:**\n\n**My pick:** \`${result}\`\n**Your pick:** \`${choice}\``,
            color: 0xf55b5b,
            thumbnail: {url: `${loseimage}`, height: 0, width: 0},
            footer: {
              text: `Player: ${context.params.event.member.user.username}`,
            },
          },
        });
      } else
        return lib.discord.channels['@0.1.2'].messages.create({
          channel_id: `${channel_ID}`,
          content: `GG <@!${context.params.event.member.user.id}>`,
          embed: {
            title: 'You Win!',
            description: `**Game Review:**\n\n**My pick:** \`${result}\`\n**Your pick:** \`${choice}\``,
            color: 0x3ade21,
            thumbnail: {url: `${winimage}`, height: 0, width: 0},
            footer: {
              text: `Player: ${context.params.event.member.user.username}`,
            },
          },
        });
    }
    break;
  case 'Scissors':
    {
      if (result === 'Rock') {
        return lib.discord.channels['@0.1.2'].messages.create({
          channel_id: `${channel_ID}`,
          content: `GG <@!${context.params.event.member.user.id}>`,
          embed: {
            title: 'I win!',
            description: `**Game Review:**\n\n**My pick:** \`${result}\`\n**Your pick:** \`${choice}\``,
            color: 0xf55b5b,
            thumbnail: {url: `${loseimage}`, height: 0, width: 0},
            footer: {
              text: `Player: ${context.params.event.member.user.username}`,
            },
          },
        });
      } else
        return lib.discord.channels['@0.1.2'].messages.create({
          channel_id: `${channel_ID}`,
          content: `GG <@!${context.params.event.member.user.id}>`,
          embed: {
            title: 'You Win!',
            description: `**Game Review:**\n\n**My pick:** \`${result}\`\n**Your pick:** \`${choice}\``,
            color: 0x3ade21,
            thumbnail: {url: `${winimage}`, height: 0, width: 0},
            footer: {
              text: `Player: ${context.params.event.member.user.username}`,
            },
          },
        });
    }
    break;
  default: {
    return lib.discord.channels['@0.1.2'].messages.create({
      channel_id: `${channel_ID}`,
      content: `<@!${context.params.event.member.user.id}> | Only these responses are accepted: \`Rock, Paper, Scissors\` (Case Sensitive))`,
    });
  }
}
