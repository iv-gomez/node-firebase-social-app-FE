import React, { useState } from "react";
import axios from "axios";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import AppIcon from "../images/icon.png";
import { useForm } from "../hooks/useForm";
import { Link } from "react-router-dom";

// MUI Imports
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = (theme) => ({
  ...theme.customTheme,
});

const Signup = ({ history, classes }) => {
  const [formValues, handleInputChange] = useForm({
    email: "",
    password: "",
    confirmPassword: "",
    handle: "",
  });
  const { email, password, confirmPassword, handle } = formValues;
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    axios
      .post("/signup", formValues)
      .then((res) => {
        localStorage.setItem("FBIdToken", `Bearer ${res.data.token}`);
        setLoading(false);
        history.push("/");
      })
      .catch((err) => {
        console.log(err.response.data);
        setErrors(err.response.data);
        setLoading(false);
      });
  };

  return (
    <Grid container className={classes.form}>
      <Grid item sm />
      <Grid item sm>
        <img src={AppIcon} alt="monkey" className={classes.image} />
        <Typography variant="h2" className={classes.pageTitle}>
          Signup
        </Typography>
        <form noValidate onSubmit={handleSubmit}>
          <TextField
            id="email"
            name="email"
            type="email"
            label="Email"
            className={classes.TextField}
            helperText={errors?.email}
            error={errors?.email ? true : false}
            value={email}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            id="password"
            name="password"
            type="password"
            label="Password"
            className={classes.TextField}
            helperText={errors?.password}
            error={errors?.password ? true : false}
            value={password}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            label="Confirm Password"
            className={classes.TextField}
            helperText={errors?.confirmPassword}
            error={errors?.confirmPassword ? true : false}
            value={confirmPassword}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            id="handle"
            name="handle"
            type="text"
            label="Handle"
            className={classes.TextField}
            helperText={errors?.handle}
            error={errors?.handle ? true : false}
            value={handle}
            onChange={handleInputChange}
            fullWidth
          />
          {errors?.general && (
            <Typography variant="body2" className={classes.customError}>
              {errors?.general}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
            disabled={loading}
          >
            Signup
            {loading && <CircularProgress className={classes.progress} size={30} />}
          </Button>
          <br />
          <small>
            Already have an account ? login <Link to="/login">here</Link>
          </small>
        </form>
      </Grid>
      <Grid item sm />
    </Grid>
  );
};

Signup.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Signup);
