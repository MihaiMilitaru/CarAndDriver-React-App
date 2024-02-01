import React from "react"
import Signup from "./Signup"
import { Container } from "react-bootstrap"
import { AuthProvider } from "../contexts/AuthContext"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Dashboard from "./Dashboard"
import Login from "./Login"
import PrivateRoute from "./PrivateRoute"
import ForgotPassword from "./ForgotPassword"
import Home from "./Home"
import Profile from "./Profile"
import EditVehicle from "./EditVehicle";
import NewVehicle from "./NewVehicle";
import ProfileDetails from "./ProfileDetails";
import NewVehicleDetails from "./NewVehicleDetails";
import EditVehicleDetails from "./EditVehicleDetails";

function App() {
  return (
      <div>
        <Router>
          <AuthProvider>
            <Switch>
              <PrivateRoute exact path="/" component={Home} />
              <PrivateRoute path="/profile" component={ProfileDetails} />
              <PrivateRoute path="/edit-vehicle/:id" component={EditVehicleDetails} />
              <PrivateRoute path="/new-vehicle" component={NewVehicleDetails} />
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
              <Route path="/forgot-password" component={ForgotPassword} />
            </Switch>
          </AuthProvider>
        </Router>
      </div>)
}

export default App
