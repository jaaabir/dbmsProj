import { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Login } from "./components/login";
import { Signup } from "./components/signup";
import { Feeds } from "./components/feeds";
import { Profile } from "./components/profile";

function App() {
  const getLocalStorage = (key) => window.localStorage.getItem(key);
  const setLocalStroage = (key, value) =>
    window.localStorage.setItem(key, value);
  const [first, setFirst] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const sendReq = async (endpoint, data, method = "post") => {
    const baseURL = "http://localhost:5000";
    const url = `${baseURL}/${endpoint}`;
    let response;
    console.log(`Sending ${method} request`);
    if (method === "post") {
      response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).catch((error) => console.log(error));
    } else if (method === "get") {
      response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).catch((error) => console.log(error));
    } else {
      response = await fetch(url, {
        method: "UPDATE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).catch((error) => console.log(error));
    }

    return response;
  };

  const handleLoggedIn = (val) => {
    console.log(`val is : ${val}`);
    setLoggedIn(val);
  };

  useEffect(() => {
    console.log(`logged in is : ${loggedIn}`);
  }, [loggedIn]);

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Feeds
            getLocalStorage={getLocalStorage}
            sendReq={sendReq}
            loggedIn={loggedIn}
            setLoggedIn={handleLoggedIn}
            first={first}
            setFirst={setFirst}
          />
        </Route>
        <Route path="/login">
          <Login
            setLocalStroage={setLocalStroage}
            sendReq={sendReq}
            loggedIn={loggedIn}
            setLoggedIn={handleLoggedIn}
          />
        </Route>
        <Route path="/signup">
          <Signup
            setLocalStroage={setLocalStroage}
            sendReq={sendReq}
            loggedIn={loggedIn}
            setLoggedIn={handleLoggedIn}
          />
        </Route>
        <Route path="/profile">
          <Profile
            getLocalStorage={getLocalStorage}
            sendReq={sendReq}
            loggedIn={loggedIn}
            setLoggedIn={handleLoggedIn}
          />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
