import React, { useState } from "react";
import axios from "axios";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import AppIcon from "../images/icon.png";
import { useForm } from "../hooks/useForm";

// MUI Imports
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const styles = {
  form: {
    textAlign: "center",
  },
  image: {
    margin: "20px auto 20px auto",
  },
  pageTitle: {
    margin: "10px auto 10px auto",
  },
  TextField: {
    margin: "10px auto 10px auto",
  },
  button: {
    marginTop: 20,
  },
  customError: {
    color: "red",
    fontSize: "0.8rem",
  },
};

const Login = ({ history, classes }) => {
  const [formValues, handleInputChange] = useForm({
    email: "",
    password: "",
  });
  const { email, password } = formValues;
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  console.log("errors", errors);
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("formValues", formValues);
    axios
      .post("/login", formValues)
      .then((res) => {
        console.log("res ", res.data);
        setLoading(false);
        history.push("/");
      })
      .catch((err) => {
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
          Login
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
          {errors?.general && (
            <Typography variant="body2" className={classes.customError}>
              {errors?.general}
            </Typography>
          )}
          <Button type="submit" variant="contained" color="primary" className={classes.button}>
            Login
          </Button>
        </form>
      </Grid>
      <Grid item sm />
    </Grid>
  );
};

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);
