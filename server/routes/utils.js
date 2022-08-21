var moment = require('moment');
require('moment-precise-range-plugin');

module.exports.calculateTimeLeft=(alarmDate) => {
    // alarmDate format: '2014-02-03 12:53:12'
    let starts = moment(alarmDate, 'YYYY-MM-DD HH:mm:ss');
    let ends   = moment();
    let diff = moment.preciseDiff(starts, ends, true);
    console.log("DIFF", diff)
    return diff.years * 31556952 + diff.months * 2629746 + diff.days * 86400 + diff.hours * 3600 + diff.minutes * 60 + diff.seconds
}