import React from 'react';
import Cell from '../components/Cell';
import { css } from 'emotion';
import { inject, observer } from 'mobx-react';

const BoardView = inject('game', 'controller')(
  observer(
    class GridBoard extends React.Component {
      componentDidMount() {
        window.addEventListener('resize', () => this.forceUpdate());
      }

      render() {
        const {
          controller: { size },
          game: { cells },
        } = this.props;

        const minWidthHeight =
            Math.min(window.innerWidth, window.innerHeight) * 0.7,
          GridBoardStyle = css`
            display: grid;
            grid-template-rows: repeat(${size}, 1fr);
            grid-template-columns: repeat(${size}, 1fr);
            grid-gap: 0.1rem;
            grid-column: 2;
            background-color: #fafafa;
            width: ${minWidthHeight}px;
            height: ${minWidthHeight}px;
            margin: auto;

            & > button:first-child {
              border-top-left-radius: 4px;
            }

            & > button:nth-last-child(${size}) {
              border-bottom-left-radius: 4px;
            }

            & > button:nth-child(${size}) {
              border-top-right-radius: 4px;
            }

            & > button:last-child {
              border-bottom-right-radius: 4px;
            }
          `;

        const items = cells.map((elem, index) => (
          <Cell alive={elem} key={index} />
        ));
        return <section className={GridBoardStyle}>{items}</section>;
      }
    }
  )
);

export default BoardView;
