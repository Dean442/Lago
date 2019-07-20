const express = require('express');
const router = express.Router();
const workers =require('../../staff/workers');
const uuid = require('uuid');


//gets all workers
router.get('/', (req,res)=>{
    res.json(workers);
})

//create worker


router.post('/',(req,res)=>{
    const newWorker ={
        id: uuid.v4(),
        Vorname: req.body.Vorname,
        Nachname: req.body.Nachname,
        color: req.body.color,
        Schichtleitung: req.body.Schichtleitung,
        Montag: req.body.Montag,
        Dienstag: req.body.Dienstag,
        Mittwoch: req.body.Mittwoch,
        Donnerstag: req.body.Donnerstag,
        Freitag: req.body.Freitag,
        Samstag: req.body.Samstag,
        Sonntag: req.body.Sonntag,
        status: 'active'

    }
    if(!newWorker.Vorname||!newWorker.color||!newWorker.Montag&& !newWorker.Dienstag&& !newWorker.Mittwoch&& !newWorker.Donnerstag&& !newWorker.Freitag&& !newWorker.Samstag&& !newWorker.Sonntag){
       return res.status(400).json({msg: 'Not all filled out'});
    }
        workers.push(newWorker);
        res.json(workers);
    
    
})

module.exports = router;