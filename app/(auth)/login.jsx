import { View, Image, StyleSheet } from "react-native";
import { useState } from "react";
import { Text, TextInput, Button, ActivityIndicator } from "react-native-paper";
import { Link } from "expo-router";
import { supabase } from "../../lib/supabase";
//import { color } from "framer-motion";

export default function LoginPage() {
    const logo = require("../(auth)/New.png")
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    const handleSubmit = async () => {
        setErrMsg('');
        if (email == '') {
            setErrMsg("Email cannot be empty")
            return;
        }
        if (password == '') {
            setErrMsg("Password cannot be empty")
            return;
        }
        setLoading(true);
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        setLoading(false);
        if (error) {
            setErrMsg(error.message);
            return;
        }

        
    }
    const styles = StyleSheet.create({
        Kitchenaid: {
            alignSelf: 'center',
            width: 300,
            top: -100
        },
        Input: {
            top: -200,
            borderRadius: 10,
            borderWidth: 2,
            width: '95%',
            paddingVertical:2,
            paddingTop: 10,
            paddingHorizontal:5,
            marginLeft: 20,
            marginRight: 20,
            alignSelf: 'center',
            height: 45,
            color: 'A6B1E1'
        },

        Email: {
            top: -200,
            fontFamily: 'Cochin',
            fontSize: 20,
            paddingLeft: 15,
        },
        
    })
    return (
        <View style={{ flex: 1, justifyContent: 'center', backgroundColor:'A6B1E1' }}>
            <Image style={styles.Kitchenaid}
            resizeMode="contain"
            source={logo}></Image>
            <Text style={styles.Email}>Email</Text>
            <TextInput style={styles.Input}
                autoCapitalize='none'
                textContentType='emailAddress'
                value={email}
                onChangeText={setEmail} />
            <Text style={styles.Email}>Password</Text>
            <TextInput style={styles.Input}
                secureTextEntry
                autoCapitalize='none'
                textContentType='password'
                value={password}
                onChangeText={setPassword} />
            <Button style={styles.Email} 
                    onPress={handleSubmit}
                    colour='DCD6F7'>
                        Submit</Button>
            {errMsg !== "" && <Text style={styles.Email}>{errMsg}</Text>}
            {loading && <ActivityIndicator />}
            <Link href="/register">
                <Button>Go to register</Button>
            </Link>
        </View>
    )
}
