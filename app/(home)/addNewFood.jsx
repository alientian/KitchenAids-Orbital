import React, { useState } from "react";
import { Image, ScrollView, StyleSheet, SafeAreaView } from "react-native";
import { Text, TextInput, Button, ActivityIndicator, } from "react-native-paper";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../contexts/auth";
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from "moment";
//import { useRouter } from "expo-router";
import * as ImagePicker from 'expo-image-picker';

export default function AddNewFood() {
    const { user } = useAuth();
    const [productName, setName] = useState('');
    const [productBrand, setBrand] = useState('');
    const [quantity, setQty] = useState('');
    const [expiryDate, setExpiry] = useState('');
    const [isVisible, setVisibility] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(null);
    //const router = useRouter();
    const [refreshing, setRefreshing] = React.useState(false);

    // clears the whole form with data written
    const clear = async () => {
        setName('');
        setBrand('');
        setQty('');
        setExpiry('');
        setImage(null);
    }

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
          setRefreshing(false);
        }, 2000);
      }, []);

      // handle camera image allows users to make use of their phone cameras to take pictures
    const handleCameraImage = async () => {
        // ask for permssion to use camera
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

        if (permissionResult.granted === false) {
          alert("You've refused to allow this app to access your camera!");
        return;
        }

        const result = await ImagePicker.launchCameraAsync();

        // Explore the result
        console.log(result);

        if (!result.canceled) {
          setImage(result.uri);
            console.log(result.assets[0].uri);
        }
    }

    // handle add image allows users to make use of thier phone image gallery to choose pictures
    const handleAddImage = async () => {
        //ask for permission to access imgae gallery
        const permission = ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permission.granted === false) {
            alert("You've refused to allow this app to access your photos!");
          return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({ 
            mediaTypes: ImagePicker.MediaTypeOptions.Images 
        });

        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    }

    // handle submit allows users to upload their data to the database
    const handleSubmit = async () => {
        // Will set off error message is product name and expiry date is empty
        setErrMsg('');
        if (productName === '') {
            setErrMsg('Product Name cannot be empty')
            return;
        }
        if (expiryDate === '') {
            setErrMsg('Expiry Date cannot be empty')
            return;
        }

        setLoading(true);
        let uploadedImage = null;
        // uploads food item image to supabase storage
        if (image != null) {
            const { data, error } = await supabase.storage.from('images').upload(`${new Date().getTime()}`, { uri: image, type: 'jpg', name: 'name.jpg' });

            if (error != null) {
                console.log(error);
                setErrMsg(error.message)
                setLoading(false);
                return;
            }
            const { data: { publicUrl } } = supabase.storage.from('images').getPublicUrl(data.path);
            uploadedImage = publicUrl;
        }
        // uploads food item data to supabase table 
        const { error } = await supabase.from('ExistingFood').insert({Product_Name: productName, Product_Brand: productBrand, 
            Quantity: quantity, Expiry_Date: expiryDate, image_url: uploadedImage, user_id: user.id }).select().single();

        if (error != null) {
            setLoading(false);
            console.log(error);
            setErrMsg(error.message);
            return;
        }
        setLoading(false);
        //router.push('/');
        setName('');
        setBrand('');
        setQty('');
        setExpiry('');
        setImage(null);
    }

    // allow the date picker to appear
    const showDatePicker = () => {
        setVisibility(true);
    }

    // hides the date picker
    const hideDatePicker = () => {
        setVisibility(false);
    }
    
    // set date for expiry date of food item
    const handleExpiryConfirm = date => {
        setExpiry(date);
        hideDatePicker();
    }

    const styles = StyleSheet.create({
        Input: {
            borderRadius: 10,
            borderWidth: 1,
            width: '95%',
            paddingVertical:2,
            paddingTop: 10,
            alignSelf: 'center',
            height: 45,
            color: 'A6B1E1'
        },
        Text: {
            fontFamily: 'Cochin',
            fontSize: 20,
            paddingLeft: 15,
        },
        Error: {
            fontFamily: 'Cochin',
            fontSize: 15,
            paddingLeft: 10,
        },
        container: {
            flex: 1,
        },
        scrollView: {
            flex: 1,
            backgroundColor: 'white',
            justifyContent: 'center',
        },
    })

    return <SafeAreaView style={styles.container}>
    <ScrollView>
        <Text style={styles.Text}>Product Name: </Text>
        <TextInput style={styles.Input} clearButtonMode="always" value={productName} onChangeText={setName} />

        <Text style={styles.Text}>Product Brand: </Text>
        <TextInput style={styles.Input} clearButtonMode="always" value={productBrand} onChangeText={setBrand} />

        <Text style={styles.Text}>Quantity (Input a number): </Text>
        <TextInput style={styles.Input} clearButtonMode="always" keyboardType="numeric"
         value={quantity} onChangeText={setQty} />

        <Text style={styles.Text}>Expiry Date: </Text>
        <Text style={styles.Text}>{` ${expiryDate? moment(expiryDate).format("MM/DD/YYYY"):"Please select date"}`}</Text>
        <Button onPress={showDatePicker}>Select Date</Button>
        <DateTimePicker isVisible={isVisible} mode="date" onConfirm={handleExpiryConfirm} onCancel={hideDatePicker}/>

        <Button onPress={handleCameraImage}>Camera</Button>

        <Button onPress={handleAddImage}>Add Image</Button>
        {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}

        <Button onPress={clear}>Clear</Button> 

        <Button onPress={handleSubmit}>Submit</Button>
        {errMsg !== "" && <Text style={styles.Text}>{errMsg}</Text>}
        {loading && <ActivityIndicator />}
     
    </ScrollView>
    </SafeAreaView>
}

