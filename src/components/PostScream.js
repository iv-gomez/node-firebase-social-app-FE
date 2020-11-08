import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useForm } from "../hooks/useForm";
import MyButton from "../util/MyButton";
// Redux
import { connect } from "react-redux";
import { postScream } from "../redux/actions/dataActions";
// MUI
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";
// Icons
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import CloseIcon from "@material-ui/icons/Close";

const styles = (theme) => ({
  ...theme.customTheme,
  submitButton: {
    position: "relative",
  },
  progressSpinner: {
    position: "absolute",
  },
  closeButton: {
    position: "absolute",
    left: "90%",
    top: "10%",
  },
});

const PostScream = (props) => {
  const { postScream, UI, classes } = props;
  const { loading, errors } = UI;
  const [open, setOpen] = useState(false);
  const [formErrors, setFormErrors] = useState(errors);
  const [formValues, handleInputChange, reset] = useForm({
    body: "",
  });

  const { body } = formValues;
  const handleOpen = () => {
    setFormErrors({});
    setOpen(!open);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postScream(formValues);
    reset();
    if (!formErrors && !loading) {
      setOpen(false);
    } else {
      setFormErrors(errors);
    }
  };

  useEffect(() => {
    setFormErrors(errors);
    if (!errors) {
      setOpen(false);
    }
  }, [errors]);

  return (
    <>
      <MyButton onClick={handleOpen} tip="Post a Scream">
        <AddIcon />
      </MyButton>
      <Dialog open={open} onClose={handleOpen} fullWidth maxWidth="sm">
        <MyButton onClick={handleOpen} tip="Close" tipClassName={classes.closeButton}>
          <CloseIcon />
        </MyButton>
        <DialogTitle>Post a new scream</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              name="body"
              type="text"
              label="Scream!"
              multiline
              rows="3"
              placeholder="Scream at your fellow apes"
              error={formErrors?.body ? true : false}
              helperText={formErrors?.body}
              className={classes.TextField}
              value={body}
              onChange={handleInputChange}
              fullWidth
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submitButton}
              disabled={loading}
            >
              submit
              {loading && <CircularProgress size={30} className={classes.progressSpinner} />}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

PostScream.propTypes = {
  postScream: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
});

export default connect(mapStateToProps, { postScream })(withStyles(styles)(PostScream));
