import * as React from 'react';
import { View, useWindowDimensions, Text } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import IndexScreen from './index';
import ExpiringScreen from './expiring';

const SecondRoute = () => (
  <View style={{ flex: 1, }} />
);

const renderScene = SceneMap({
  first: () => <IndexScreen/>,
  second: () => <ExpiringScreen/>,
});

export default function TabViewScreen() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'All' },
    { key: 'second', title: 'Expiring' },
  ]);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  );
}