// EditContactModal.js
import React, { useState } from 'react';

function EditContactModal({ contact, onSave, onClose }) {
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [nameList, setNameList] = useState(contact.names || []);
  const [numberList, setNumberList] = useState(contact.numbers || []);

  const handleAddNameAndNumber = () => {
    if (newName && newNumber) {
      setNameList([...nameList, newName]);
      setNumberList([...numberList, newNumber]);
      setNewName('');
      setNewNumber('');
    }
  };

  const handleDeleteNameAndNumber = (index) => {
    const updatedNames = [...nameList];
    updatedNames.splice(index, 1);
    setNameList(updatedNames);

    const updatedNumbers = [...numberList];
    updatedNumbers.splice(index, 1);
    setNumberList(updatedNumbers);
  };

  const handleSave = () => {
    onSave({
      ...contact,
      names: nameList,
      numbers: numberList,
    });
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Edit Contact</h2>
        <div className="input-container">
          <input type="text" placeholder="Enter Contact Type" value={newName} onChange={(e) => setNewName(e.target.value)} />
        </div>
        <div className="input-container">
          <input type="text" placeholder="Enter Contact Number" value={newNumber} onChange={(e) => setNewNumber(e.target.value)} />
        </div>
        <button className="add" onClick={handleAddNameAndNumber}>Add Name & Number</button>
        <h3>Names & Numbers:</h3>
        <ul>
          {nameList.map((name, index) => (
            <li key={index} className="name-rectangle">
              <span>{name} - {numberList[index]}</span>
              <button className="delete" onClick={() => handleDeleteNameAndNumber(index)}>Delete</button>
            </li>
          ))}
        </ul>
        <button className="save" onClick={handleSave}>Save</button>
        <button className="cancel" onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}

export default EditContactModal;
