import { Tabs } from "expo-router";

export default function HomeScreen() {
    return (
        <Tabs>
            <Tabs.Screen name="home" options={{ title: "Home" }} />
            <Tabs.Screen name="addNewFood" options={{ title: "Add New"}}/>
            <Tabs.Screen name="newTodo" options={{ title: "Shopping List" }} />
            <Tabs.Screen name="recipes" options={{ title: "Recipes" }} />
            <Tabs.Screen name="notification" options={{href: null,}} />
            <Tabs.Screen name="profile" options={{ title: "Profile" }} />
            <Tabs.Screen name="index" options={{href: null,}} />
            <Tabs.Screen name="expiring" options={{href: null,}} />
        </Tabs>
    );
}