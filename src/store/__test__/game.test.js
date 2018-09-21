import Game from '../game';
import GridLayout from '../../layout/GridLayout';

const TEST_CELLS = [false, true, false, false, true, false, false, true, false];
const TEST_CELLS1 = [true, true, true, false, true, false, false, true, false];
const TEST_CELLS2 = [false, true, true, false, false, false, false, true, false];

describe('Game Rules', () => {
  it('#1 underpopulation', () => {
    const layout = new GridLayout(3, 3);
    const game = new Game(layout);
    game.setCells([...TEST_CELLS]);

    const cellsToDie = [1, 7];
    game.goToNextGeneration();
    const { cells } = game;
    const cellsToCheck = cellsToDie.map(item => cells[item]);
    const desiredCells = new Array(cellsToDie.length).fill(false);
    expect(cellsToCheck).toMatchObject(desiredCells);
  });

  it('#2  next generation', () => {
    const layout = new GridLayout(3, 3);
    const game = new Game(layout);
    game.setCells([...TEST_CELLS]);

    const cellsToRemain = [4];
    game.goToNextGeneration();
    const { cells } = game;
    const cellsToCheck = cellsToRemain.map(item => cells[item]);
    const desiredCells = new Array(cellsToRemain.length).fill(true);
    expect(cellsToCheck).toMatchObject(desiredCells);
  });

  it('#3  overpopulation', () => {
    const layout = new GridLayout(3, 3);
    const game = new Game(layout);
    game.setCells([...TEST_CELLS1]);

    const cellsToDie = [4];
    game.goToNextGeneration();
    const { cells } = game;
    const cellsToCheck = cellsToDie.map(item => cells[item]);
    const desiredCells = new Array(cellsToDie.length).fill(false);
    expect(cellsToCheck).toMatchObject(desiredCells);
  });

  it('#4  reproduction', () => {
    const layout = new GridLayout(3, 3);
    const game = new Game(layout);
    game.setCells([...TEST_CELLS2]);

    const cellsToProduce = [4];
    game.goToNextGeneration();
    const { cells } = game;
    const cellsToCheck = cellsToProduce.map(item => cells[item]);
    const desiredCells = new Array(cellsToProduce.length).fill(true);
    expect(cellsToCheck).toMatchObject(desiredCells);
  });

  it('should meet all rules together', () => {
    const layout = new GridLayout(3, 3);
    const game = new Game(layout);

    const prevCellStates = [...TEST_CELLS];
    const desiredCellStates = [false, false, false, true, true, true, false, false, false];
    game.setCells(prevCellStates);
    game.goToNextGeneration();

    const { cells } = game;
    expect(cells).toMatchObject(desiredCellStates);
  });
});
