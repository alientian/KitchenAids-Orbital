import { Tabs } from "expo-router";

export default function HomeScreen() {
    return (
        <Tabs>
            <Tabs.Screen name="index" options={{ title: "Home" }} />
            <Tabs.Screen name="newTodo" options={{ title: "Recipes" }} />
            <Tabs.Screen name="profile" />
        </Tabs>
    );
}