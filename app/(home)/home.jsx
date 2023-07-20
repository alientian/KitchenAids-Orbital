import * as React from "react";
import { View, useWindowDimensions, Text } from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";
import IndexScreen from "./index";
import ExpiringScreen from "./expiring";



export default function HomeScreen() {
  const layout = useWindowDimensions();

  // Two tabs: one for all food and one for expiring food items
  const renderScene = SceneMap({
    first: () => <IndexScreen />,
    second: () => <ExpiringScreen />,
  });

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "All" },
    { key: "second", title: "Expiring" },
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
