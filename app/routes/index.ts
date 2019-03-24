const routes = require("next-routes")();

const HomePage = "/HomePage/HomePage";

const allRoutes = [
  { name: "home", pattern: "/", page: HomePage }
];

function addRoutes():any {
  allRoutes.forEach((route:any) => {
    routes.add({
      name: route.name,
      pattern: route.pattern,
      page: route.page
    });
  });
}
addRoutes();

const Link = routes.Link;

export default routes;
export { Link };
