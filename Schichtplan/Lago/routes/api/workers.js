const express = require('express');
const router = express.Router();
const workers =require('../../staff/workers');
const uuid = require('uuid');
//Import the mongoose module
var mongoose = require('mongoose');

//Set up default mongoose connection
var mongoDB = 'mongodb://127.0.0.1/Lago';
mongoose.connect(mongoDB, { useNewUrlParser: true });

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//gets all workers
router.get('/', (req,res)=>{
    res.json(workers);
})

//create worker


router.post('/',(req,res)=>{

    const workerJSON ={
        Vorname: req.body.Vorname,
        Nachname: req.body.Nachname,
        color: req.body.color,
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

         
    if(!workerJSON.Vorname||!workerJSON.color||!workerJSON.Montag&& !workerJSON.Dienstag&& !workerJSON.Mittwoch&& !workerJSON.Donnerstag&& !workerJSON.Freitag&& !workerJSON.Samstag&& !workerJSON.Sonntag){
        return res.status(400).json({msg: "not all filled in"});
     
     }
    var newWorker = new WorkerModel({ 
        
        Vorname: workerJSON.Vorname,
        Nachname: workerJSON.Nachname,
        color: workerJSON.color,
        Schichtleitung: workerJSON.Schichtleitung,
        Montag: workerJSON.Montag,
        Dienstag: workerJSON.Dienstag,
        Mittwoch: workerJSON.Mittwoch,
        Donnerstag: workerJSON.Donnerstag,
        Freitag: workerJSON.Freitag,
        Samstag: workerJSON.Samstag,
        Sonntag: workerJSON.Sonntag,
        FerienVon: req.body.FerienVon,
        FerienBis: req.body.FerienBis
     });



    // Save the new model instance, passing a callback
    newWorker.save(function (err) {
      if (err) return handleError(err);
      // saved!
      res.send('done');
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
  FerienVon: Date,
  FerienBis: Date

});

// Compile model from schema
var WorkerModel = mongoose.model('WorkerModel', WorkerModelSchema );

module.exports = router;