import React, { useState, useEffect } from 'react';
import './App.css';
import './EditContactModal.css';
import EditContactModal from './EditContactModal';

function App() {
  const [contacts, setContacts] = useState([]);
  const [editingContact, setEditingContact] = useState(null);
  const [name, setName] = useState('');

  useEffect(() => {
    // Fetch the list of contacts from the backend when the component mounts
    fetch('http://localhost/api/contacts')
      .then((response) => response.json())
      .then((data) => setContacts(data))
      .catch((error) => console.error('Error:', error));
  }, []);

  const handleCreateContact = () => {
    if (!name) {
      alert("Please enter a contact name.");
      return;
    }

    // Create a new contact and add it to the database
    fetch('http://localhost/api/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ contactName: name }),
    })
      .then((response) => response.json())
      .then((data) => {
        setContacts([...contacts, data]);
        setName('');
      })
      .catch((error) => console.error('Error:', error));
  };

  const handleDeleteContact = (contact) => {
    fetch(`http://localhost/api/contacts/${contact.id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setContacts(contacts.filter((c) => c.id !== contact.id));
      })
      .catch((error) => console.error('Error:', error));
  };

  const handleEditContact = (contact) => {
    setEditingContact(contact);
  };

  const handleSaveEditedContact = (updatedContact) => {
    fetch(`http://localhost/api/contacts/${updatedContact.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedContact),
    })
      .then((response) => response.json())
      .then(() => {
        const updatedContacts = contacts.map((contact) =>
          contact.id === updatedContact.id ? updatedContact : contact
        );
        setContacts(updatedContacts);
        setEditingContact(null);
      })
      .catch((error) => console.error('Error:', error));
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
            <li key={contact.id}>
              {contact.contactName}
              <button className="edit" onClick={() => handleEditContact(contact)}>Edit</button>
              <button className="delete" onClick={() => handleDeleteContact(contact)}>Delete</button>
              <ul>
                {contact.numbers.map((phoneNumber, index) => (
                  <li key={index}>
                    {phoneNumber}
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
