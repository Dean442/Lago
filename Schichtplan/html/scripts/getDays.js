"use strict";
exports.__esModule = true;
require("setUpMonth.js");
function getLastDay(date) {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}
function saveDate(firstDay) {
    var fDay = firstDay;
    var fDayNr = firstDay.getDay();
    var lDay = getLastDay(firstDay);
    setMonth(fDay, fDayNr, lDay);
}
