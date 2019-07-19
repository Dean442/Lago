var express = require('express');
var path = require('path');
var app = express();
var plan = require('./scripts/generatePlan.js');
var month="";


// app.use(express.static(path.join(__dirname, 'public')));

app.get('/index.html', (req, res)=>{
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.get('/newWorker.html', (req, res)=>{
    res.sendFile(path.join(__dirname, 'public','newWorker.html'));
})

app.get('/download', (req,res)=>{
    res.download('plan.xlsx', month+'.xlsx');
})
//get the file
app.get('/plan/:date', function (req, res) {

    plan.saveDate(req.params.date);
    // res.sendFile(path.join(__dirname, './try.xlsx'));
    res.sendFile(path.join(__dirname, 'public','download.html'));
    month= plan.month(req.params.date);
});
var PORT = process.env.PORT || 5000;
app.listen(PORT, function () { return console.log('server started on port:', PORT); });
