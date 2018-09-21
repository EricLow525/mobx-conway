import GridLayout from '../GridLayout';

describe('Grid Layout', () => {
  it('should return correct length', () => {
    const numRow = 3,
      numCol = 3;
    const layout = new GridLayout(numRow, numCol);
    expect(layout.totalLength).toBe(numRow * numCol);
  });
  
  it('should return correct grid index', () => {
    const numRow = 3,
      numCol = 3;
    const layout = new GridLayout(numRow, numCol);
    const { row, col } = layout.getGridIndex(numRow + 1);
  
    expect(row).toBe(1);
    expect(col).toBe(1);
  });
  
  it('should return correct neighbours', () => {
    const numRow = 3,
      numCol = 3;
    const layout = new GridLayout(numRow, numCol);
  
    expect(layout.getNeighbours(layout.getListIndex(1, 1)).length).toBe(8);
    expect(layout.getNeighbours(layout.getListIndex(0, 1)).length).toBe(5);
    expect(layout.getNeighbours(layout.getListIndex(0, 0)).length).toBe(3);
    expect(layout.getNeighbours(layout.getListIndex(1, 0)).length).toBe(5);
    expect(layout.getNeighbours(layout.getListIndex(2, 2)).length).toBe(3);
  });  
});
