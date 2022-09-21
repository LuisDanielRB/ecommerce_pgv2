import axios from "axios";

export const loginAuth = (body) => async (dispatch) => {
  try {
    let login = await axios.post("/login", body);
    return dispatch({
      type: "POST_LOGIN",
      payload: login,
    });
  } catch (error) {
    console.log(error);
  }
};

export const registerAuth = (body) => async (dispatch) => {
  try {
    let registro = await axios.post("/register", body);
    return dispatch({
      type: "POST_REGISTRO",
      payload: registro,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getEventDetail = (id) => async (dispatch) => {
  try {
    let eventsDB = await axios.get(`/eventsDB/${id}`);
    console.log(eventsDB);
    return dispatch({
      type: "GET_EVENT_DETAIL",
      payload: eventsDB.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAllEvents = () => async (dispatch) => {
  function concat(array) {
    let newArray = [];
    for (let i = 0; i < array.length; i++) {
      newArray = newArray.concat(array[i]);
    }
    let uniqueCategories = [...new Set(newArray)];
    return uniqueCategories;
  }

  try {
    let getAllEvents = await axios.get("/events");
    let datos = getAllEvents.data;

    let categories = datos.map((el) => el.category);
    let uniqueCAtegories = concat(categories);

    let artist = datos.map((el) => el.artist);
    let uniqueArtist = concat(artist);

    let place = datos.map((el) => el.place);
    let uniquePlace = concat(place);

    let newObj = {
      datos,
      uniqueCAtegories,
      uniqueArtist,
      uniquePlace,
    };
    return dispatch({
      type: "GET_ALL_EVENTS",
      payload: newObj,
    });
  } catch (error) {
    console.log(error);
  }
};

export const createEvent = (body) => async (dispatch) => {
  try {
    const data = await axios.post("/createEvent", body);
    return dispatch({
      type: "POST_EVENT",
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export function searchLive(payload) {
  return {
    type: "SEARCH_LIVE",
    payload,
  };
}
