import { action, observable } from 'mobx';

const DEAD = false;
const ALIVE = true;

/**
 * Game Store
 */
class Game {
  /**
   * Game constructor
   */
  constructor(layout) {
    this._layout = layout;
    this.reset();
  }

  /**
   * A list of cells.
   * we don't mutate cells to optimize performance.
   */
  @observable.ref
  _cells = null;
  @observable
  _generation = 0;

  reset() {
    this.setCells(new Array(this._layout.totalLength).fill(DEAD));
    this.setGeneration(0);
  }

  /**
   * produce next generation cells
   */
  goToNextGeneration() {
    let diffCount = 0;
    const nextCells = this._cells.map((cell, index) => {
      const neighbours = this._layout.getNeighbours(index);
      const aliveCount = neighbours.filter(listIndex => this._cells[listIndex])
        .length;
      if ((cell && aliveCount < 2) || aliveCount > 3) {
        // RULE NO. 1 AND NO. 3
        diffCount++;
        return DEAD;
      } else if (!cell && aliveCount === 3) {
        // RULE NO. 4
        diffCount++;
        return ALIVE;
      }

      // RULE NO. 2
      return cell;
    });

    if (diffCount > 0) {
      this.setCells(nextCells);
      this.increaseGeneration();
    }
  }

  /**
   * return current cells
   */
  get cells() {
    return this._cells;
  }

  /**
   * return current generation number
   */
  get generation() {
    return this._generation;
  }

  /**
   * action for set cells
   */
  @action
  setCells(items) {
    if (items.length === this._layout.totalLength) {
      this._cells = [...items];
      return true;
    }
    return false;
  }

  /**
   * set generation number
   */
  @action
  setGeneration() {
    return this._generation;
  }

  /**
   * increate generation number
   */
  @action
  increaseGeneration() {
    this._generation++;
  }
}

export default Game;
