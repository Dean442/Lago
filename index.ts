const express = require('express');
const path = require('path');
const app = express();
const plan = require('./generatePlan');

let planer = new plan();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/plan',(req,res)=>{
    plan.saveDate("2019-01-01");
    res.sendFile(path.join(__dirname, 'try.xlsx'));
})

// app.get('/', (req, res)=>{
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

// app.get('/newWorker.html', (req, res)=>{
//     res.sendFile(path.join(__dirname, 'public','newWorker.html'));
// })

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log('server started on port:', PORT));