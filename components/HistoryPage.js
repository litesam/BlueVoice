import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Link, BackButton } from 'react-router-native';
import { SvgXml } from 'react-native-svg';
import { icons } from 'feather-icons/dist/feather';

const A = new Array(8).fill(0).map((a) => {

  return {
    speaker: 'Anonymous',
    data: 'How is life',
    timeStamp: '2'
  }
});

export default class HistoryPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <View>
        <BackButton />
        <Link
          to="/"
        >
          <SvgXml
            width="30"
            hieght="30"
            xml={icons['arrow-left'].toSvg({ stroke: 'black' })}
          />
        </Link>
        <View style={styles.centerView}>
          {A.map((values, i) => {
            return (
              <View key={i + 1} style={styles.holder}>
                <Text>{values.speaker}</Text>
                <Text>{values.data}</Text>
                <Text>{values.timeStamp}</Text>
              </View>
            )
          }
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  centerView: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    // backgroundColor: 'pink'
  },
  navigation: {
    padding: 10
  },
  holder: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'pink',
    flexGrow: 2
  }
});