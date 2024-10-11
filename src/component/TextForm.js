import React, { useState } from 'react';

export default function TextForm(props) {
  // This state will keep track of previous versions of the text for undo functionality
  const [textHistory, setTextHistory] = useState([]);
  const [text, setText] = useState("Enter a Text"); // Initial placeholder text

  const handleUpClick = () => {
    updateTextHistory();
    let newText = text.toUpperCase();
    setText(newText);
  }

  const handleLoClick = () => {
    updateTextHistory();
    let newText = text.toLowerCase();
    setText(newText);
  }

  const handleClearClick = () => {
    updateTextHistory();
    let newText = "";
    setText(newText);
  }

  const handleOnChange = (event) => {
    updateTextHistory();
    setText(event.target.value);
  }

  const handleSaveClick = () => {
    localStorage.setItem('savedText', text);
    alert('Text saved successfully!');
  };

  const handleUndoClick = () => {
    if (textHistory.length > 0) {
      const lastText = textHistory[textHistory.length - 1]; // Get the last state
      setText(lastText); // Set text to the last state
      setTextHistory(textHistory.slice(0, -1)); // Remove the last entry from history
    } else {
      alert("Nothing to undo");
    }
  };

  // Helper function to store the current text before making changes
  const updateTextHistory = () => {
    setTextHistory([...textHistory, text]);
  }

  return (
    <>
      <div className="container">
        <h1>{props.heading}</h1>
        <div className="mb-8">
          <textarea
            className="form-control" value={text} onChange={handleOnChange} id="exampleFormControlTextarea1"
            rows="9"
          ></textarea>
        </div>
        <button className="btn btn-primary mx-2 my-3" onClick={handleUpClick}>
          Convert to UpperCase
        </button>
        <button className="btn btn-primary mx-2 my-3" onClick={handleLoClick}>
          Convert to LowerCase
        </button>
        <button className="btn btn-outline-primary mx-2 my-3" onClick={handleClearClick}>
          Clear
        </button>
        <button className="btn btn-outline-primary mx-2 my-3" onClick={handleSaveClick}>
          Save
        </button>
        <button className="btn btn-primary mx-2 my-3" onClick={handleUndoClick}>
          Undo
        </button>
      </div>

      <div className="container my-3">
<h2>Your Text summary</h2>
<p> {text.split(" ").length} words and {text.length} characters </p>          { /*text.lenght show numbers use of words */}
<p> {0.008 * text.split(" ").length} Minutes Read</p>
<h2>preview</h2>
  <p>{text}</p>

</div>
    </>
  );
}
