import React from 'react';
import { View, DrawerLayoutAndroid } from 'react-native';
import { NativeRouter, Route } from 'react-router-native';

import MainPage from './MainPage';
import HistoryPage from './HistoryPage';
import FeedPage from './FeedPage';
import Sidebar from './Sidebar';

export default function () {
  let navigationDrawer = (
    <Sidebar />
  );

  return (
    <NativeRouter>
      <Route exact path="/" component={MainPage} />
      <Route path="/history" component={HistoryPage} />
      <Route path="/feedlive" component={FeedPage} />
    </NativeRouter>
  );
}