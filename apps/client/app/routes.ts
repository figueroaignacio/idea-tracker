import {
  type RouteConfig,
  layout,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  layout("./layout/layout.tsx", [
    layout("./layout/lobby-layout.tsx", [route("/", "routes/home.tsx")]),
    ...prefix("auth", [
      layout("./layout/auth-layout.tsx", [
        route("login", "./routes/login.tsx"),
      ]),
    ]),
  ]),
] satisfies RouteConfig;
