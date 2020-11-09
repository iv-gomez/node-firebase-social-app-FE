import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import MyButton from "../../util/MyButton";
// Redux
import { connect } from "react-redux";
import { likeScream, unLikeScream } from "../../redux/actions/dataActions";
// Icons
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";

const LikeButton = (props) => {
  const { likeScream, unLikeScream, user, screamId } = props;

  const { authenticated, likes } = user;

  const likedScream = () => {
    if (likes.length > 0 && likes.find((like) => like.screamId === screamId)) {
      return true;
    } else {
      return false;
    }
  };

  const handleLikeScream = () => {
    likeScream(screamId);
  };

  const handleUnLikeScream = () => {
    unLikeScream(screamId);
  };

  const likeButton = !authenticated ? (
    <Link to="/login">
      <MyButton tip="Like">
        <FavoriteBorder color="primary" />
      </MyButton>
    </Link>
  ) : likedScream() ? (
    <MyButton tip="Undo like" onClick={handleUnLikeScream}>
      <FavoriteIcon color="primary" />
    </MyButton>
  ) : (
    <MyButton tip="Like" onClick={handleLikeScream}>
      <FavoriteBorder color="primary" />
    </MyButton>
  );

  return likeButton;
};

LikeButton.propTypes = {
  user: PropTypes.object.isRequired,
  screamId: PropTypes.object.isRequired,
  likeScream: PropTypes.func.isRequired,
  unLikeScream: PropTypes.func.isRequired,
};

const mapActionsToProps = {
  likeScream,
  unLikeScream,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, mapActionsToProps)(LikeButton);
