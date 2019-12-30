const express = require('express');
const router = express.Router();
const workers =require('../../staff/workers');
const path = require('path');

const directory = ('../../public/');
//Import the mongoose module
var mongoose = require('mongoose');

//Set up default mongoose connection
var mongoDB = 'mongodb://127.0.0.1/Lago';

//create worker

router.get('/index', (req,res)=>{
    res.redirect('http://localhost:5000');
});

router.post('/',(req,res)=>{

    mongoose.connect(mongoDB, { useNewUrlParser: true });

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    console.log(req.params.color);

    const workerJSON ={
        Vorname: req.body.Vorname,
        Nachname: req.body.Nachname,
        color: req.body.favcolor,
        Schichtleitung: req.body.Schichtleitung,
        Montag: req.body.Montag,
        Dienstag: req.params.Dienstag,
        Mittwoch: req.body.Mittwoch,
        Donnerstag: req.body.Donnerstag,
        Freitag: req.body.Freitag,
        Samstag: req.body.Samstag,
        Sonntag: req.body.Sonntag,
        FerienVon: req.body.FerienVon,
        FerienBis: req.body.FerienBis
    };
         
    if(!workerJSON.Vorname||!workerJSON.color){
        return res.send(workerJSON.color);
     
     }
     
    var newWorker = new WorkerModel({ 
        
        Vorname: workerJSON.Vorname,
        Nachname: workerJSON.Nachname,
        color: trimmer(workerJSON.color),
        
        Schichtleitung: caster(workerJSON.Schichtleitung),
        Montag: caster(workerJSON.Montag),
        Dienstag: caster(workerJSON.Dienstag),
        Mittwoch: caster(workerJSON.Mittwoch),
        Donnerstag: caster(workerJSON.Donnerstag),
        Freitag: caster(workerJSON.Freitag),
        Samstag: caster(workerJSON.Samstag),
        Sonntag: caster(workerJSON.Sonntag),
        HowmanyDays: req.body.HowmanyDays,
        FerienVon: req.body.FerienVon,
        FerienBis: req.body.FerienBis
     });

     console.log(newWorker);
    // Save the new model instance, passing a callback
    newWorker.save(function (err) {
      if (err) return handleError(err);
      // saved!
      db.close();
      res.redirect('http://localhost:5000');
    });

        // res.json(workers);
    
    
})

// Define schema
var Schema = mongoose.Schema;

var WorkerModelSchema = new Schema({

  Vorname: String,
  Nachname: String,
  color: String,
  Schichtleitung: Boolean,
  Frühschicht: Boolean,
  Montag: Boolean,
  Dienstag: Boolean,
  Mittwoch: Boolean,
  Donnerstag: Boolean,
  Freitag: Boolean,
  Samstag: Boolean,
  Sonntag: Boolean,
  HowmanyDays: Number,
  FerienVon: Date,
  FerienBis: Date

});

// Compile model from schema
var WorkerModel = mongoose.model('WorkerModel', WorkerModelSchema );


function caster(toCast){
    switch (toCast) {
        case "on":
            return true;
            break;
        default:
            return false;
        }
    }

function trimmer(toTrimm){
   return toTrimm.substring(1,7);
}




module.exports = router;

