import { FlatList, View, SafeAreaView, StyleSheet } from "react-native";
import { supabase } from "../../lib/supabase";
import { useEffect, useState } from "react";
import { Text, Button, ActivityIndicator } from "react-native-paper";

// Filters out food that are expiring
export default function ExpiringScreen() {
  const [productName, setProductName] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(null);

  useEffect(() => {
    let today = new Date();
    let date =
      today.getFullYear() * 10000 +
      (today.getMonth() + 2) * 100 +
      today.getDate();
    setDate(date);
  }, []);

  // Fetches data from the current table in supabase and filter out food that has dates one month away from current date
  async function fetchTodos() {
    setRefreshing(true);
    let { data } = await supabase
      .from("ExistingFood")
      .select("*")
      .lte("Expiry_Date", date);
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

  // Deletes food data from supabase and UI
  const handleDelete = async (id) => {
    setLoading(true);
    const { error } = await supabase.from("ExistingFood").delete().eq("id", id);
    setRefreshing(true);
    setLoading(false);
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <SafeAreaView style={{ width: 350 }}>
        <FlatList
          data={productName}
          onRefresh={() => setRefreshing(true)}
          refreshing={refreshing}
          ListHeaderComponent={() => (
            <Text
              style={{
                fontSize: 30,
                textAlign: "center",
                marginTop: 20,
                fontWeight: "bold",
              }}
            >
              Item List
            </Text>
          )}
          renderItem={({ item: todo }) => (
            <View
              style={{
                flexDirection: "column",
                alignItems: "center",
                marginTop: 1,
                borderColor: "black",
                borderWidth: 1,
                borderRadius: 10,
              }}
            >
              <View>
                <Text>Item: {todo.Product_Name}</Text>
                <Text> </Text>
                <Text>Brand: {todo.Product_Brand}</Text>
                <Text> </Text>
                <Text>Quantity: {todo.Quantity}</Text>
                <Text> </Text>
                <Text style={{ color: "red" }}>
                  Expiry Date: {todo.Expiry_Date}
                </Text>
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
