import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import MyButton from "../../util/MyButton";
import DeleteScream from "./DeleteScream";
import ScreamDialog from "./ScreamDialog";
import LikeButton from "./LikeButton";
// Redux
import { connect } from "react-redux";
//MUI imports
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
// Icons
import ChatIcon from "@material-ui/icons/Chat";

const styles = {
  card: {
    position: "relative",
    display: "flex",
    marginBottom: 20,
  },
  image: {
    minWidth: 200,
  },
  content: {
    padding: 25,
    objectFit: "cover",
  },
};

const Scream = (props) => {
  const { classes, scream, user } = props;
  const {
    authenticated,
    credentials: { handle },
  } = user;
  const { body, createdAt, userImage, userHandle, screamId, likeCount, commentCount } = scream;
  dayjs.extend(relativeTime);

  const deleteButton =
    authenticated && userHandle === handle ? <DeleteScream screamId={screamId} /> : null;

  return (
    <Card className={classes.card}>
      <CardMedia image={userImage} title="Profile image" className={classes.image} />
      <CardContent className={classes.content}>
        <Typography variant="h5" component={Link} to={`/users/${userHandle}`} color="primary">
          {userHandle}
        </Typography>
        {deleteButton}
        <Typography variant="body2" color="textSecondary">
          {dayjs(createdAt).fromNow()}
        </Typography>
        <Typography variant="body1">{body}</Typography>
        <LikeButton screamId={screamId} />
        <span>{likeCount} Likes</span>
        <MyButton tip="comments">
          <ChatIcon color="primary" />
        </MyButton>
        <span>{commentCount} comments</span>
        <ScreamDialog screamId={screamId} userHandle={userHandle} />
      </CardContent>
    </Card>
  );
};

Scream.prototypes = {
  user: PropTypes.object.isRequired,
  scream: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(withStyles(styles)(Scream));
