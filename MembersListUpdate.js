/**
 * An HTTP endpoint that acts as a webhook for HTTP(S) request event
 * @returns {any} result
 */
module.exports = async (context) => {
  const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
  let memberList = [];
  let allMembersRetrieved = false;
  let lastMemberID;
  // current date
  let date_ob = new Date();
  // adjust 0 before single digit date
  let date = ('0' + date_ob.getDate()).slice(-2);
  // current mmonth
  let month = ('0' + (date_ob.getMonth() + 1)).slice(-2);
  // current year
  let year = date_ob.getFullYear();
  // current hours
  let hours = date_ob.getHours();
  // current minutes
  let minutes = date_ob.getMinutes();
  // current seconds
  let seconds = date_ob.getSeconds();
  // prints date in YYYY-MM-DD format
  console.log(year + '-' + month + '-' + date);
  // prints date & time in YYYY-MM-DD HH:MM:SS format
  let date_time =
    year +
    '-' +
    month +
    '-' +
    date +
    ' ' +
    hours +
    ':' +
    minutes +
    ':' +
    seconds;
  console.log(date_time);
  // looking for members to retrieve from guild
  while (!allMembersRetrieved) {
    let params = {
      guild_id: `941700133702205491`,
      limit: 1000,
    };
    if (lastMemberID) {
      params.after = lastMemberID;
    }
    let _memberFetch = await lib.discord.guilds['@release'].members.list(
      params
    );
    // finding the last member in the guild user list  lastMember
    ID = _memberFetch[_memberFetch.length - 1].user.id;
    memberList = memberList.concat(_memberFetch);
    if (_memberFetch.length < 100000) {
      allMembersRetrieved = true;
    }
  }
  // opening an object to push data into
  let allFields = [];
  // data from the memberList to push data into the allFields variable
  for (let member of memberList) {
    allFields.push({
      id: member.user.id,
      username: member.user.username
        .concat('#')
        .concat(member.user.discriminator),
      user: member.user.username,
      discriminator: member.user.discriminator,
      nick: member.nick,
      usernickname: member.nick || member.user.username,
      joined_at: member.joined_at,
      roles: member.roles,
      datadate: date_time,
    });
  } // clearing staging table
  let delete_records = await lib.googlesheets.query['@release'].delete({
    range: `Members List!A:I`,
    bounds: 'FIRST_EMPTY_ROW',
  });
  // inserting new records into table
  let insert_into_GoogleSheets = await lib.googlesheets.query[
    '@release'
  ].insert({
    range: `Members List!A:I`,
    fieldsets: allFields,
  });

await lib.googlesheets.query['@0.3.1'].distinct({
  spreadsheetId: ``,
  range: `Members List!A:H`,
  bounds: 'FIRST_EMPTY_ROW',
  where: [{}],
  limit: {count: 0, offset: 0},
  field: `roles`,
});
}