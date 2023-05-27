import React, {useState} from 'react';
import { View, Text, Image, StyleSheet, useWindowDimensions, ScrollView} from 'react-native';
import Logo from '../../assets/Kitchenaids.png';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';

const SignInScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const {height} = useWindowDimensions();

    const onSignInPressed = () => {
        console.warn('Sign in');
    }

    const onForgotPasswordPressed = () => {
        console.warn('onForgotPasswordPressed');
    };

    const onSignUpPressed = () => {
        console.warn('onSignUpPress');
    };

    return (
        <View style={styles.root}>
            <Image 
            source={Logo} 
            style={styles.logo} 
            resizeMode="contain" 
            />

            <CustomInput 
            placeholder="Username" 
            value={username} 
            setValue={setUsername}
            />
            <CustomInput 
            placeholder="Password" 
            value={password} 
            setValue={setPassword}
            secureTextEntry
            />
            <CustomButton text="Sign In" 
            onPress={onSignInPressed} />

            <CustomButton text="Forgot Password" 
            onPress={onForgotPasswordPressed} 
            type="TERTIARY"/>

            <CustomButton
            text="Don't have an account? Create one"
            onPress={onSignUpPressed}
            type="TERTIARY"
            />
        </View>
    );
};


const styles = StyleSheet.create({
    root:{
        width: 300,
        height: 500,
        alignItems: 'center',
        padding: 5
    },
    logo: {
        width:  600,
        height: 250,
    },
});

export default SignInScreen