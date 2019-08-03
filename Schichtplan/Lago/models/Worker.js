import mongoose from 'mongoose';

const workerSchema = new mongoose.Schema({
    Vorname: {
      type: String,
      unique: false,
    },
    Nachname:{
        type: String,
        unique: false,
    },
    Schichtleitung:{
        type: boolean,
    },
    Montag:{
        type: boolean,
    },
    Dienstag:{
        type: boolean,
    },
    Mittwoch:{
        type: boolean,
    },
    Donnerstag:{
        type: boolean,
    },
    Freitag:{
        type: boolean,
    },
    Samstag:{
        type: boolean,
    },
    Sonntag:{
        type: boolean,
    },
    AnzahlSchichten:{
        type: number,
    },
    FerienVon:{
        type: Date,
    },
    FerienBis:{
        type: Date,
    },

    
  });
  
  const User = mongoose.model('Worker', workerSchema);
  
  export default Worker;