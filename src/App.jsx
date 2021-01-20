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
import MyEvents from "./components/Views/MyEvents";
import Extras from "./components/Views/Extras";
import Messages from "./components/Views/Messages";
import Conversation from "./components/Views/Conversation";

function App() {
  return (
    <div className="App">
      {/* <NavMain /> */}
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/events" component={Events} />
        <Route exact path="/events/create" component={FormCreateEvent} />
        <Route exact path="/events/:id" component={OneEvent} />
        <Route exact path="/messages/by-event/:id" component={Messages} />
        <Route exact path="/messages/my-messages" component={Conversation} />
        <Route exact path="/messages/:id" component={Conversation} />
        {/* <Route exact path="/created" component={Profile} /> */}
        <Route exact path="/created/coming-events" component={MyEvents} />
        <Route exact path="/created/past-events" component={MyEvents} />
        <Route exact path="/update/:id" component={FormUpdateEvent} />
        <Route exact path="/more" component={Extras} />

        <ProtectedRoute exact path="/profile" component={Profile} />
      </Switch>
    </div>
  );
}

export default App;
