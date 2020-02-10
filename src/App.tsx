import React, { useState, useEffect } from 'react';
import { generatePalette } from './ColorHelpers';
import './App.css';
import SeedColors from './SeedColors';
import { Switch, Route } from 'react-router-dom';
import PaletteList from './PaletteList';
import Pallete from './Pallete';
import { IPalette } from './models/IPalette';
import SingleColorPalette from './SingleColorPalette';
import NewPaletteForm from './NewPaletteForm';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import './App.css';

const seedColors: IPalette[] = SeedColors;

const App: React.FC = () => {
  const [palettes, setpalettes] = useState<IPalette[]>(seedColors);
  useEffect(() => {
    const localStorePalettes = JSON.parse(
      window.localStorage.getItem('palettes') || '{}'
    );
    console.log(localStorePalettes);
    if (Object.keys(localStorePalettes).length !== 0) {
      console.log('is local');
      setpalettes(localStorePalettes);
    }
  }, []);

  const findPalette = (id: string) => {
    return palettes.find(palette => {
      return palette.id === id;
    });
  };
  const savePalette = (newPalette: IPalette) => {
    setpalettes([...palettes, newPalette]);
    window.localStorage.setItem(
      'palettes',
      JSON.stringify([...palettes, newPalette])
    );
  };

  return (
    <Route
      render={({ location }) => (
        <TransitionGroup>
          <CSSTransition classNames='fade' timeout={500} key={location.key}>
            <Switch location={location}>
              <Route
                path='/palette/new'
                exact
                render={routeProps => (
                  <div className='page'>
                    <NewPaletteForm
                      {...routeProps}
                      savePalette={savePalette}
                      palettes={palettes}
                    ></NewPaletteForm>
                  </div>
                )}
              ></Route>
              <Route
                exact
                path='/palette/:paletteId/:colorId'
                render={routeProps => (
                  <div className='page'>
                    <SingleColorPalette
                      palette={generatePalette(
                        findPalette(routeProps.match.params.paletteId)!
                      )}
                      colorId={routeProps.match.params.colorId}
                    ></SingleColorPalette>
                  </div>
                )}
              ></Route>
              <Route
                exact
                path='/'
                render={routeProps => (
                  <div className='page'>
                    <PaletteList
                      {...routeProps}
                      palettes={palettes}
                      setpalettes={setpalettes}
                    ></PaletteList>
                  </div>
                )}
              ></Route>

              <Route
                exact
                path='/palette/:id'
                render={routeProps => (
                  <div className='page'>
                    <Pallete
                      palette={generatePalette(
                        findPalette(routeProps.match.params.id)!
                      )}
                    ></Pallete>
                  </div>
                )}
              ></Route>
              <Route
                render={routeProps => (
                  <div className='page'>
                    <PaletteList
                      {...routeProps}
                      palettes={palettes}
                      setpalettes={setpalettes}
                    ></PaletteList>
                  </div>
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
