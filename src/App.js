import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwtDecode from "jwt-decode";
import themeFile from "./util/theme";
// Redux
import { Provider } from "react-redux";
import store from "./redux/store";
// Components
import { NavBar } from "./components/NavBar";
import AuthRoute from "./util/AuthRoute";
// Pages
import { Home } from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
// MUI Imports
import "./App.css";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

const theme = createMuiTheme(themeFile);
let authenticated;
const token = localStorage.FBIdToken;

if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    window.location.href = "/login";
    authenticated = false;
  } else {
    authenticated = true;
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
                <AuthRoute exact path="/login" component={Login} authenticated={authenticated} />
                <AuthRoute exact path="/signup" component={Signup} authenticated={authenticated} />
              </Switch>
            </div>
          </Router>
        </div>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
