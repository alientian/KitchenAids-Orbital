import React, {useState} from 'react';
import { View, Text, Image, StyleSheet, useWindowDimensions, ScrollView} from 'react-native';

const HomeScreen = () => {
    const {height} = useWindowDimensions();

    return (
        <View style={styles.root}>
            <Text style={styles.title}>Home</Text>

    
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
        textAlign: 'left',
    }, 
    
});

export default HomeScreen