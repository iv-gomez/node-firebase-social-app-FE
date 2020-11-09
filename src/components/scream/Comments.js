import React, { Fragment } from "react";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
//REDUX
import { connect } from "react-redux";
import { getScream } from "../../redux/actions/dataActions";
// MUI
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const styles = (theme) => ({
  ...theme.customTheme,
  commentImage: {
    maxWidth: "100%",
    height: 100,
    objectFit: "cover",
    borderRadius: "50%",
  },
  commentData: {
    marginLeft: 20,
  },
});

const Comments = (props) => {
  const { comments, classes } = props;

  return (
    <Grid container>
      {comments &&
        comments.map((comment, index) => {
          const { body, createdAt, userImage, userHandle } = comment;
          return (
            <Fragment key={createdAt}>
              <Grid item sm={12}>
                <Grid container>
                  <Grid item sm={2}>
                    <img src={userImage} alt="comment" className={classes.commentImage} />
                  </Grid>
                  <Grid item sm={9}>
                    <div className={classes.commentData}>
                      <Typography
                        variant="h5"
                        component={Link}
                        to={`/users/${userHandle}`}
                        color="primary"
                      >
                        {userHandle}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {dayjs(createdAt).format("h:mm a, MMMM DD YYYY")}
                      </Typography>
                      <hr className={classes.invisibleSeparator} />
                      <Typography variant="body1">{body}</Typography>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
              {index !== comments.length - 1 && <hr className={classes.visibleSeparator} />}
            </Fragment>
          );
        })}
    </Grid>
  );
};

Comments.propTypes = {
  comments: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapActionsToProps = {
  //
};

const mapStateToProps = (state) => ({
  //
});

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Comments));
