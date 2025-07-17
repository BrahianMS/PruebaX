import { dashboard } from "../views/dashboard.js";
import { landingView } from "../views/landingView.js";
import { loginView } from "../views/loginView.js";
import { notFound } from "../views/not-found.js";
import { registerView } from "../views/registerView.js";

const routes = {
    "/landing" : landingView,
    "/login" : loginView,
    "/register" : registerView,
    "/dashboard": dashboard,
    "/notfound": notFound,
}

export function router() {
  const hash = window.location.hash.slice(1) || "/landing";
  const route = routes[hash];

  if (route) {
    route();
  } else {
    routes['/notfound']();
  }
}
