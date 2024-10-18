// Import necessary files and components
import './App.css'; // Custom CSS file
import Alert from './component/Alert'; // Alert component for displaying notifications
import Navbar from './component/Navbar'; // Navbar component for navigation
import About from './component/About'; 
import TextForm from './component/TextForm'; // TextForm component for text manipulation
import React, { useState } from 'react'; // Import React and useState hook for state management
import { BrowserRouter as Router, Routes, Route , } from 'react-router-dom'; // Updated imports for react-router-dom v6

function App() {
  const [Mode, setMode] = useState('light'); // State for light/dark mode
  const [color, setColor] = useState('light'); // State for green mode
  const [alert, setAlert] = useState(null); // State to manage alert notifications

  // Function to display alert messages with auto-dismiss
  const showAlert = (message, type) => {
    setAlert({ msg: message, type: type });
    setTimeout(() => setAlert(null), 2000); // Dismiss alert after 2 seconds
  };

  // Function to toggle green mode
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

  // Function to toggle dark mode
  const toggleMode = () => {
    if (Mode === 'light') {
      setMode('dark');
      document.body.style.backgroundColor = '#042745';
      showAlert('Dark mode has been activated', 'success');
      document.title = 'Home - Dark Mode';
    } else {
      setMode('light');
      document.body.style.backgroundColor = 'white';
      showAlert('Light mode activated', 'success');
      document.title = 'Homepage';
    }
  };

  return (
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
          <Route path="/about" element={<About />} />
          <Route path="/" element={<TextForm showAlert={showAlert} heading="Enter a text for Analyzing Below" Mode={Mode} />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
