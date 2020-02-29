/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component, useState, useEffect, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  Button,
  View,
  TextInput,
} from 'react-native';

import BluetoothSerial from 'react-native-bluetooth-serial';

// const BLUETOOTH_ENABLED = 'bluetoothEnabled';
// const BLUETOOTH_DISABLED = 'bluetoothDisabled';
// const BLUETOOTH_ERROR = 'error';
// const BLUETOOTH_CONNECTION_LOST = 'connectionLost';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.isBluetoothEnabled = this.isBluetoothEnabled.bind(this);
    this.getPairedDevices = this.getPairedDevices.bind(this);
    this.enableBluetoothAndRefresh = this.enableBluetoothAndRefresh.bind(this);
    this.connectToDevice = this.connectToDevice.bind(this);
    this.disconnect = this.disconnect.bind(this);
    this.sendStringToDevice = this.sendStringToDevice.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
    this.sendToArduino = this.sendToArduino.bind(this);
    this.connectToShit = this.connectToShit.bind(this);

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
    // BluetoothSerial.isConnected()
    //   .then(connected => {

    //   });
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

  async enableBluetoothAndRefresh() {
    try {
      await BluetoothSerial.enable();
      setTimeout(() => {
        this.getPairedDevices();
      }, 1000);
    } catch (e) {
      console.log(e);
    }
  }

  async connectToDevice(device) {
    const { connectedDevice } = this.state;
    const connectedDeviceId = connectedDevice && connectedDevice.id;
    if (!this.state.connecting) {
      if (device.id === connectedDeviceId) {
        console.log('State', 'Already connected to this device.');
      } else {
        try {
          this.setState({
            connecting: true,
            connectedDevice: null
          });
          await BluetoothSerial.connect(device.id);
          this.setState({
            connectedDevice: device,
            connecting: false
          });
        } catch (e) {
          console.log(e);
          this.setState({
            connectedDevice: null,
            connecting: false
          });
          console.log('Unable to connect to this device.');
        }
      }
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

  async sendStringToDevice(data) {
    try {
      await BluetoothSerial.write(data);
    } catch (e) {
      console.log(e);
    }
  }

  onChangeText(text) {
    console.log(this.state.textData);
    this.setState({ textData: text });
  }

  async sendToArduino() {
    await BluetoothSerial.write(this.state.textData);
  }

  async connectToShit() {
    BluetoothSerial.isConnected().then(connected => {
      if (!connnected) {
        BluetoothSerial.connect(this.state.pairedDevices[0].id).then(res => {
          this.setState({ connecting: true });
        }).catch(err => console.log(err));
      }
    });
  }

  render() {
    return (
      <View
      // style={styles.container}
      >
        <TextInput
          style={styles.welcome}
          onChangeText={text => this.onChangeText(text)}
          value={this.state.textData}
        />
        <Button
          styles={styles.instructions}
          title="Choo choo to Arduino"
          color="#f194ff"
          onPress={this.sendToArduino}
        />
        <Button
          title="Connect to Arduino"
          onPress={this.connectToShit}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
    marginTop: 50
  },
});
