import React from 'react';
import styled from 'styled-components/native';
import { View, Text, StyleSheet } from 'react-native';
import { Link } from 'react-router-native';
import { SvgXml } from 'react-native-svg';
import { icons } from 'feather-icons/dist/feather';

const Holder = styled.View`
  width: 90%;
  height: 60%;
  background-color: pink;
  margin-bottom: 30px;
  margin-top: 30px;
  padding: 1%;
`;

const StyledButton = StyleSheet.create({
  box: {
    backgroundColor: '#f00',
    borderColor: 'rgb(33, 150, 243)',
    // alignItems: 'center',
    width: 100,
    flex: 1,
    height: 180,
    borderRadius: 132,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#000',
    marginBottom: 10,
  }
});

export default class FeedPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <Link to="/">
          <SvgXml
            width="30"
            height="30"
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
          <Link to="/" style={StyledButton.box}><Text>Disconnect</Text></Link>
        </View>
      </View>
    );
  }
}