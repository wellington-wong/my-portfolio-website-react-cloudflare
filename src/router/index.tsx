import { lazy, Suspense, useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import routes from "./config";
import { Styles } from "../styles/styles";

const Router = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(()=>{
    setTimeout(()=>setIsLoaded(true), 100)
  }, [])

  return (
    <Suspense fallback={null}>
      <Styles />
      <Header />
      <Switch>
        {routes.map((routeItem) => {
          return (
            <Route
              key={routeItem.component}
              path={routeItem.path}
              exact={routeItem.exact}
              component={lazy(() => import(`../pages/${routeItem.component}`))}
            />
          );
        })}
      </Switch>
      {isLoaded && <Footer />}
    </Suspense>
  );
};

export default Router;
