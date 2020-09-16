import { authStore } from "./store";
import { add as addMessage } from "./message";

const baseURL =
  window.location.protocol +
  "//" +
  window.location.hostname +
  (process.env.NODE_ENV === "production" ? "/api" : ":3001");

const getAuth = (method, path, body) => {
  return fetch(baseURL + path, {
    method,
    headers: { "Content-Type": "application/json" },
    body,
  })
    .then((response) => {
      if (response.status !== 401) {
        return response.json();
      } else {
        addMessage("danger", "Your session has timed out. Please log in again");
        authStore.token = "";
        authStore.user = {};
        window.sessionStorage.clear();
      }
    })
    .then((result) => {
      return result.data;
    })
    .catch((err) => console.log(err));
};

const apiCall = (m, path, body, withAuth, c) => {
  let headers;
  const contentType = c ? c : "json";
  const method = m || "GET";
  switch (contentType) {
    case "json":
      headers = { "Content-Type": "application/json" };
      break;
    case "pdf":
      headers = { "Content-Type": "application/pdf" };
      break;
    case "csv":
      headers = { "Content-Type": "application/json" };
      break;
    case "form":
      headers = {};
      break;
    default:
      headers = {};
      break;
  }
  const opts = Object.assign({ method, headers });
  if (method !== "GET") {
    Object.assign(opts, { body });
  }
  if (withAuth) {
    Object.assign(opts.headers, { Authorization: "Bearer " + authStore.token });
  }
  return fetch(baseURL + path, opts)
    .then((response) => {
      if (
        response.status === 204 ||
        response.status === 404 ||
        response.status === 500
      ) {
        return { data: response.status };
      } else if (c === "csv" && response.status === 200) {
        return response.text().then((body) => {
          return { data: body };
        });
      } else if (withAuth && response.status !== 401) {
        return response.json();
      } else if (response.status === 200) {
        return { data: response.status };
      } else if (response.status === 401) {
        authStore.token = "";
        authStore.user = {};
        window.sessionStorage.clear();
        addMessage(
          "danger",
          "Your session has timed out. Please log in again."
        );
      } else {
        addMessage(
          "danger",
          "There was a problem authenticating. Please try logging in again."
        );
        authStore.token = "";
        authStore.user = {};
        return { data: response.status.json() };
      }
    })
    .then((result) => {
      return result.data;
    })
    .catch((err) => {
      console.log(err);
      addMessage(
        "danger",
        "There was a problem connecting to the server. Please try again after some time or contact us info@mri-application.de"
      );
      authStore.token = "";
      authStore.user = {};
      window.sessionStorage.clear();
    });
};

export { baseURL, getAuth, apiCall };
