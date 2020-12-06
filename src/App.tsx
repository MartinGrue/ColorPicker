import React, { useState, useEffect } from "react";
import { generatePalette } from "./features/utils/ColorHelpers";
import SeedColors from "./features/utils/SeedColors";
import { Switch, Route } from "react-router-dom";
import PaletteList from "./features/palette/screens/PaletteList";
import Pallete from "./features/palette/screens/Pallete";
import { IPalette } from "./models/IPalette";
import SingleColorPalette from "./features/palette/screens/SingleColorPalette";
import NewPaletteForm from "./features/form/NewPaletteForm";
import { TransitionGroup, CSSTransition } from "react-transition-group";

const seedColors: IPalette[] = SeedColors;

const App: React.FC = () => {
  const [palettes, setpalettes] = useState<IPalette[]>(seedColors);
  useEffect(() => {
    const localStorePalettes = JSON.parse(
      window.localStorage.getItem("palettes") || "{}"
    );
    console.log(localStorePalettes);
    if (Object.keys(localStorePalettes).length !== 0) {
      console.log("is local");

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
          <CSSTransition classNames="fade" timeout={500} key={location.key}>
            <Switch location={location}>
              <Route
                path="/palette/new"
                exact
                render={(routeProps) => (
                  <NewPaletteForm
                    {...routeProps}
                    savePalette={savePalette}
                    palettes={palettes}
                  ></NewPaletteForm>
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
                path="/"
                render={(routeProps) => (
                  <PaletteList
                    {...routeProps}
                    palettes={palettes}
                    setpalettes={setpalettes}
                  ></PaletteList>
                )}
              ></Route>
              <Route
                exact
                path="/palette/:id"
                render={(routeProps) => (
                    <Pallete
                      palette={generatePalette(
                        findPalette(routeProps.match.params.id)!
                      )}
                    ></Pallete>
                )}
              ></Route>
              <Route
                render={(routeProps) => (
                    <PaletteList
                      {...routeProps}
                      palettes={palettes}
                      setpalettes={setpalettes}
                    ></PaletteList>
                )}
              ></Route>
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      )}
    ></Route>
  );
};

export default App;
