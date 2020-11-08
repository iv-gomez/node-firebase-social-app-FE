import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import MyButton from "../util/MyButton";
import DeleteScream from "./DeleteScream";
import ScreamDialog from "./ScreamDialog";
// Redux
import { connect } from "react-redux";
import { likeScream, unLikeScream } from "../redux/actions/dataActions";
//MUI imports
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
// Icons
import ChatIcon from "@material-ui/icons/Chat";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";

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
  const { classes, scream, likeScream, unLikeScream, user } = props;
  const {
    likes,
    authenticated,
    credentials: { handle },
  } = user;
  const { body, createdAt, userImage, userHandle, screamId, likeCount, commentCount } = scream;
  dayjs.extend(relativeTime);

  const likedScream = () => {
    if (likes.length > 0 && likes.find((like) => like.screamId === scream.screamId)) {
      return true;
    } else {
      return false;
    }
  };

  const handleLikeScream = () => {
    likeScream(scream.screamId);
  };

  const handleUnLikeScream = () => {
    unLikeScream(scream.screamId);
  };

  const likeButton = !authenticated ? (
    <MyButton tip="Like">
      <Link to="/login">
        <FavoriteBorder color="primary" />
      </Link>
    </MyButton>
  ) : likedScream() ? (
    <MyButton tip="Undo like" onClick={handleUnLikeScream}>
      <FavoriteIcon color="primary" />
    </MyButton>
  ) : (
    <MyButton tip="Like" onClick={handleLikeScream}>
      <FavoriteBorder color="primary" />
    </MyButton>
  );

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
        {likeButton}
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
  likeScream: PropTypes.func.isRequired,
  unLikeScream: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  scream: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapActionsToProps = {
  likeScream,
  unLikeScream,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Scream));
