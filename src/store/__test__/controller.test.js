import Controller from '../Controller';
import Game from '../game';
import GridLayout from '../../layout/GridLayout';

describe('Game Controller', () => {
  it('should update status as progress', () => {
    const initialConfig = {
      speed: 1,
      size: 3
    };

    const layout = new GridLayout(3, 3);
    const game = new Game(layout);
    const controller = new Controller(layout, game, initialConfig);
    controller.reset();
    expect(controller.isRunning).toBe(false);
    expect(controller.isReady).toBe(false);

    controller.seedGame();
    expect(controller.isRunning).toBe(false);
    expect(controller.isReady).toBe(true);

    controller.start();
    expect(controller.isRunning).toBe(true);
    expect(controller.isReady).toBe(false);
    controller.reset();
  });
});
