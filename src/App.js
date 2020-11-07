import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwtDecode from "jwt-decode";
// Redux
import { Provider } from "react-redux";
import axios from "axios";
import store from "./redux/store";
import { SET_AUTHENTICATED } from "./redux/types";
import { logoutUser, getUserData } from "./redux/actions/userActions";
// Components
import { NavBar } from "./components/NavBar";
import AuthRoute from "./util/AuthRoute";
// Pages
import { Home } from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
// MUI Imports
import "./App.css";
import themeFile from "./util/theme";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

const theme = createMuiTheme(themeFile);
const token = localStorage.FBIdToken;

if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    window.location.href = "/login";
    store.dispatch(logoutUser());
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common["Authorization"] = token;
    store.dispatch(getUserData());
  }
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <div className="App">
          <Router>
            <NavBar />
            <div className="container">
              <Switch>
                <Route exact path="/" component={Home} />
                <AuthRoute exact path="/login" component={Login} />
                <AuthRoute exact path="/signup" component={Signup} />
              </Switch>
            </div>
          </Router>
        </div>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
