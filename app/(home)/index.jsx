import { FlatList, View, SafeAreaView, StyleSheet} from 'react-native';
import { supabase } from '../../lib/supabase';
import { useEffect, useState } from 'react';
import { Text, Button, ActivityIndicator} from 'react-native-paper';

// Shows all food item
export default function IndexScreen() {
    const [productName, setProductName] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(false);

    // Fetches all food data of the corresponding user id
    async function fetchTodos() {
        setRefreshing(true);
        let { data } = await supabase.from('ExistingFood').select('*');
        setRefreshing(false);
        setProductName(data);
    }

    useEffect(() => {
        fetchTodos();
    }, []);

    useEffect(() => {
        if (refreshing) {
            fetchTodos();
            setRefreshing(false);
        }
    }, [refreshing]);

    // Deletes food data of selected item
    async function handleDelete(id) {
        setLoading(true);
        const { error } = await supabase.from('ExistingFood').delete().eq('id', id);
        setRefreshing(true);
        setLoading(false);
    }

    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        
            <SafeAreaView style={{width: 350}}>
                <FlatList
                    data={productName}
                    onRefresh={() => setRefreshing(true)}
                    refreshing={refreshing}
                    ListHeaderComponent={() => (
                        <Text style={{ fontSize: 30, textAlign: "center", marginTop:20, fontWeight:'bold' }}>
                        Item List
                        </Text>
                    )}
                    renderItem={({ item: todo }) => (
                        <View style={{ flexDirection: 'column', alignItems: 'center', marginTop: 1, borderColor: "black", borderWidth: 1, borderRadius: 10 }} >
                            <View>
                                <Text>Item: {todo.Product_Name}</Text>
                                <Text>                   </Text>
                                <Text>Brand: {todo.Product_Brand}</Text>
                                <Text>              </Text>
                                <Text>Quantity: {todo.Quantity}</Text>
                                <Text>                   </Text>
                                <Text>Expiry date: {todo.Expiry_Date}</Text>
                            </View>

                            <Button onPress={() => handleDelete(todo.id)}>Delete</Button>
                            {loading && <ActivityIndicator />}
                        </View>
                    )}
                />
            </SafeAreaView>
        </View>
    );
}
