import {
  SET_SCREAMS,
  SET_SCREAM,
  LOADING_DATA,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  DELETE_SCREAM,
  LOADING_UI,
  STOP_LOADING_UI,
  POST_SCREAM,
  SET_ERRORS,
  CLEAR_ERRORS,
  SUBMIT_COMMENT,
} from "../types";
import axios from "axios";
import { apiUrl } from "../../const/api";

// Get all screams
export const getScreams = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get(`${apiUrl}/screams`)
    .then((res) => {
      dispatch({
        type: SET_SCREAMS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_SCREAMS,
        payload: [],
      });
    });
};

// Get a scream
export const getScream = (screamId) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .get(`${apiUrl}/scream/${screamId}`)
    .then((res) => {
      dispatch({
        type: SET_SCREAM,
        payload: res.data,
      });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch((err) => console.log(err));
};

// Post a scream
export const postScream = (newScream) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post(`${apiUrl}/scream`, newScream)
    .then((res) => {
      dispatch({
        type: POST_SCREAM,
        payload: res.data,
      });
      dispatch(clearErrors());
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

// Like a scream
export const likeScream = (screamId) => (dispatch) => {
  axios
    .get(`${apiUrl}/scream/${screamId}/like`)
    .then((res) => {
      dispatch({
        type: LIKE_SCREAM,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

// Unlike a scream
export const unLikeScream = (screamId) => (dispatch) => {
  axios
    .get(`${apiUrl}/scream/${screamId}/unlike`)
    .then((res) => {
      dispatch({
        type: UNLIKE_SCREAM,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

// Submit a comment
export const submitComment = (screamId, commentData) => (dispatch) => {
  axios
    .post(`${apiUrl}/scream/${screamId}/comment`, commentData)
    .then((res) => {
      dispatch({ type: SUBMIT_COMMENT, payload: res.data });
      dispatch(clearErrors());
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

// Delete a scream
export const deleteScream = (screamId) => (dispatch) => {
  axios
    .delete(`${apiUrl}/scream/${screamId}`)
    .then(() => {
      dispatch({ type: DELETE_SCREAM, payload: screamId });
    })
    .catch((err) => console.log(err));
};

// Get user data
export const getUserData = (userHandle) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get(`${apiUrl}/user/${userHandle}`)
    .then((res) => {
      dispatch({ type: SET_SCREAMS, payload: res.data.screams });
    })
    .catch(() => {
      dispatch({
        type: SET_SCREAMS,
        payload: null,
      });
    });
};

export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
