import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import LikeButton from "./LikeButton";
import Comments from "./Comments";
import CommentForm from "./CommentForm";
import MyButton from "../../util/MyButton";
//REDUX
import { connect } from "react-redux";
import { getScream, clearErrors } from "../../redux/actions/dataActions";
// MUI
import withStyles from "@material-ui/core/styles/withStyles";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
// Icons
import CloseIcon from "@material-ui/icons/Close";
import UnfoldMore from "@material-ui/icons/UnfoldMore";
import ChatIcon from "@material-ui/icons/Chat";

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
  spinnerDiv: {
    textAlign: "center",
    marginTop: 50,
    marginBottom: 50,
  },
});

const ScreamDialog = (props) => {
  const { getScream, clearErrors, scream, screamId, userHandle, classes, UI, openDialog } = props;

  const { body, createdAt, userImage, likeCount, commentCount, comments } = scream;

  const { loading } = UI;

  const [open, setOpen] = useState(false);

  const [path, setPath] = useState("");

  const handleOpen = () => {
    const newPath = `/users/${userHandle}/scream/${screamId}`;
    const oldPath = window.location.pathname;
    setPath(oldPath);
    if (oldPath === newPath) setPath(`/users/${userHandle}`);
    window.history.pushState(null, null, newPath);
    getScream(screamId);
    setOpen(true);
  };

  const handleClose = () => {
    window.history.pushState(null, null, path);
    setOpen(false);
    clearErrors();
  };

  useEffect(() => {
    if (openDialog) {
      handleOpen();
    }
  }, []);

  const dialogMarkup = loading ? (
    <div className={classes.spinnerDiv}>
      <CircularProgress size={200} className={classes.progressSpinner} thickness={2} />
    </div>
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
        <LikeButton screamId={screamId} />
        <span>{likeCount} likes</span>
        <MyButton tip="comments">
          <ChatIcon color="primary" />
        </MyButton>
        <span>{commentCount} comments</span>
      </Grid>
      <hr className={classes.visibleSeparator} />
      <CommentForm screamId={screamId} />
      <Comments comments={comments} />
    </Grid>
  );

  return (
    <>
      <MyButton tip="Expand scream" onClick={handleOpen} tipClassName={classes.expandButton}>
        <UnfoldMore color="primary" />
      </MyButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <MyButton onClick={handleClose} tip="Close" tipClassName={classes.closeButton}>
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
  clearErrors,
};

ScreamDialog.propTypes = {
  getScream: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  screamId: PropTypes.string.isRequired,
  userHandle: PropTypes.string.isRequired,
  scream: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(ScreamDialog));
