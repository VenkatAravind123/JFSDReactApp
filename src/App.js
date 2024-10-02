// import logo from './logo.svg';
// import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import MainNavBar from "./main/MainNavBar";

function App() {
  return (
    <div className="App">
      <Router>
      <MainNavBar/>
      <footer style={{ textAlign:"center", fontWeight:"bold" ,paddingBottom:"10px"}}>
            <p>&copy; {new Date().getFullYear()} Jana SevaAP All Rights Reserved</p>
    </footer>
      </Router>
    </div>
  );
}

export default App;
