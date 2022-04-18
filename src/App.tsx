import React, { useState, useEffect } from "react";
import { generatePalette } from "./utils/ColorHelpers";
import SeedColors from "./utils/SeedColors";
import { useParams, Route, Routes } from "react-router-dom";
import { IPalette } from "./models/IPalette";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Home from "./pages/home/Home";
import MultiColorPalette from "./pages/multiColorPalette/MultiColorPalette";
import SingleColorPalette from "./pages/singleColorPalette/SingleColorPalette";
import NewPalette from "./pages/newPalett/NewPalette";
import { IExtendedPalette } from "./models/IExtendedPalette";

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
    <Routes>
      {/* <TransitionGroup> */}
      {/* <CSSTransition timeout={300} classNames="my-element"> */}
      <Route
        path={"/"}
        element={<Home {...{ setpalettes, palettes }}></Home>}
      ></Route>
      <Route
        path="/palette/new"
        element={<NewPalette {...{ savePalette, palettes }}></NewPalette>}
      ></Route>
      <Route
        path="/palette/:id"
        element={<MultiColorPalette {...{ findPalette }}></MultiColorPalette>}
      ></Route>
      <Route
        path="/palette/:paletteId/:colorId"
        element={
          <SingleColorPalette
            {...{ savePalette, findPalette }}
          ></SingleColorPalette>
        }
      ></Route>
      {/* 

 
            <Route
              path={"/(.+)"}
              render={(routeProps) => (
                <Home
                  {...routeProps}
                  palettes={palettes}
                  setpalettes={setpalettes}
                ></Home>
              )}
            ></Route> */}
      {/* </CSSTransition>
      </TransitionGroup> */}
    </Routes>
  );
};

export default App;
