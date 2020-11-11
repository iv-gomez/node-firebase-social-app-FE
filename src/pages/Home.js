import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Scream from "../components/scream/Scream";
import Profile from "../components/profile/Profile";
// Redux
import { connect } from "react-redux";
// MUI Imports
import Grid from "@material-ui/core/Grid";
import { getScreams } from "../redux/actions/dataActions";
import ScreamSkeleton from "../util/ScreamSkeleton";

const Home = (props) => {
  const {
    getScreams,
    data: { screams, loading },
  } = props;
  useEffect(() => {
    getScreams();
  }, [getScreams]);

  return (
    <Grid container spacing={2}>
      <Grid item sm={8} xs={12}>
        {(!loading &&
          screams.map((scream) => <Scream key={scream.screamId} scream={scream} />)) || (
          <ScreamSkeleton />
        )}
      </Grid>
      <Grid item sm={4} xs={12}>
        <Profile />
      </Grid>
    </Grid>
  );
};

Home.propTypes = {
  getScreams: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

const mapActionsToProps = {
  getScreams,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, mapActionsToProps)(Home);
