"use strict";
exports.__esModule = true;
require("./setUpMonth.js");
function getLastDay(date) {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}
function saveDate(firstDay) {
    var fDay = firstDay;
    var fDayNr = firstDay.getDay();
    var lDay = getLastDay(firstDay);
    console.log(fDayNr);
    console.log(lDay.getDate());
    // var Excel = require('exceljs');
    // var workbook = new Excel.Workbook();
    //   workbook.xlsx.readFile('try.xlsx')
    //     .then(function() {
    //     var worksheet = workbook.getWorksheet('August');
    //     for(){
    //     };
    //     return workbook.xlsx.writeFile('new.xlsx');
    // })
}
