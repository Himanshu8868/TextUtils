// import { clear } from '@testing-library/user-event/dist/clear';
import React, { useState } from 'react';

export default function TextForm(props) {
  // This state will keep track of previous versions of the text for undo functionality
  const [textHistory, setTextHistory] = useState([]);
  const [text, setText] = useState(""); // Initial placeholder text

  const handleUpClick = () => {
     updateTextHistory()  
      let newText = text.toUpperCase()
      setText(newText);
      props.showAlert("Convert to uppercase ", "success")
     }
    
  

  const handleLoClick = () => {
    updateTextHistory();
    let newText = text.toLowerCase();
    setText(newText);
    props.showAlert("Convert to lowercase ", "success")
  }

  const handleClearClick = () => {
    updateTextHistory();
    let newText = "";
    setText(newText);
    props.showAlert("text cleared", "success")
  }

  const handleOnChange = (event) => {
    updateTextHistory();
    setText(event.target.value);
    // props.showAlert("color ", "success")   // init of handlebuton mode color
  }

  const handleSaveClick = () => {
    localStorage.setItem('savedText', text);
    props.showAlert('Text saved successfully!',"success");
  };

  const handleExtraSpaces = () => {
     // New function to remove extra spaces
    updateTextHistory();
    let newText = text.replace(/\s+/g, ' ').trim(); // Remove extra spaces
    setText(newText);
    props.showAlert("Cleared Extra Space ", "success")
  };
  
  
  const handleUndoClick = () => {
    if (textHistory.length > 0) {
      const lastText = textHistory[textHistory.length - 1]; // Get the last state
      setText(lastText); // Set text to the last state
      setTextHistory(textHistory.slice(0, -1)); // Remove the last entry from history
    } else {
      props.showAlert("Nothing to Undo" ,"warning");
    }
  };

  // Helper function to store the current text before making changes
  const updateTextHistory = () => {
    setTextHistory([...textHistory, text]);
  }

  const handleCopyClick = () => {
     var text = document.getElementById("myBox")
     text.select();
     navigator.clipboard.writeText(text.value);
     document.getSelection().removeAllRanges();
     props.showAlert("text Copy ", "success");
  };

  

    const handlepasteClick = async () => {
      try {
        const clipboardText = await navigator.clipboard.readText(); // Read from clipboard
        setText(clipboardText); // Set the clipboard content to the textarea
        props.showAlert('Text pasted successfully!' , 'success');
      } catch (error) {
        console.error('Failed to paste: ', error);
        props.showAlert('Clipboard access denied or not supported.' , "warning");
      }
    };
    

  return (
    <>
      <div className="container" style={{ color:  props.Mode === 'dark'?'white': 'black'}}>
        <h1>{props.heading}</h1>
        <div className="mb-8">
          <textarea
            className="form-control" value={text} onChange={handleOnChange} style={{ cursor:'pointer' , backgroundColor: props.Mode === 'dark'?'gray': 'white' ,color:  props.Mode === 'dark'?'white': 'black'}}  id="myBox"
            rows="9">
          </textarea>
          </div>
            <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleUpClick}>Convert to Uppercase</button>
            <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleLoClick}>Convert to Lowercase</button>
            <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleClearClick}>Clear Text</button>
            <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleCopyClick}>Copy Text</button>
            <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleExtraSpaces}>Remove Extra Spaces</button>
            <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={ handleSaveClick}>Save</button>
            <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleUndoClick}>Undo</button>
            <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={ handlepasteClick }>Paste</button>
        </div>

      <div className="container my-3" style={{color:  props.Mode === 'dark'?'white': 'black'}}>
<h2>Your Text summary</h2>
<p> {text.split(" ").filter((element)=>{return element.length!==0}).length} words and {text.split(" ").filter((element)=>{return element.length!==0}).length} characters </p>          { /*text.lenght show numbers use of words */}
<p> {0.008 * text.split(" ").filter((element) => {return element.length!==0}).length} Minutes Read</p>
<h2>preview</h2> 
  <p>{text.split(" ").filter((element) => {return element.length !== 0}).length>0?text:"Nothing to Preview🙄"}</p>

</div>
    </>
  );
}
 