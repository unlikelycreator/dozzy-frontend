import React from 'react';
import './index.css';
import { addItem, updateItem,  getAllItems, deleteItem } from "./utils/HandleApi";
import { useEffect } from 'react';
import { useState, useRef } from 'react';
import {AiFillDelete} from "react-icons/ai"
import {CgClose} from "react-icons/cg"

function App() {
  const [notes, setNotes] = useState([]);
  const [showModal, setShowModal] = useState(false); 
  const [title, setTitle] = useState("");
  const[content, setContent] = useState("")
  const[noteId, setNoteId] = useState("")
  const [color, setColor] = useState("#EDF5E1");
  const modalRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  useEffect(() => {
    getAllItems(setNotes);
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowModal(false);
      }
  };
      document.addEventListener("click", handleOutsideClick);

      return () => {
        document.removeEventListener("click", handleOutsideClick);
      };
    }, []);

  const filteredNotes = notes.filter((note) => {
    return note.title.toLowerCase().includes(searchQuery.toLowerCase()) || note.content.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleColorChange = (e) => {
    setColor(e.target.value);
  };

  const handleNewTaskSubmit = (event) => {
    event.preventDefault();
    addItem(title, content, color, setNotes);
    setTitle("");
    setContent("");
    setColor("")
    setShowModal(false); 
  };

  const handleTaskClick = (noteID) => {
    const note = notes.find((note) => note._id === noteID);
    setTitle(note.title)
    setContent(note.content)
    setNoteId(noteID)
    setShowModal(true);
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    updateItem(noteId, title, content, color, setNotes);
    setNoteId(null)
    setTitle("");
    setContent("");
    setShowModal(false);
    setColor("")
  }

  const handleDelete = () => { 
    deleteItem(noteId, setNotes)
    setShowModal(false);
    setNoteId(null)
    setTitle("");
    setContent("");
    setColor("")
  }

  return (
    <div className="App">
      <div className="header-container">
        <header className="header">
          <h1>Doozy</h1>
        </header>
        <div className="search-container">
          <input type='text' placeholder='Search Note' className="search-input" value={searchQuery} onChange={handleSearchInputChange}></input>
        </div>
        <button className="floating-button" onClick={() => setShowModal(true)}>+</button>
      </div>
      <main>
        <h2>All Tasks</h2>
        <div className="task-grid">
          {filteredNotes.map((note) => (
            <div key={note._id} className="task-card" style={{ backgroundColor: note.color }} onClick={() => handleTaskClick(note._id)}>
              <h3>{note.title}</h3>
              <p>{note.content}</p>
            </div>
          ))}
        </div>
      </main>
      {/* Modal */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <form onSubmit={noteId ? handleUpdate : handleNewTaskSubmit}>
              <label>
                <input type="text" name="title" placeholder='title' value={title} onChange={(e) => setTitle(e.target.value)} />
              </label>
              <label>
                <textarea placeholder="Type note" name="content" value={content} onChange={(e) => setContent(e.target.value)} />
              </label>
              <label>
                <select value={color} onChange={handleColorChange}>
                  <option value="#EDF5E1">Default</option>
                  <option value="#66abfa">Blue</option>
                  <option value="#E8A87C">Brown</option>
                  <option value="#C38D9E">Pink</option>
                  <option value="#8EE4A4">Green</option>
                  <option value="#D79922">Yellow</option>
                </select>
              </label>
              <button type="submit">{noteId ? "Update" : "Save"}</button>
            </form>
            <CgClose className='close-button' onClick={() => {
                setShowModal(false);
                setTitle("");
                setContent("");
                setNoteId(null)
                setColor("")
              }} />
            {noteId && (
              <AiFillDelete className='delete-button' onClick={handleDelete} />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;