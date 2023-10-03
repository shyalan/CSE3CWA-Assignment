import React, { useState, useEffect } from 'react';
import './App.css';
import './EditContactModal.css';
import EditContactModal from './EditContactModal';

function App() {
  const [contacts, setContacts] = useState([]);
  const [editingContact, setEditingContact] = useState(null);
  const [name, setName] = useState('');

  useEffect(() => {
    // Fetch the list of contacts from the backend
  }, []);

  const handleCreateContact = () => {
    // Check if the name is empty
    if (!name) {
      alert("Please enter a contact name.");
      return;
    }

    // Check if the name already exists in the list of contacts
    const nameExists = contacts.some((contact) => contact.contactName === name);

    if (nameExists) {
      alert("Contact with the same name already exists.");
      return; // Do not add the contact
    }

    // Create a new contact with the contact name that the user entered
    // Add the new contact to the list of contacts
    setContacts([...contacts, { contactName: name, names: [], numbers: [] }]);
    setName(''); // Clear the input field after creating the contact
  };

  const handleDeleteContact = (contact) => {
    // Delete the contact from the list of contacts
    setContacts(contacts.filter((c) => c !== contact));
  };

  const handleEditContact = (contact) => {
    setEditingContact(contact);
  };

  const handleSaveEditedContact = (updatedContact) => {
    // Update the contact in the list of contacts
    const updatedContacts = contacts.map((contact) =>
      contact === editingContact ? updatedContact : contact
    );
    setContacts(updatedContacts);
    setEditingContact(null); // Close the modal
  };

  return (
    <div>
      <h1>Contactor</h1>
      <div className="container">
        <h2>Contacts</h2>
        <input type="text" placeholder="Enter contact name" value={name} onChange={(event) => setName(event.target.value)} />
        <button className="create" onClick={handleCreateContact}>Create Contact</button>
        <ul>
          {contacts.map((contact) => (
            <li key={contact.contactName}>
              {contact.contactName}
              <button className="edit" onClick={() => handleEditContact(contact)}>Edit</button>
              <button className="delete" onClick={() => handleDeleteContact(contact)}>Delete</button>
              <ul>
                {contact.names.map((name, index) => (
                  <li key={index}>
                    {name} - {contact.numbers[index]}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
        {editingContact && (
          <EditContactModal
            contact={editingContact}
            onSave={handleSaveEditedContact}
            onClose={() => setEditingContact(null)}
          />
        )}
      </div>
    </div>
  );
}

export default App;
