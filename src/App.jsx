import logo from './logo.svg';
import './App.css';
import Nav from "./components/Nav"
import Bienvenida from './Paginas/Bienvenida';

function App() {
  return (
    <div className="App">
      <Nav></Nav>
      <Bienvenida></Bienvenida>
    </div>
  );
}

export default App;
