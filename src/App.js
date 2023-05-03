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
  const [color, setColor] = useState("#1b1b1b");
  const modalRef = useRef(null);
  
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
          <button className="floating-button" onClick={() => setShowModal(true)}>+</button>
        </div>
      <main>
        <h2>All Tasks</h2>
        <div className="task-grid">
          {notes.map((note) => (
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
                  <option value="#1b1b1b">Black</option>
                  <option value="#ff1744">Red</option>
                  <option value="#2979ff">Blue</option>
                  <option value="#00e676">Green</option>
                  <option value="#ffeb3b">Yellow</option>
                  <option value="#9c27b0">Purple</option>
                </select>
              </label>
              <button type="submit">{noteId ? "Update" : "Submit"}</button>
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