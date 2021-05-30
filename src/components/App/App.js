import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Login from '../Login';
import SignUpM from '../SignUpM';
import DashBoardS from '../DashBoardS'
import DashBoardM from '../DashBoardM'
import './App.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/login" component={Login} />
        <Route path="/signupm" component={SignUpM} />
        <Route path="/dashboards" component={DashBoardS} />
        <Route path="/dashboardm" component={DashBoardM} />
      </Switch>
    </Router>
  );
}

export default App;
