const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

let message = await lib.utils.kv['@0.1.16'].get({
  key: `message-${context.params.event.id}`,
  defaultValue: false
});

if (message === false) {
  return;
}

await lib.utils.kv['@0.1.16'].clear({
  key: `name-${context.params.event.id}`
});
await lib.utils.kv['@0.1.16'].clear({
  key: `role-${context.params.event.id}`
});
await lib.utils.kv['@0.1.16'].clear({
  key: `message-${context.params.event.id}`
});
console.log(`Cleared`)
