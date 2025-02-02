const express = require('express');
const cors = require('cors');
var app = express();
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const UserModel = require('./models/User');
const User = require('./models/User.js');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const mongoose = require("mongoose");
const jwtSecret = 'asdf68s5df746a54fasa6dfs54';

//necessary add-ons to the server

    
  app.use(cookieParser());  
  app.use(bodyParser.json());
  app.use(cors({
      origin: 'http://127.0.0.1:5174',  
      credentials: true,
      methods: ['GET', 'PUT', 'POST'],
  }));
  
    mongoose.connect(process.env.MONGO_URL);

  app.post('/register', async(req,res) => {
      const {name,email,password, WAP_id, age, discipline} = req.body;  //Gets the inputs from Register Page

      try{
        const userDoc = await User.create({
            name,
            email,
            password:bcrypt.hashSync(password, 10),     //Bcrypt encrypting the password with 10 salt (randomizes the password 10 times)
            category,
            discipline,
            WAP_id
        });
        res.json(userDoc);      // Submits the inputs and the encrypted password to the Database
      }  catch(e){
            res.status(422).json(e);
        }
  });
  
  app.post('/login', async(req,res) => {
    const {email,password} = req.body;         
    //Gets the input from the Input Page.
    const userDoc = await User.findOne({email:email});      
    // Searches for the inputed email in the Database.
    if (userDoc) {
        const passOk = bcrypt.compareSync(password, userDoc.password)       
        // Compares the password inputed to the encrypted password using BCRYPT.
        if(passOk){     //If successful, signs in the user
            jwt.sign({
                email:userDoc.email,        
                id: userDoc._id,
                name: userDoc.name,
            },  jwtSecret, {}, (err, token) =>{

                if(err) throw err;
                    res.cookie('token', token, {        //Creates a cookie for the user
                }).json(userDoc);
            });
        } else{
            res.status(422).json('pass not ok');        
            // If unsuccessful, there is no cookie made and doesn't login user
        }

    } else{
        res.json('not found');      // Login user not found
    }
  });

  app.get('/profile', (req, res) => {
    const {token} = req.cookies;        // Gets the cookie of the user
    if(token){
        jwt.verify(token, jwtSecret, {}, (err, userData) => {
            if(err) throw err;
            res.json(userData);     
            // If a cookie exists, the userData is sent to the Profile Page
        });
    } else{
        res.json(null);
    }
  });

/*

// Event creation route (Admin only)
app.post('/api/events', async (req, res) => {
    const { name, description, startDate, endDate, category, discipline, wapCertified } = req.body; 
    // Gets inputs organizers make when creating an event
    try {
        const event = new Event({
            name,
            description,
            startDate,
            endDate,
            category,
            discipline,
            wapCertified,  // Gets event certification status
        });
        await event.save();     // Saves event in the Database
        res.status(201).json(event);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Fetch all events
app.get('/api/events', async (req, res) => {
    try {
        const events = await Event.find();      
        //Searches for Event in the Data Base
        res.json(events);   
        //Returns the event and gives it to the events page (to be displayed)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

  // User registering for an event
  app.post('/register-event', async (req, res) => {
    const { token } = req.cookies; // Gets the JWT Token from the cookies
    const { eventId } = req.body;   

    if (!token) return res.status(401).json("Not authorized"); //checks if user is authenticated (logged in)

    try {
        const userData = jwt.verify(token, jwtSecret); 
        const user = await UserModel.findById(userData.id); //Fetches user details by ID

        const event = await Event.findById(eventId); // Gets the eventID from the database
        if (!event) return res.status(404).json("Event not found"); // If event doesn't exist, returns "Event not found"

        // If event is WAP-certified, verify that user has a WAP ID
        if (event.wapCertified && !user.WAP_id) {
            return res.status(400).json("A WAP ID is required to register for this event");
        }

        const participant = {   // Defining the participant as an object to be added to the event
            userId: user._id,
            name: user.name,
            discipline: user.discipline,
            score: null
        };
        
        // Add participant only if they're not already registered
        if (!event.participants.some(p => p.userId.equals(user._id))) {
            event.participants.push(participant);
            await event.save();
            res.status(201).json({ message: "Successfully registered for event" }); 
            //Adds Participant to event's participants list
        } else {
            res.status(400).json({ message: "Already registered" }); 
            //If the user is already registered, returns an error
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


//Getting the Participants for an Event
app.get('/api/events/:eventId/participants', async (req, res) => { //Gets eventID
    const { eventId } = req.params;

    try {
        const event = await Event.findById(eventId).populate('participants.userId', 'name discipline');
        if (!event) return res.status(404).json("Event not found"); //checks again if the event exists, if it does, it proceeds

        res.json(event.participants);       //returns the participants list
    } catch (error) {
        res.status(500).json({ error: error.message });     //error handler
    }
});

//Inputting the Score
app.put('/api/events/:eventId/participant/:participantId/score', async (req, res) => {
    const { eventId, participantId } = req.params;  //Gets events and participants information from the database
    const { score } = req.body;         //gets the score input from the organizer

    try {
        const event = await Event.findById(eventId);
        if (!event) return res.status(404).json("Event not found");         //  Checks if event exists

        const participant = event.participants.find(p => p.userId.equals(participantId));   //Finds the participant's ID
        if (participant) {
            participant.score = score;      //Updates the participant's scores
            await event.save();             //Saves changes to the database
            res.json({ message: "Score updated successfully" });
        } else {
            res.status(404).json("Participant not found");     //If participant doesn't exist, returns an error
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

*/

  app.get('/test', (req,res) => {
        res.json('test ok');
    });

app.listen(5000);

app.listen(5000, 'localhost');         // Server running in localhost:5000
app.on('listening', function(){
    console.log('Express server started on port %s at %s', server.address().port, server.address().address);
});