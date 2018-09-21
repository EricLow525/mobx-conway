import styled from 'react-emotion';

const Cell = styled('button')`
  cursor: pointer;
  grid-row: span 1;
  grid-column: span 1;
  border: 0;
  outline: 0;
  transition: background-color 0.1s ease-in-out;
  background-color: ${props => (props.alive ? '#0EE57C' : '#E84857')};

  &:hover {
    opacity: 0.5;
  }

  &:active {
    opacity: 1;
  }
`;

export default Cell;
