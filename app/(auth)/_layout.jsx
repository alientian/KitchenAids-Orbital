import { Stack } from "expo-router";
import { useAuth } from "../../contexts/auth";

export const unstable_settings = {
    initialRouteName: "login",
};

export default function AuthRoot() {
    return (
        <Stack />
    );
}