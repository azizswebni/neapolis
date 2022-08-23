import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Addevent from "./pages/Addevent";
import EventRegistration from "./pages/EventRegistration";
function App() {
  const [auth, setAuth] = useState();
  useEffect(() => {
    if (localStorage.getItem("Token")) {
      setAuth(true);
    } else {
      setAuth(false);
    }
  }, [auth]);
  return (
    <BrowserRouter>
      <Switch>
        {auth ? (
          <>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/addevent" component={Addevent} />
          </>
        ) : (
          <>
            <Route exact path="/" component={Home} />
            <Route exact path="/h/:id" component={EventRegistration} />
            <Route exact path="/SignIn" component={SignIn} />
            <Route exact path="/SignUp" component={SignUp} />
           
          </>
        )}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
