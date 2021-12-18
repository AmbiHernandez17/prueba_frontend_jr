import Home from "./Paginas/Home"
import './App.css';
import Nav from "./components/Nav"
import Bienvenida from './Paginas/Bienvenida';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Perfil from "./Paginas/Perfil";

function App() {
  return (
    <div className="App">
      <Router>
        <Nav />
        <Switch>
          <Route path="/" component={Bienvenida} exact />
          <Redirect from="/home" to="/inicio" />
          <Route path="/inicio" component={Home} exact />
          <Route path="/perfil" component={Perfil} exact />
        </Switch>
      </Router>
    </div>
  );
}
export default App;
