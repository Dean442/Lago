"use strict";
exports.__esModule = true;
require("./plan.js");
function setMonth(fDay, fDayNr, lDay) {
    var Excel = require('exceljs');
    var workbook = new Excel.Workbook();
    workbook.xlsx.readFile('try.xlsx')
        .then(function () {
        var worksheet = workbook.getWorksheet(1);
        var row = worksheet.getRow(5);
        row.getCell(1).value = 5; // A5's value set to 5
        row.commit();
        return workbook.xlsx.writeFile('new.xlsx');
    });
}
