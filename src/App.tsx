import React, { useState, useEffect } from "react";
import SeedPalettes from "./utils/SeedPalettes";
import { Route, Routes, useLocation } from "react-router-dom";
import { IPalette } from "./models/IPalette";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Home from "./pages/home/Home";
import MultiColorPalette from "./pages/multiColorPalette/MultiColorPalette";
import SingleColorPalette from "./pages/singleColorPalette/SingleColorPalette";
import NewPalette from "./pages/newPalett/NewPalette";

const App: React.FC = () => {
  const [palettes, setpalettes] = useState<IPalette[]>(SeedPalettes);

  useEffect(() => {
    const localStorePalettes = JSON.parse(
      window.localStorage.getItem("palettes") || "{}"
    );
    if (Object.keys(localStorePalettes).length !== 0) {
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
  const location = useLocation();
  return (
    <TransitionGroup component={null}>
      <CSSTransition key={location.key} timeout={300} classNames="my-element">
        <Routes>
          <Route path={"/"} element={<Home {...{ setpalettes, palettes }} />} />
          <Route
            path="/palette/new"
            element={<NewPalette {...{ savePalette, palettes }} />}
          />
          <Route
            path="/palette/:id"
            element={<MultiColorPalette {...{ findPalette }} />}
          />
          <Route
            path="/palette/:paletteId/:colorId"
            element={<SingleColorPalette {...{ savePalette, findPalette }} />}
          />

          <Route
            path={"/(.+)"}
            element={<Home {...{ setpalettes, palettes }} />}
          />
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default App;
