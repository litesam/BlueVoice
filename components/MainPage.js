import React from 'react';
import BluetoothSerial from 'react-native-bluetooth-serial';
import { View, TextInput, Button, Text, TouchableOpacity } from 'react-native';
import { Link } from 'react-router-native';
import styled from 'styled-components/native';

// TODO: Send to Arduino is a seperate component which should be on FeedPage

// width: 90vw;
// height: 90vh;
// flex: 1;
const Wrapper = styled.View`
  padding-top: 40%;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
`;

// margin-top: 100px;
// width: 50vw;
// height: 50vh;
// height: 10%;
// color: 
const StyledButton = styled.TouchableOpacity`
  background-color: ${props => props.secondary ? '#0f0' : '#f00'};
  border-color: rgb(33, 150, 243);
  align-items: center;
  width: 200px;
  flex: 1;
  height: 200px;
  border-radius: 132;
  align-items: center;
  justify-content: center;
  border-width: 1;
  border-color: #000;
  margin-bottom: 10px;
`;

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
      textData: ''
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
        <Wrapper>
          <View style={{ justifyContent: 'space-between' }}>
            {!this.state.connecting ?
              <StyledButton>
                <Link to="/feedlive">
                  <Text>Start Listening</Text>
                </Link>
              </StyledButton> :
              <StyledButton secondary>
                <Link to="/feedlive">
                  <Text>Start Listening</Text>
                </Link>
              </StyledButton>
            }
            <TouchableOpacity
              style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: 'papayawhip', height: 50 }}
              onPress={this.connectToShit}
            ><Text>Connect</Text></TouchableOpacity>
          </View>
        </Wrapper>
        <Link to="/history"><Text>See History</Text></Link>
      </View>
    );
  }
}