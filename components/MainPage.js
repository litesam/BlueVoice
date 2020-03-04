import React from 'react';
import BluetoothSerial from 'react-native-bluetooth-serial';
import { View, StyleSheet, Text, TouchableOpacity, TouchableHighlight } from 'react-native';
import { Link } from 'react-router-native';
import styled from 'styled-components/native';
import { SvgXml } from 'react-native-svg';
import { icons } from 'feather-icons/dist/feather';

import Sidebar from './Sidebar';

// TODO: Send to Arduino is a seperate component which should be on FeedPage

const Wrapper = styled.View`
  padding-top: 40%;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
`;

const StyledButton = StyleSheet.create({
  box: {
    backgroundColor: '#f00',
    borderColor: 'rgb(33, 150, 243)',
    // alignItems: 'center',
    width: 200,
    flex: 1,
    height: 200,
    borderRadius: 132,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#000',
    marginBottom: 10,
  }
});

export default class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.isBluetoothEnabled = this.isBluetoothEnabled.bind(this);
    this.getPairedDevices = this.getPairedDevices.bind(this);
    this.disconnect = this.disconnect.bind(this);
    // this.onChangeText = this.onChangeText.bind(this);
    // this.sendToArduino = this.sendToArduino.bind(this);
    this.connectToShit = this.connectToShit.bind(this);
    // this.renderLater = this.renderLater.bind(this);

    this.state = {
      pairedDevices: [],
      connectedDevice: null,
      connecting: false,
      textData: '',
      isOpen: false
    };
  }

  async componentWillMount() {
    await this.getPairedDevices();
    await this.isBluetoothEnabled();
  }

  componentDidMount() {
    BluetoothSerial.on('bluetoothDisabled', this.isBluetoothEnabled);
  }

  componentWillUnmount() {
    BluetoothSerial.removeListener('bluetoothDisabled')
  }

  async isBluetoothEnabled() {
    try {
      const bluetoothState = await BluetoothSerial.isEnabled();
      if (!bluetoothState) {
        this.setState({ connectedDevice: null });
      }
      console.log('State:', bluetoothState);
    } catch (e) {
      console.log(e);
    }
  }

  async getPairedDevices() {
    try {
      const pairedDevices = await BluetoothSerial.list();
      this.setState({ pairedDevices });
      console.log(this.state.pairedDevices);
    } catch (e) {
      console.log(e);
    }
  }

  async disconnect() {
    if (!this.state.connecting) {
      try {
        this.setState({ connecting: true });
        await BluetoothSerial.disconnect();
        this.setState({
          connectedDevice: null,
          connecting: false
        });
      } catch (e) {
        console.log(e);
        this.setState({ connecting: false });
      }
    }
  }

  // onChangeText(text) {
  //   console.log(this.state.textData);
  //   this.setState({ textData: text });
  // }

  // async sendToArduino() {
  //   await BluetoothSerial.write(this.state.textData);
  // }

  async connectToShit() {
    BluetoothSerial.isConnected().then(connected => {
      if (!connected) {
        BluetoothSerial.connect(this.state.pairedDevices[0].id).then(res => {
          this.setState({ connecting: true });
          console.log(this.state.connecting);
        }).catch(err => console.log(err));
      }
    });
  }

  render() {
    console.log(this.state.connecting);
    return (
      <View>
        <TouchableHighlight
          onPress={() => this.setState({ isOpen: !this.state.isOpen })}
          underlayColor='#fff'
        >
          <SvgXml
            width="30"
            height="30"
            xml={icons['menu'].toSvg({ stroke: 'black' })}
          />
        </TouchableHighlight>
        {this.state.isOpen && <Sidebar />}
        <Wrapper>
          <View style={{ justifyContent: 'space-between' }}>
            {!this.state.connecting ?
              <Link to="/feedlive" style={StyledButton.box}>
                <Text>Start Listening</Text>
              </Link>
              :
              <Link to="/feedlive">
                <Text>Start Listening</Text>
              </Link>
            }
            <TouchableOpacity
              style={{ color: 'pink', justifyContent: 'center', alignItems: 'center', backgroundColor: 'papayawhip', height: 50 }}
              onPress={this.connectToShit}
            ><Text>Connect</Text></TouchableOpacity>
          </View>
        </Wrapper>
      </View>
    );
  }
}