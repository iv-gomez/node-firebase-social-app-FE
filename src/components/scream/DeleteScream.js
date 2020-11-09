import React, { useState } from "react";
import PropTypes from "prop-types";
import MyButton from "../../util/MyButton";
// Redux
import { connect } from "react-redux";
import { deleteScream } from "../../redux/actions/dataActions";
//MUI imports
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import withStyles from "@material-ui/core/styles/withStyles";
// Icons
import DeleteOutline from "@material-ui/icons/DeleteOutline";

const styles = (theme) => ({
  ...theme.customTheme,
  deleteButton: {
    position: "absolute",
    left: "90%",
    top: "10%",
  },
});

const DeleteScream = (props) => {
  const { deleteScream, classes, screamId } = props;
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleDeleteScream = () => {
    deleteScream(screamId);
    setOpen(false);
  };

  return (
    <>
      <MyButton tip="Delete Scream" onClick={handleOpen} btnClassName={classes.deleteButton}>
        <DeleteOutline color="secondary" />
      </MyButton>
      <Dialog open={open} onClose={handleOpen} fullWidth maxWidth="sm">
        <DialogTitle>Are you sure you want to deleted this scream ?</DialogTitle>
        <DialogActions>
          <Button onClick={handleOpen} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteScream} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

DeleteScream.propTypes = {
  deleteScream: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  screamId: PropTypes.string.isRequired,
};

export default connect(null, { deleteScream })(withStyles(styles)(DeleteScream));
