import React from 'react';
import styled from 'styled-components/native';
import { View, Text } from 'react-native';
import { Link } from 'react-router-native';
import { SvgXml } from 'react-native-svg';
import { icons } from 'feather-icons/dist/feather';
import { Buffer } from 'buffer';
import AudioRecord from 'react-native-audio-record';

const Holder = styled.View`
  width: 90%;
  height: 60%;
  background-color: pink;
  margin-bottom: 30px;
  margin-top: 30px;
  padding: 1%;
`;

const StyledButton = styled.TouchableOpacity`
  background-color: #ff5090;
  border-color: rgb(33, 150, 243);
  align-items: center;
  width: 100px;
  flex: 1;
  height: 200px;
  border-radius: 132;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
`;

export default class FeedPage extends React.Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    const options = {
      sampleRate: 16000,
      channels: 1,
      bitsPerSample: 16,
      wavFile: 'test.wav'
    };

    AudioRecord.init(options);

    AudioRecord.on('data', (data) => {
      const chunk = Buffer.from(data, 'base64');
      console.log(chunk.byteLength);
    });

    AudioRecord.start();
  }

  render() {
    return (
      <View>
        <Link to="/">
          <SvgXml
            width="60"
            height="60"
            xml={icons['arrow-left'].toSvg({ stroke: 'black' })}
          ></SvgXml>
        </Link>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Holder>
            <Text>Anonymous:</Text>
            <Text>{"\n"}</Text>
            <Text>{"\t\t\t"}I feel good today!</Text>
          </Holder>
          <StyledButton><Text>Disconnect</Text></StyledButton>
        </View>
      </View>
    );
  }
}