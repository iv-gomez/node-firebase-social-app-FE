import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { apiUrl } from "../const/api";
import Scream from "../components/scream/Scream";
import StaticProfile from "../components/profile/StaticProfile";
import ScreamSkeleton from "../util/ScreamSkeleton";
// Redux
import { connect } from "react-redux";
import { getUserData } from "../redux/actions/dataActions";
// MUI
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";

const styles = (theme) => ({
  ...theme.customTheme,
});

const User = (props) => {
  const { match, data, getUserData } = props;

  const { screams, loading } = data;

  const [profile, setProfile] = useState({});

  const [screamIdParam, setScreamIdParam] = useState(null);

  useEffect(() => {
    const handle = match.params.handle;
    const screamId = match.params.screamId;

    if (screamId) {
      setScreamIdParam(screamId);
    }
    getUserData(handle);
    axios
      .get(`${apiUrl}/user/${handle}`)
      .then((res) => {
        setProfile(res.data.user);
      })
      .catch((err) => console.log(err));
  }, []);

  const screamsMarkup = loading ? (
    <ScreamSkeleton />
  ) : screams === null ? (
    <p>No screams from this user</p>
  ) : !screamIdParam ? (
    screams.map((scream) => <Scream key={scream.screamId} scream={scream} />)
  ) : (
    screams.map((scream) => {
      if (scream.screamId !== screamIdParam)
        return <Scream key={scream.screamId} scream={scream} />;
      else return <Scream key={scream.screamId} scream={scream} openDialog />;
    })
  );

  return (
    <Grid container spacing={2}>
      <Grid item sm={8} xs={12}>
        {screamsMarkup}
      </Grid>
      <Grid item sm={4} xs={12}>
        {profile === null ? <p>Loading profile...</p> : <StaticProfile profile={profile} />}
      </Grid>
    </Grid>
  );
};

User.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  getUserData: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, { getUserData })(withStyles(styles)(User));
