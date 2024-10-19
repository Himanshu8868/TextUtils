// Import necessary files and components
import './App.css'; 
import Alert from './component/Alert'; 
import Navbar from './component/Navbar'; 
import About from './component/About'; 
import TextForm from './component/TextForm';  
import React, { useState } from 'react'; 
import { HashRouter as Router, Route, Routes } from 'react-router-dom'; 

function App() {
  const [Mode, setMode] = useState('light');
  const [color, setColor] = useState('light');
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({ msg: message, type: type });
    setTimeout(() => setAlert(null), 2000);
  };

  const colorMode = () => {
    if (color === 'light') {
      setColor('black');
      document.body.style.backgroundColor = 'green';
      showAlert('Green color mode activated', 'success');
    } else {
      setColor('light');
      document.body.style.backgroundColor = 'white';
      showAlert('Light color mode activated', 'success');
    }
  };

  const toggleMode = () => {
    if (Mode === 'light') {
      setMode('dark');
      document.body.style.backgroundColor = '#042745';
      showAlert('Dark mode has been activated', 'success');
    } else {
      setMode('light');
      document.body.style.backgroundColor = 'white';
      showAlert('Light mode activated', 'success');
    }
  };

  return (
    <>
      <Router>
        <Navbar
          title="TextUtils"
          Home="Home"
          aboutText="About"
          Mode={Mode}
          toggleMode={toggleMode}
          color={color}
          colorMode={colorMode}
        />
        <Alert alert={alert} />
        <div className="container my-3">
          <Routes>
            <Route exact path="/" element={<TextForm showAlert={showAlert} heading="Try it - 😃 Enter a Text to convert uppercase to lowercase | lowercase to Uppercase and also use other features 😉" Mode={Mode} />} />
            <Route exact path="/about" element={<About Mode={Mode} />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
