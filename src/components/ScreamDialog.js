import React, { useState } from "react";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useForm } from "../hooks/useForm";
import MyButton from "../util/MyButton";
//REDUX
import { connect } from "react-redux";
import { getScream } from "../redux/actions/dataActions";
// MUI
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
// Icons
import CloseIcon from "@material-ui/icons/Close";
import UnfoldMore from "@material-ui/icons/UnfoldMore";

const styles = (theme) => ({
  ...theme.customTheme,
  closeButton: {
    position: "absolute",
    left: "91%",
    top: "4%",
  },
  profileImage: {
    maxWidth: 200,
    height: 200,
    borderRadius: "50%",
    objectFit: "cover",
  },
  dialogContent: {
    padding: 20,
  },
  expandButton: {
    position: "absolute",
    left: "90%",
  },
});

const ScreamDialog = (props) => {
  const { getScream, scream, screamId, userHandle, classes, UI } = props;

  const { body, createdAt, userImage, likeCount, commentCount } = scream;

  const { loading } = UI;

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    getScream(screamId);
    setOpen(!open);
  };

  const dialogMarkup = loading ? (
    <CircularProgress size={200} className={classes.progressSpinner} />
  ) : (
    <Grid container spacing={2}>
      <Grid item sm={5}>
        <img src={userImage} alt="Profile" className={classes.profileImage} />
      </Grid>
      <Grid item sm={7}>
        <Typography component={Link} color="primary" variant="h5" to={`/user/${userHandle}`}>
          @{userHandle}
        </Typography>
        <hr className={classes.invisibleSeparator} />
        <Typography color="textSecondary" variant="body2">
          {dayjs(createdAt).format("h:mm a, MMMM DD YYYY")}
        </Typography>
        <hr className={classes.invisibleSeparator} />
        <Typography variant="body1">{body}</Typography>
      </Grid>
    </Grid>
  );

  return (
    <>
      <MyButton tip="Expand scream" onClick={handleOpen} tipClassName={classes.expandButton}>
        <UnfoldMore color="primary" />
      </MyButton>
      <Dialog open={open} onClose={handleOpen} fullWidth maxWidth="sm">
        <MyButton onClick={handleOpen} tip="Close" tipClassName={classes.closeButton}>
          <CloseIcon />
        </MyButton>
        <DialogContent className={classes.dialogContent}>{dialogMarkup}</DialogContent>
      </Dialog>
    </>
  );
};

const mapStateToProps = (state) => ({
  UI: state.UI,
  scream: state.data.scream,
});

const mapActionsToProps = {
  getScream,
};

ScreamDialog.propTypes = {
  getScream: PropTypes.func.isRequired,
  screamId: PropTypes.string.isRequired,
  userHandle: PropTypes.string.isRequired,
  scream: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(ScreamDialog));
