import React from 'react';
import styled from 'styled-components/native';
import { View, Text } from 'react-native';
import { Link } from 'react-router-native';

export default class FeedPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <Link to="/"><Text>Go home</Text></Link>
      </View>
    );
  }
}