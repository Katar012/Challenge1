import { Redirect, Route, Switch } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import './tailwind.css';

const App: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/home">
        <Home />
      </Route>
      <Route exact path="/">
        <Redirect to="/home" />
      </Route>
    </Switch>
  </BrowserRouter>
);

export default App;
