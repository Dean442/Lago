export{}
import './setUpMonth.js';

function getLastDay(date){
    return new Date(date.getFullYear(),date.getMonth()+1,0);
  }

function saveDate(firstDay){
      let fDay:Date = firstDay;
      let fDayNr = firstDay.getDay();
      let lDay:Date = getLastDay(firstDay);
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

  