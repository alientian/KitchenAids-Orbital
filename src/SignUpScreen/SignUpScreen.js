import React, {useState} from 'react';
import { View, Text, Image, StyleSheet, useWindowDimensions, ScrollView} from 'react-native';
import Logo from '../../assets/Kitchenaids.png';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';

const SignUpScreen = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');

    const {height} = useWindowDimensions();

    const onRegisterPressed = () => {
        console.warn('onRegisterPressed');
    }

    const onForgotPasswordPressed = () => {
        console.warn('onForgotPasswordPressed');
    };

    const onSignUpPressed = () => {
        console.warn('onSignUpPress');
    };

    return (
        <View style={styles.root}>
            <Text style={styles.title}>Create an account</Text>

            <CustomInput 
            placeholder="Username" 
            value={username} 
            setValue={setUsername}
            />
            <CustomInput 
            placeholder="Email" 
            value={email} 
            setValue={setEmail}
            />
            <CustomInput 
            placeholder="Password" 
            value={password} 
            setValue={setPassword}
            secureTextEntry
            />
            <CustomInput 
            placeholder="Repeat Password" 
            value={passwordRepeat} 
            setValue={setPasswordRepeat}
            secureTextEntry
            />
            <CustomButton text="Register" 
            onPress={onRegisterPressed} />

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

    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#051C60',
        margin: 10,
    }, 
    CustomInput: {
        height: 500,
        width: 200,
    },
});

export default SignUpScreen