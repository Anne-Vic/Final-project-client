import axios from "axios";

const service = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  withCredentials: true, // Cookie is sent to client when using this service. (used for session)
});

function errorHandler(error) {
  if (error.response) {
    console.log(error.response && error.response.data);
    throw error;
  }
  throw error;
}

export default {
  service,

  signup(userInfo) {
    return service
      .post("/api/auth/signup", userInfo)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  signin(userInfo) {
    console.log(userInfo);
    return service
      .post("/api/auth/signin", userInfo)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  isLoggedIn() {
    return service
      .get("/api/auth/isLoggedIn")
      .then((res) => res.data)
      .catch(errorHandler);
  },

  logout() {
    return service
      .get("/api/auth/logout")
      .then((res) => res.data)
      .catch(errorHandler);
  },

  getEvents() {
    return service
      .get("/api/events")
      .then((res) => res.data)
      .catch(errorHandler);
  },

  getMyEvents() {
    return service
      .get("/api/events/mine")
      .then((res) => res.data)
      .catch(errorHandler);
  },

  getOneEvent(eventId) {
    console.log(eventId);
    return service
      .get(`/api/events/${eventId}`)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  getMessages(eventId) {
    return service
      .get(`/api/messages/by-event/${eventId}`)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  addMessage(eventId, data) {
    return service
      .post(`/api/messages/by-event/${eventId}`, data)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  addEvent(data) {
    return service
      .post("/api/events", data)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  deleteEvent(eventId) {
    return service
      .delete(`/api/events/${eventId}`)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  updateEvent(eventId, data) {
    return service
      .patch(`/api/events/${eventId}`, data)
      .then((res) => res.data)
      .catch(errorHandler);
  },
};
