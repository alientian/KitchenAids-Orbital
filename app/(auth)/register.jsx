import { useState } from "react";
import { supabase } from "../../lib/supabase";
import { View, StyleSheet, Image } from "react-native";
import { Text, TextInput, ActivityIndicator, Button } from "react-native-paper";

export default function Register() {
  const logo = require("../(auth)/New.png");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const handleSubmit = async () => {
    if (email == "") {
      setErrMsg("Email cannot be empty");
      return;
    }
    if (password == "") {
      setErrMsg("Password cannot be empty");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signUp({ email, password });
    setLoading(false);
    if (error) {
      setErrMsg(error.message);
      return;
    }
  };
  const styles = StyleSheet.create({
    Kitchenaid: {
      alignSelf: "center",
      width: 300,
      top: -100,
    },
    Input: {
      top: -200,
      borderRadius: 10,
      borderWidth: 2,
      width: "95%",
      paddingVertical: 2,
      paddingTop: 10,
      paddingHorizontal: 5,
      marginLeft: 20,
      marginRight: 20,
      alignSelf: "center",
      height: 45,
      color: "A6B1E1",
    },

    Email: {
      top: -200,
      fontFamily: "Cochin",
      fontSize: 20,
      paddingLeft: 15,
    },
  });

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <Image
        style={styles.Kitchenaid}
        resizeMode="contain"
        source={logo}
      ></Image>
      <Text style={styles.Email}>Email</Text>
      <TextInput
        style={styles.Input}
        placeholder="Email"
        autoCapitalize="none"
        textContentType="emailAddress"
        value={email}
        onChangeText={setEmail}
      />
      <Text style={styles.Email}>Password</Text>
      <TextInput
        style={styles.Input}
        placeholder="Password"
        secureTextEntry
        autoCapitalize="none"
        textContentType="password"
        value={password}
        onChangeText={setPassword}
      />
      <Button style={styles.Email} onPress={handleSubmit}>
        Submit
      </Button>
      {errMsg !== "" && <Text style={styles.Email}>{errMsg}</Text>}
      {loading && <ActivityIndicator />}
    </View>
  );
}
