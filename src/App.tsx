import React, { useState, useEffect } from "react";
import { generatePalette } from "./utils/ColorHelpers";
import SeedColors from "./utils/SeedColors";
import { Switch, Route } from "react-router-dom";
import { IPalette } from "./models/IPalette";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Home from "./pages/home/Home";
import MultiColorPalette from "./pages/multiColorPalette/MultiColorPalette";
import SingleColorPalette from "./pages/singleColorPalette/SingleColorPalette";
import NewPalette from "./pages/newPalett/NewPalette";

const seedColors: IPalette[] = SeedColors;

const App: React.FC = () => {
  const [palettes, setpalettes] = useState<IPalette[]>(seedColors);
  useEffect(() => {
    const localStorePalettes = JSON.parse(
      window.localStorage.getItem("palettes") || "{}"
    );
    // console.log(localStorePalettes);
    if (Object.keys(localStorePalettes).length !== 0) {
      // console.log("is local");
      setpalettes(localStorePalettes);
    }
  }, []);

  const findPalette = (id: string) => {
    return palettes.find((palette) => {
      return palette.id === id;
    });
  };
  const savePalette = (newPalette: IPalette) => {
    setpalettes([...palettes, newPalette]);
    window.localStorage.setItem(
      "palettes",
      JSON.stringify([...palettes, newPalette])
    );
  };

  return (
    <Route
      render={({ location }) => (
        <TransitionGroup>
          <CSSTransition timeout={300} classNames='my-element' key={location.key}>
            <div>
              <Switch location={location}>
                <Route
                  path="/palette/new"
                  exact
                  render={(routeProps) => (
                    <NewPalette
                      {...routeProps}
                      savePalette={savePalette}
                      palettes={palettes}
                    ></NewPalette>
                  )}
                ></Route>
                <Route
                  exact
                  path="/palette/:paletteId/:colorId"
                  render={(routeProps) => (
                    <SingleColorPalette
                      palette={generatePalette(
                        findPalette(routeProps.match.params.paletteId)!
                      )}
                      colorId={routeProps.match.params.colorId}
                    ></SingleColorPalette>
                  )}
                ></Route>
                <Route
                  exact
                  path="/palette/:id"
                  render={(routeProps) => (
                    <MultiColorPalette
                      palette={generatePalette(
                        findPalette(routeProps.match.params.id)!
                      )}
                    ></MultiColorPalette>
                  )}
                ></Route>
                <Route
                  exact
                  path={"/"}
                  render={(routeProps) => (
                    <Home
                      {...routeProps}
                      palettes={palettes}
                      setpalettes={setpalettes}
                    ></Home>
                  )}
                ></Route>
                <Route
                  path={"/(.+)"}
                  render={(routeProps) => (
                    <Home
                      {...routeProps}
                      palettes={palettes}
                      setpalettes={setpalettes}
                    ></Home>
                  )}
                ></Route>
              </Switch>
            </div>
          </CSSTransition>
        </TransitionGroup>
      )}
    ></Route>
  );
};

export default App;
