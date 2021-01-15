import React from "react";
import { Switch, Route } from "react-router-dom";
import NavMain from "./components/NavMain";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";
import Events from "./components/Views/Events";
import OneEvent from "./components/Views/OneEvent";
import FormCreateEvent from "./components/Forms/FormCreateEvent";
import FormUpdateEvent from "./components/Forms/FormUpdateEvent";
import CreatedEvents from "./components/Views/CreatedEvents";

function App() {
  return (
    <div className="App">
      <NavMain />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/events" component={Events} />
        <Route exact path="/events/create" component={FormCreateEvent} />
        <Route exact path="/events/:id" component={OneEvent} />
        <Route exact path="/myprofile" component={Profile} />
        <Route exact path="/myprofile/created-events" component={CreatedEvents} />
        <Route exact path="/update/:id" component={FormUpdateEvent} />

        
        <ProtectedRoute exact path="/profile" component={Profile} />
      </Switch>
    </div>
  );
}

export default App;
