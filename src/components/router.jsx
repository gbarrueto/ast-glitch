import * as React from "react";
import { Switch, Route, Router } from "wouter";
import NorthHemisphere from "../pages/northHemisphere";
import SouthHemisphere from "../pages/southHemisphere";

/**
* The router is imported in app.jsx
*
* Our site just has two routes in it–Home and About
* Each one is defined as a component in /pages
* We use Switch to only render one route at a time https://github.com/molefrog/wouter#switch-
*/

export default () => (
    <Switch>
      <Route path="/" component={NorthHemisphere} />
      <Route path="/north" component={NorthHemisphere} />
      <Route path="/south" component={SouthHemisphere} />
    </Switch>
);
