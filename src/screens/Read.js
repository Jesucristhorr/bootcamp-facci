import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Text } from "react-native-paper";
import UsersList from "../components/UsersList";
import { MockApiService } from "../services/MockApiService";

const Read = ({ navigation }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await MockApiService.getUsers();

      setUsers(users);
    };

    fetchUsers();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {users.map((user) => (
          <UsersList key={user.id} user={user} navigation={navigation} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 12,
  },
});

export default Read;
