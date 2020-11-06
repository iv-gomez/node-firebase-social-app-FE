import React from "react";
//MUI stuff
import AppBar from "@material-ui/core/AppBar";
import ToolBar from "@material-ui/core/ToolBar";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

export const NavBar = () => {
  return (
    <AppBar>
      <ToolBar className="nav-container">
        <Button color="inherit" component={Link} to="/login">
          Login
        </Button>
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        <Button color="inherit" component={Link} to="/signup">
          Signup
        </Button>
      </ToolBar>
    </AppBar>
  );
};
