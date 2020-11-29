import CssBaseLine from '@material-ui/core/CssBaseline';
import Dashboard from './components/layout/Dashboard';
import Login from './components/Login';
import Register from './components/Register';
import { BrowserRouter as Router, Route} from "react-router-dom";
import ProtectedRoute from './components/ProtectedRoute';

const  App = () => {
  return (
    <>
      <CssBaseLine />
      <Router>
        <ProtectedRoute path="/" component={Dashboard} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
      </Router>
    </>
  );
}

export default App;
