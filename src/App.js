// import logo from './logo.svg';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './App.css';
import HomePage from './components/main/Homepage';
import AdminPage from './components/admin/Adminpage'
import Login from './components/main/Login';
import Signup from './components/main/Signup';
import PrivateRoute from './components/auth/Privateroute';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
           <Route exact path="/" component={HomePage} />
           <Route path="/login" component={ Login } />
           <Route path="/signup-page" component={ Signup } />

           <PrivateRoute  path="/admin-section" component={ AdminPage } />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
