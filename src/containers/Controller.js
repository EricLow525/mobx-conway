import React from 'react';
import styled from 'react-emotion'
import { inject, observer } from 'mobx-react';

import Container from '../components/Container';
import FlatButton from '../components/FlatButton';

const Generation = styled('p')`
  font-family: Roboto;
  font-size: 13px;
  font-weight: bold;
  text-transform: uppercase;
  color: #222;
`;


const SizeInput = styled('input')`
  font-family: Roboto;
  font-size: 13px;
  font-weight: bold;
  text-transform: uppercase;
  margin-left: 4px;
  margin-right: 4px;
  color: #222;
`;

const ActionBar = styled('section')`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;
  & > button {
    width: 5.5rem;
    padding-left: 0;
    padding-right: 0;
    &:not(:last-child) {
      margin-right: 1rem;
    }
  }
`;

const ControllerView = inject('controller')(
  observer(
    class Controller extends React.Component {
      constructor(props) {
        super(props);
        const { size, speed } = props.controller;

        this.state = {
          speed,
          size
        };
      }

      setSize(prop, event) {
        const value = parseInt(event.target.value, 10);
        this.setState({
          [prop]: value
        });
      } 

      updateConfig = () => {
        const { speed, size } = this.state;
        const { controller } = this.props;

        if (size >= 10 && size <= 40) {
          controller.setConfig({speed, size});
        } else {
          alert('Please set size between 10 and 40');
          this.setState({size: controller.size});
        }
      };

      render() {
        const { controller } = this.props;
        const { isRunning, isReady } = controller;
        const { size } = this.state;

        return (
          <Container>
            { !isRunning && <ActionBar >
              Size 
              <SizeInput
                disabled={isRunning}
                value={size}
                type="number"
                onInput={(event) => this.setSize('size', event)}
                onChange={(event) => this.setSize('size', event)}
              />
              <FlatButton onClick={this.updateConfig}>Set</FlatButton>
            </ActionBar>
            }
            <ActionBar>
              <FlatButton disabled={isRunning || !isReady} onClick={() => controller.start()}>
                Run
              </FlatButton>
              <FlatButton disabled={!isRunning} onClick={() => controller.reset()}>Reset</FlatButton>
              <FlatButton disabled={isRunning} onClick={() => controller.seedGame()}>SEED</FlatButton>
            </ActionBar>
          </Container>
        );
      }
    }
  )
);

export default ControllerView;
