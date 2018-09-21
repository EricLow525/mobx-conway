import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import App from './App';

import Controller from './store/Controller';
import Game from './store/Game';
import GridLayout from './layout/GridLayout';

//this can be imported via .env file using dotenv
const initialConfig = {
  speed: 1,
  size: 20
};

const createRooStores = config => {
  const { size } = config;
  const layout = new GridLayout(size, size);
  const game = new Game(layout);

  const controller = new Controller(layout, game, config);
  return { controller, game };
};

const stores = createRooStores(initialConfig);

ReactDOM.render(
  <Provider {...stores}>
    <App />
  </Provider>,
  document.getElementById('root')
);
