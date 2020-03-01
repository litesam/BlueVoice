import React from 'react';
import { View } from 'react-native';
import { NativeRouter, Route } from 'react-router-native';

import MainPage from './MainPage';
import HistoryPage from './HistoryPage';
import FeedPage from './FeedPage';

export default function () {

  return (
    <View>
      <NativeRouter>
        <Route exact path="/" component={MainPage} />
        <Route path="/history" component={HistoryPage} />
        <Route path="/feedlive" component={FeedPage} />
      </NativeRouter>
    </View>
  );
}