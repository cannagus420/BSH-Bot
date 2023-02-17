const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
if (!context.params.event.member.permission_names.includes(`ADMINISTRATOR`)) {
  console.log(`not admin`);
  await lib.discord.interactions['@0.0.0'].followups.ephemeral.create({
    token: `${context.params.event.token}`,
    content: `Sorry <@${context.params.event.member.user.id}>, You need to be an \`ADMINISTRATOR\` to use this menu.`,
  });
  return;
}

if (context.params.event.data.values.includes(`mainOption-loggingChannel`)) {
  try {
    await lib.discord.channels['@0.3.0'].permissions.update({
      overwrite_id: `${process.env.staffRoleId}`,
      channel_id: `${process.env.logChannelId}`,
      deny: `${(1 << 11) | (1 << 4) | (1 << 6) | (1 << 13)}`,
      type: 0
    });
  } catch (e) {
    await lib.discord.interactions['@0.0.0'].followups.ephemeral.create({
      token: `${context.params.event.token}`,
      content: `Sorry <@${context.params.event.member.user.id}>, please check that the logChannelId in the environment variables is correct. If this message persists please contact the dev.`,
    });
  }
}
await lib.utils.kv.set({
  key: `AM_activeNodes_${context.params.event.guild_id}`,
  value: context.params.event.data.values,
});

console.log(context.params.event.data.values);

await lib.discord.interactions['@0.0.0'].followups.ephemeral.create({
  token: `${context.params.event.token}`,
  content: `✅ Your Options have been Saved!`,
});
