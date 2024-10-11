
import './App.css';
import Navbar from './component/Navbar';
import TextForm from './component/TextForm';


function App() {
  return (
    <>
      <Navbar title ="TextUtlits" Home ="homepage"/>     {/* affilated by Navbar props  feature */}
      <div className="container">
        <TextForm heading = "Enter a text for Analyzing Below" />
        </div>
    </>
  );
}
export default App; 
       
