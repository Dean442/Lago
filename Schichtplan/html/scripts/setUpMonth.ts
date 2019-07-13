export{}
import { Workbook } from 'exceljs';
import * as Excel from './node_modules/exceljs/modern.nodejs';
import './plan.js';

function setMonth(fDay:Date, fDayNr, lDay:Date){

var Excel = require('exceljs');
var workbook = new Excel.Workbook();

workbook.xlsx.readFile('try.xlsx')
    .then(function() {
        var worksheet = workbook.getWorksheet(1);
        var row = worksheet.getRow(5);
        row.getCell(1).value = 5; // A5's value set to 5
        row.commit();
        return workbook.xlsx.writeFile('new.xlsx');
    })


}