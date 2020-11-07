import axios from "axios";
import React, { useEffect, useState } from "react";
import Scream from "../components/Scream";
// MUI Imports
import Grid from "@material-ui/core/Grid";

export const Home = () => {
  const [screams, setscreams] = useState([]);

  useEffect(() => {
    axios.get("/screams").then((res) => {
      setscreams(res.data);
    });
  }, []);
  return (
    <Grid container spacing={2}>
      <Grid item sm={8} xs={12}>
        {(screams.length &&
          screams.map((scream) => <Scream key={scream.screamId} scream={scream} />)) || (
          <p>Loading...</p>
        )}
      </Grid>
      <Grid item sm={4} xs={12}>
        <p>Profile...</p>
      </Grid>
    </Grid>
  );
};
