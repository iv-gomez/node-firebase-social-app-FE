import React, { useState } from "react";
import PropTypes from "prop-types";
import { useForm } from "../hooks/useForm";
import MyButton from "../util/MyButton";
// Redux
import { connect } from "react-redux";
import { editUserDetails } from "../redux/actions/userActions";
// MUI
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
// Icons
import EditIcon from "@material-ui/icons/Edit";

const styles = (theme) => ({
  ...theme.customTheme,
  button: {
    float: "right",
  },
});

const EditDetails = (props) => {
  const { editUserDetails, credentials, classes } = props;
  const [formValues, handleInputChange] = useForm(credentials);
  const { bio, website, location } = formValues;
  const [open, setOpen] = useState(false);

  const handleOpenAndClose = () => {
    setOpen(!open);
  };

  const handleSubmit = () => {
    editUserDetails(formValues);
    setOpen(false);
  };

  return (
    <>
      <MyButton tip="Edit details" onClick={handleOpenAndClose} btnClassName={classes.button}>
        <EditIcon color="primary" />
      </MyButton>
      <Dialog open={open} onClose={handleOpenAndClose} fullWidth maxWidth="sm">
        <DialogTitle>Edit your details</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              name="bio"
              type="text"
              label="Bio"
              multiline
              rows="3"
              placeholder="A short bio about yourself"
              className={classes.TextField}
              value={bio}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              name="website"
              type="text"
              label="Website"
              placeholder="Your personal/professional website"
              className={classes.TextField}
              value={website}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              name="location"
              type="text"
              label="Location"
              placeholder="Where you live"
              className={classes.TextField}
              value={location}
              onChange={handleInputChange}
              fullWidth
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleOpenAndClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

EditDetails.propTypes = {
  classes: PropTypes.object.isRequired,
  editUserDetails: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  credentials: state.user.credentials,
});

export default connect(mapStateToProps, { editUserDetails })(withStyles(styles)(EditDetails));
