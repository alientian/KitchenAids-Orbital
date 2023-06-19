import React, { useState, useEffect } from "react";
import { View, Image, StyleSheet} from "react-native";
import { Text, TextInput, Button, ActivityIndicator } from "react-native-paper";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../contexts/auth";
import { useRouter } from "expo-router";
import * as ImagePicker from 'expo-image-picker';
import Notification from "./notification";
import NotificationScreen from "./notification";

export default function Profile() {
    const logo = require("../(auth)/New.png")
    const [username, setUsername] = useState('');
    const [profile, setProfile] = useState(null);
    const [errMsg, setErrMsg] = useState('');
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(null);
    const { user } = useAuth();
    const [email, setEmail] = useState('');
    const router = useRouter();
    const [refreshing, setRefreshing] = useState(false);
    const [avatar, setAvatar] = useState(null);
    
    useEffect(() => {
        if (user) {
            const fetchTodo = async () => {
                const { data } = await supabase.from('profiles').select('*').eq('user_id', user.id).single();
                console.log(data);
                setProfile(data);
            }
            fetchTodo();
            setEmail(user.email);

        }
    }, [])
    if (profile == null) {
        return <ActivityIndicator />
    }
    
    const handleAddImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images });
        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    }

    const handleSave = async () => {
        setErrMsg('');
        if (username === '') {
            setErrMsg('username cannot be empty')
            return;
        }
        setLoading(true);
        let uploadedImage = null;
        if (image != null) {
            const { data, error } = await supabase.storage.from('avatars')
            .upload(`${new Date().getTime()}.jpg`, { uri: image, type: 'jpg', name: 'name.jpg' }, {
                cacheControl: '3600',
                upsert: false
              });

            if (error != null) {
                console.log(error);
                setErrMsg(error.message)
                setLoading(false);
                return;
            }
            const { data: { publicUrl } } = supabase.storage.from('avatars').getPublicUrl(data.path);
            uploadedImage = publicUrl;
        }
        let { error } = await supabase.from('profiles')
        .update({ Username: username, Avatar_url: uploadedImage })
        .eq('user_id', user.id);

        if (error != null) {
            setLoading(false);
            console.log(error);
            setErrMsg(error.message);
            return;
        }
        setLoading(false);
        setUsername('');
        setImage(null);
    }

    const handleNoti = async () => {
        NotificationScreen;
        await NotificationScreen.schedulePushNotification();
    }

    return <View style={styles.container}>
        {/* <Text style={styles.Text}>Profile pic:</Text>
        {profile.Avatar_url && <Image 
        source={{ uri: profile.Avatar_url }} 
        style={{ height: 100, width: 100}} />} */}

        
        <Image style={styles.Kitchenaid} resizeMode="contain" source={logo}></Image>

        <Text style={styles.Text}>Email: {email}</Text>
        <Text style={styles.Text}>Username: {profile.Username}</Text>

        <TextInput style={styles.Input} placeholder={'Enter new username'} value={username} onChangeText={setUsername} />
        {errMsg !== '' && <Text style={styles.Error}>{errMsg}</Text>}

        <Button style={styles.Button} onPress={handleAddImage}>Add Image</Button>
        {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}

        <Button style={styles.Button} onPress={handleSave}>Save</Button>
        {loading && <ActivityIndicator />}

        <Button style={styles.Button} onPress={() => supabase.auth.signOut()}>Logout</Button>

        <Button style ={styles.Button}
        onPress={handleNoti}>Schedule a notification</Button>
        
    </View>;
}

const styles = StyleSheet.create({
    Kitchenaid: {
        alignSelf: 'center',
        width: 300,
        top: -100,

    },
    Input: {
        borderRadius: 10,
        borderWidth: 1,
        width: '95%',
        paddingVertical:2,
        paddingTop: 10,
        alignSelf: 'center',
        height: 45,
        color: 'A6B1E1',
        top: -200
    },
    Text: {
        fontFamily: 'Cochin',
        fontSize: 25,
        paddingLeft: 15,
        marginBottom: 15,
        top: -200
    },
    Error: {
        fontFamily: 'Cochin',
        fontSize: 15,
        paddingLeft: 10,
    },
    container: {
        flex: 1,
        justifyContent: 'center',

    },
    Button: {
        fontFamily: 'Cochin',
        fontSize: 20,
        top: -200
    }
})