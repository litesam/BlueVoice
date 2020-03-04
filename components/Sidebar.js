import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Link } from 'react-router-native';
import ToggleSwitch from 'toggle-switch-react-native';
import styled from 'styled-components/native';

const ElevatedView = styled.View`
  position: absolute;
  top: 30;
  z-index: 1000;
  background-color: #aaa;
`;

export default class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      label: false,
      logs: false,
      identifier: false
    }
  }

  render() {
    return (
      <ElevatedView>
        <Link to="/history">
          <Text>See conversation history</Text>
        </Link>
        <Text>User Settings</Text>
        <View>
          <View>
            <ToggleSwitch
              isOn={this.state.label}
              onColor="green"
              offColor="red"
              label="Label Extractor"
              size="medium"
              onToggle={isOn => this.setState({ label: isOn })}
            />
          </View>
          <View>
            <ToggleSwitch
              isOn={this.state.logs}
              onColor="green"
              offColor="red"
              label="Log conversation history"
              size="medium"
              onToggle={isOn => this.setState({ logs: isOn })}
            />
          </View>
          <View>
            <ToggleSwitch
              isOn={this.state.identifier}
              onColor="green"
              offColor="red"
              label="Speaker Identification"
              size="medium"
              onToggle={isOn => this.setState({ identifier: isOn })}
            />
          </View>
        </View>
        {/* <Route path="/history" component={HistoryPage} /> */}
      </ElevatedView>
    );
  }
}