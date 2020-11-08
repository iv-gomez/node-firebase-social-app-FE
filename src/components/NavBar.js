import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import MyButton from "../util/MyButton";
import PostScream from "./PostScream";
// Redux
import { connect } from "react-redux";
//MUI stuff
import AppBar from "@material-ui/core/AppBar";
import ToolBar from "@material-ui/core/ToolBar";
import Button from "@material-ui/core/Button";
import HomeIcon from "@material-ui/icons/Home";
import Notifications from "@material-ui/icons/Notifications";

const NavBar = (props) => {
  const { authenticated } = props;
  return (
    <AppBar>
      <ToolBar className="nav-container">
        {authenticated ? (
          <>
            <PostScream />
            <MyButton tip="Home">
              <Link to="/">
                <HomeIcon />
              </Link>
            </MyButton>
            <MyButton tip="Notifications">
              <Notifications />
            </MyButton>
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
            <Button color="inherit" component={Link} to="/signup">
              Signup
            </Button>
          </>
        )}
      </ToolBar>
    </AppBar>
  );
};

NavBar.propTypes = {
  authenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
});

export default connect(mapStateToProps)(NavBar);
