// Import necessary files and components
import './App.css'; // Custom CSS file
import Alert from './component/Alert'; // Alert component for displaying notifications
import Navbar from './component/Navbar'; // Navbar component for navigation

import TextForm from './component/TextForm'; // TextForm component for text manipulation
import React, { useState } from 'react'; // Import React and useState hook for state management

function App() {
  // State to manage the dark/light mode for the app
  const [Mode, setMode] = useState('light'); // 'light' by default

  // State to manage the green mode (color state)
  const [color, setColor] = useState('light'); // 'light' by default

  // State to manage alert notifications
  const [alert, setAlert] = useState(null);

  // Function to display alert messages with auto-dismiss
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    // Alert will disappear after 2 seconds
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  };

  const showcolor = (message, type) => {
    setColor({
      msg: message,
      type: type,
    });
    // Alert will disappear after 2 seconds
    setTimeout(() => {
      setColor(null);
    }, 2000);
  };

  // Function to toggle between green mode and normal mode
  const colorMode = () => {
    if (color === 'light') {
      setColor('black'); // Set color mode to 'gray'
      document.body.style.backgroundColor = 'green'; // Apply green background
    showcolor('green color')
    } else {
      setColor('light'); // Reset to 'light'
      document.body.style.backgroundColor = 'white'; // Apply white background
    }
  };

  // Function to toggle between light mode and dark mode
  const toggleMode = () => {
    if (Mode === 'light') {
      setMode('dark'); // Switch to dark mode
      document.body.style.backgroundColor = '#042745'; // Apply dark background
      showAlert('Dark mode has been activated', 'success');
      document.title = ' Home -dark mode '
    } else {
      setMode('light'); // Switch back to light mode
      document.body.style.backgroundColor = 'white'; // Apply white background
      showAlert('Light mode activated', 'success');
    document.title = 'Homepage'
    }
  };

  return (
    <>
      {/* Navbar component with props for title, mode, and toggling modes */}
      <Navbar
        title="TextUtils"
        Home="HomePage"
        Mode={Mode}
        toggleMode={toggleMode}
        color={color}
        colorMode={colorMode}
      />

      {/* Alert component to display notifications */}
      <Alert alert={alert} />

      {/* Main container for the TextForm component */}
      <div className="container">
        <TextForm
          showAlert={showAlert}
          heading="Enter a text for Analyzing Below"
          Mode={Mode}
        />
      </div>

      {/* Optional About section (commented out) */}
      <div className="container">
        {/* <About /> */}
      </div>
    </>
  );
}

export default App;
