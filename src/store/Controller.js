import { action, observable, computed } from 'mobx';

const ControlState = {
  RESET: 0,
  READY: 1,
  RUNNING: 2
};

/**
 * This is main place where we put main game placing logic
 */
class Controller {
  constructor(layout, game, config) {
    this._layout = layout;
    this._game = game;
    this._config = config;
    this._state = ControlState.RESET;
  }

  @observable
  _config = null;
  @observable
  _autorun = null;
  @observable
  _state = 0;

  @computed
  get isRunning() {
    return this._state === ControlState.RUNNING;
  }

  @computed
  get isReady() {
    return this._state === ControlState.READY;
  }

  @computed
  get size() {
    return this._config.size;
  }

  get speed() {
    return this._config.speed;
  }

  @action
  setConfig(config) {
    this._config = config;
    const { size } = this._config;
    this._layout.setLayoutSize(size, size);
    this._game.reset();
    this._state = ControlState.RESET;
  }

  dispose() {
    this._clear();
  }

  @action
  _clear() {
    if (this._autorun) {
      clearInterval(this._autorun);
      this._autorun = null;
    }
  }

  /**
   * start timer
   */
  @action
  start() {
    this._clear();
    const { speed } = this._config;
    this._autorun = setInterval(this.handleTick, speed * 100);
    this._state = ControlState.RUNNING;
  }

  /**
   * Reset game
   */
  @action
  reset() {
    this._clear();
    this._game.reset();
    this._state = ControlState.RESET;
  }

  /**
   * Randomly seed game
   */
  @action
  seedGame() {
    const length = this._layout.totalLength;
    const aliveCount = Math.floor(length/2);
    const cells = new Array(length).fill(false);

    let indexList = Array.from({ length }, (v, k) => k);

    for (let i = 0; i < aliveCount; i++) {
      const rand = Math.floor(length * Math.random());
      const index = indexList.splice(rand, 1)[0];
      cells[index] = true;
    }
    this._game.setCells(cells);
    this._game.setGeneration(1);
    this._state = ControlState.READY;
  }

  /**
   * main function that handles generation
   */
  handleTick = () => {
    this._game.goToNextGeneration();
  };
}

export default Controller;
