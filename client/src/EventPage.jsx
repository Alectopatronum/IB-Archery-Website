import React, { useState, useEffect } from 'react';
import axios from 'axios'; 

function App({ isOrganizer, user }) {       // Accepts either the Organizer or user proponent
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null); 
    const [editMode, setEditMode] = useState(false); // Track if we are in edit mode (for organizers)

    useEffect(() => {           //Loads events when called
        axios.get('/api/events')        // Fetches the events from the server and database
            .then(response => setEvents(response.data))         //Sets the event state with the corresponding data
            .catch(error => console.error("Error fetching events:", error)); 
            // continuously checks if in edit mode
    }, []);

    const handleEventClick = (event) => {    //Opens pop-up when event clicked
        setSelectedEvent(event);
        setEditMode(false); // Default to view mode
    };

    const handleEditToggle = () => setEditMode(!editMode); // Toggle edit and view mode

    const handleInputChange = (e) => {      //Handles the input changes (for organizers)
        const { name, value, type, checked } = e.target;    // Separating the event properties
        setSelectedEvent(prev => ({         // Updating the selectedEvent with the new inputted values
            ...prev,
            [name]: type === 'checkbox' ? checked : value,      // Handles the checkbox (select) separately
        }));
    };

    // Handles the changes and saving them in edit mode
    const handleSaveChanges = () => {
        axios.put(`/api/events/${selectedEvent._id}`, selectedEvent)   // Sends updated event to the server
            .then(response => {
                alert("Event updated successfully!"); 
                setEditMode(false); // Exit edit mode on successful save
                setEvents(prev => prev.map(event => event._id === selectedEvent._id ? response.data : event));
                // Updates the events list with the new inputs
            })
            .catch(error => console.error("Error updating event:", error));
            // Calls an error if the save fails
    };


    // For user registration in events
    const handleJoinEvent = () => {
        // checks whether the event needs the WAP_id
        if (selectedEvent.wapCertified && !user.WAP_id) {
            alert("A WAP ID is required to register for this WAP-certified event.");
            return;
        }

        //  Sends the request to register user to join the event to the server
        axios.post('/register-event', { eventId: selectedEvent._id }, { withCredentials: true })
            .then(response => {         // Sends the registration status to the user
                alert(response.data.message);
                setSelectedEvent({ ...selectedEvent, participants: [...selectedEvent.participants, response.data.participant] });
            })
            .catch(error => console.error("Registration failed:", error));
            //  Failed Registration.
    };

    return (
        <div className="App">
            {events.map(event => (          // Renders each event in the events page list
                <div key={event._id} onClick={() => handleEventClick(event)}>
                    {event.name}
                </div>
            ))}
            
            {selectedEvent && (     // Only renders the selected event and its modal
                <div className="modal">
                    <h2>{selectedEvent.name}</h2>
                    <p>{selectedEvent.description}</p>
                    <p>Category: {selectedEvent.category}</p>
                    <p>Discipline: {selectedEvent.discipline}</p>
                    <p>Start Date: {new Date(selectedEvent.startDate).toLocaleDateString()}</p>
                    <p>End Date: {new Date(selectedEvent.endDate).toLocaleDateString()}</p>

                    {/* WAP Certified Checkbox for Organizer */}
                    {isOrganizer && editMode ? (
                        <label>
                            WAP Certified
                            <input
                                type="checkbox"
                                name="wapCertified"
                                checked={selectedEvent.wapCertified || false}   // Shows current WAP cert. status
                                onChange={handleInputChange}                    // Updates the status on change
                            />
                        </label>
                    ) : (
                        <p>WAP Certified: {selectedEvent.wapCertified ? "Yes" : "No"}</p>
                    )}

                    {/* Edit or Save Buttons for Organizer */}
                    {isOrganizer && (
                        <button onClick={editMode ? handleSaveChanges : handleEditToggle}>
                            {editMode ? "Save Changes" : "Edit Event"}
                        </button>
                    )}

                    {/* Register Button for User */}
                    {!isOrganizer && (
                        <button onClick={handleJoinEvent}>Register for Event</button>
                    )}

                    <button onClick={() => setSelectedEvent(null)}>Close</button>

                    {/* Participants Table */}
                    {selectedEvent.participants.length > 0 && (
                        <div>
                            <h3>Participants</h3>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Category</th>
                                        <th>Participant</th>
                                        <th>Discipline</th>
                                        <th>Score</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* Table for registered participants taken from the database */}
                                    {selectedEvent.participants.map(participant => (
                                        <tr key={participant.userId}>
                                            <td>{participant.category}</td>
                                            <td>{participant.name}</td>
                                            <td>{participant.discipline}</td>
                                            <td>{participant.score !== null ? participant.score : 'N/A'}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default App;
