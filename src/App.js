import React from 'react';
import { inject, observer } from 'mobx-react';
import { injectGlobal } from 'emotion';
import styled from 'react-emotion'

import BoardView from './containers/Board';
import ControllerView from './containers/Controller';

injectGlobal`
  body {
    margin: 0;
  }
`;

const Main = styled('main') `
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fafafa;
  padding: 2rem;
  min-height: calc(100vh - 4rem);
`

const GridWrapper = styled('section') `
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: relative;
  padding: 0 3rem;
  & > input[type=range] {
    position: absolute;
    &:first-child {
      left: -3.5rem;
    }
    &:last-child {
      right: -3.5rem;
    }
  }
`

const App = inject('controller')(
  observer(
    class App extends React.Component {
      componentWillUnmount() {
        const { controller } = this.props;
        controller.dispose();
      }

      render() {
        return (
          <Main>
            <ControllerView />
            <GridWrapper>
              <BoardView />
            </GridWrapper>
          </Main>
        )
      }
    }
  )
);

export default App;
