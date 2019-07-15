"use strict";
exports.__esModule = true;
var Excel = require('exceljs');
var workbook = new Excel.Workbook();
var da = new Date();
console.log(da);
saveDate(da);
console.log(da);
function getLastDay(date) {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}
function saveDate(firstDay) {
    var fDay = firstDay;
    var fDayNr = firstDay.getDay();
    var lDay = getLastDay(firstDay);
    console.log(fDayNr);
    console.log(lDay.getDate());
    var lenMonth = lDay.getDate();
    var workbook = new Excel.Workbook();
    workbook.properties.date1904 = true;
    workbook.views = [
        {
            x: 0, y: 0, width: 10000, height: 20000,
            firstSheet: 0, activeTab: 1, visibility: 'visible'
        }
    ];
    var sheet = workbook.addWorksheet('August');
    var worksheet = workbook.getWorksheet('August');
    //setup header
    worksheet.columns = [
        { header: 'Wochentag', key: 'Wochentag', width: 10 },
        { header: 'Datum', key: 'Datum', width: 10 },
        { header: 'Schicht 1', key: 'Schicht1', width: 10 },
        { header: 'Mittag', key: 'Mittag', width: 10 },
        { header: 'Chiller', key: 'Chiller', width: 10 },
        { header: 'Tag', key: 'Tag', width: 10 },
        { header: 'Schicht 2', key: 'Schicht2', width: 10 },
        { header: 'Schicht 3', key: 'Schicht3', width: 10 },
        { header: 'Schicht 4', key: 'Schicht4', width: 10 },
        { header: 'Schicht 5', key: 'Schicht5', width: 10 },
        { header: 'Schicht 6', key: 'Schicht6', width: 10 },
        { header: 'Schicht 7', key: 'Schicht7', width: 10 },
        { header: 'Küche M 1', key: 'KM1', width: 10 },
        { header: 'Küche M 2', key: 'KM2', width: 10 },
        { header: 'Küche N 1', key: 'KN1', width: 10 },
        { header: 'Küche A 1', key: 'KA1', width: 10 },
        { header: 'Küche A 2', key: 'KA2', width: 10 },
        { header: 'Bistro', key: 'Bistro', width: 10 },
        { header: 'Zimmer', key: 'Zimmer', width: 10 },
    ];
    var rows = getHeader(fDay);
    [
        ["Mo.-Do.", , "06:00-15:00", "11:45-13:30", , "08:30-17:30", "15:00-Ende", "16:30-offen", "17.30-offen", "18:00-offen", "18:00-offen", "18:00-offen", "10:00-14:00", "10:00-16:00", "16:00-18:00", "18:00-offen", "18:00-offen", "Nacht", "10:00-?"],
        ["Freitag", , "06:00-15:30", "11:45-13:30", "12:00-19:00", "08:00-17:00", "15:30-Ende", "16:00-offen", "16.30-offen", "17:00-offen", "17:00-offen", "18:00-offen", "10:00-14:00", "10:00-16:00", "16:00-18:00", "18:00-offen", "18:00-offen", "Nacht", "10:00-?"],
        ["Samstag", , "06:00-15:30", "11:45-13:30", "12:00-19:00", "08:00-17:00", "15:30-Ende", "16:00-offen", "16.30-offen", "17:00-offen", "17:00-offen", "18:00-offen", "10:00-14:00", "10:00-16:00", "16:00-18:00", "18:00-offen", "18:00-offen", "Nacht", "10:00-?"],
        ["So./Feiertage", , "06:00-15:30", "11:45-13:30", "12:00-19:00", "08:00-17:00", "15:00-Ende", "16:00-offen", "16.30-offen", "17:00-offen", "17:00-offen", "18:00-offen", "10:00-14:00", "10:00-16:00", "16:00-18:00", "18:00-offen", "18:00-offen", "Nacht", "10:00-?"],
    ];
    worksheet.addRows(rows);
    //set backgroundcolor of first row to orange.
    worksheet.getRow(1).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: {
            argb: 'FF8000'
        }
    };
    //cycle through leftmost columne and set backgroundcolor to orange
    var i = 2;
    for (i; i < 37; i++) {
        var cell = 'A' + i;
        worksheet.getCell(cell).fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: {
                argb: 'FF8000'
            }
        };
    }
    ;
    // freeze header
    //xSplit:0-> freeze row, ySplit: how many rows to freeze
    worksheet.views = [
        { state: 'frozen', xSplit: 0, ySplit: 5, topLeftCell: 'G10', activeCell: 'A1', showGridLines: true }
    ];
    var j = 0;
    for (j; j < lenMonth; j++) {
        console.log(j);
        var cell = 'B' + (j + 6);
        var cellDay = 'A' + (j + 6);
        var currentDay = new Date(fDay);
        currentDay.setDate(fDay.getDate() + j);
        worksheet.getCell(cell).value = currentDay;
        worksheet.getCell(cellDay).value = getDayOfWeek(currentDay.getDay());
    }
    ;
    // write to a file
    workbook.xlsx.writeFile('try.xlsx')
        .then(function () {
        // done
    });
}
function getDayOfWeek(day) {
    switch (day) {
        case 1:
            return "Montag";
            break;
        case 2:
            return "Dienstag";
            break;
        case 3:
            return "Mittwoch";
            break;
        case 4:
            return "Donnerstag";
            break;
        case 5:
            return "Freitag";
            break;
        case 6:
            return "Samstag";
            break;
        case 0:
            return "Sonntag";
            break;
        default:
            // code block
            return "Fehler";
    }
}
function getHeader(month) {
    var toReturn = [
        ["Mo.-Do.", , "06:00-15:00", "11:45-13:30", , "08:30-17:30", "15:00-Ende", "16:30-offen", "17.30-offen", "18:00-offen", "18:00-offen", "18:00-offen", "10:00-14:00", "10:00-16:00", "16:00-18:00", "18:00-offen", "18:00-offen", "Nacht", "10:00-?"],
        ["Freitag", , "06:00-15:30", "11:45-13:30", "12:00-19:00", "08:00-17:00", "15:30-Ende", "16:00-offen", "16.30-offen", "17:00-offen", "17:00-offen", "18:00-offen", "10:00-14:00", "10:00-16:00", "16:00-18:00", "18:00-offen", "18:00-offen", "Nacht", "10:00-?"],
        ["Samstag", , "06:00-15:30", "11:45-13:30", "12:00-19:00", "08:00-17:00", "15:30-Ende", "16:00-offen", "16.30-offen", "17:00-offen", "17:00-offen", "18:00-offen", "10:00-14:00", "10:00-16:00", "16:00-18:00", "18:00-offen", "18:00-offen", "Nacht", "10:00-?"],
        ["So./Feiertage", , "06:00-15:30", "11:45-13:30", "12:00-19:00", "08:00-17:00", "15:00-Ende", "16:00-offen", "16.30-offen", "17:00-offen", "17:00-offen", "18:00-offen", "10:00-14:00", "10:00-16:00", "16:00-18:00", "18:00-offen", "18:00-offen", "Nacht", "10:00-?"],
    ];
    return toReturn;
}
