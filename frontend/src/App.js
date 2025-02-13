import logo from './logo.svg';
import './App.css';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Navbar from "./Navbar";
import Jobs from "./Jobs";
function App() {
  return (
    <div>

  <Navbar />
  <Jobs />

    </div>
    
  );
}

export default App;
