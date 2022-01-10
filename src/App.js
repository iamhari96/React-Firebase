import React from 'react'
import './App.css'
import { BrowserRouter as Router,Route,Switch } from 'react-router-dom'
import Navbar from './components/navbar/Navbar';
import Signup from './components/signup/Signup';
import { AuthProvider } from './context/AuthContext';
import Home from './components/Home/Home';
import Login from './components/login/Login';
import Profile from './components/profile/Profile';
import ProtectedPage from './components/protected/ProtectedPage';
import ProtectedRoute from './components/protectedroute/ProtectedRoute';
import ForgotPassword from './components/forgotpassword/ForgotPassword';
import ResetPassword from './components/resetpassword/ResetPassword';

const App = () => {
  return (
    <div className="App">
    <AuthProvider>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/signup" component={Signup} />
          <ProtectedRoute exact path="/login" component={Login} />
          <ProtectedRoute exact path="/profile" component={Profile} />
          <ProtectedRoute exact path="/protected" component={ProtectedPage} />
          <ProtectedRoute exact path="/forgotpassword" component={ForgotPassword} />
          <ProtectedRoute exact path="/resetpassword" component={ResetPassword} />
        </Switch>
      </Router>
    </AuthProvider>
    </div>
  );
}


export default App;
