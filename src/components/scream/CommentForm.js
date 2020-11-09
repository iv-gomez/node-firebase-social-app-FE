import React from "react";
import PropTypes from "prop-types";
import { useForm } from "../../hooks/useForm";
//REDUX
import { connect } from "react-redux";
import { submitComment } from "../../redux/actions/dataActions";
// MUI
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

const styles = (theme) => ({
  ...theme.customTheme,
});

const CommentForm = (props) => {
  const { submitComment, classes, authenticated, UI, screamId } = props;

  const { errors } = UI;

  const [formValues, handleInputChange, reset] = useForm({ body: "" });

  const { body } = formValues;

  const handleSubmit = (e) => {
    e.preventDefault();
    submitComment(screamId, formValues);
    reset();
  };

  const commentFormMarkup = authenticated ? (
    <Grid item sm={12} style={{ textAlign: "center" }}>
      <form onSubmit={handleSubmit}>
        <TextField
          name="body"
          type="text"
          label="Comment on scream"
          error={errors?.comment ? true : false}
          helperText={errors?.comment}
          value={body}
          onChange={handleInputChange}
          fullWidth
          className={classes.TextField}
        />
        <Button type="submit" variant="contained" color="primary" className={classes.button}>
          Submit
        </Button>
      </form>
      <hr className={classes.visibleSeparator} />
    </Grid>
  ) : null;

  return commentFormMarkup;
};

CommentForm.propTypes = {
  submitComment: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
  classes: PropTypes.string.isRequired,
  screamId: PropTypes.object.isRequired,
  authenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
  authenticated: state.user.authenticated,
});

export default connect(mapStateToProps, { submitComment })(withStyles(styles)(CommentForm));
