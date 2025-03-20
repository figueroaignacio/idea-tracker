import { type RouteConfig, layout, route } from "@react-router/dev/routes";

export default [
  layout("./layout/layout.tsx", [
    layout("./layout/lobby-layout.tsx", [route("/", "routes/home.tsx")]),
  ]),
] satisfies RouteConfig;
