import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { Button } from "react-native-paper";

const Home = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Button
        mode="contained"
        style={styles.button}
        color="#27c687"
        onPress={() => navigation.navigate("Read")}
      >
        Lectura
      </Button>
      <Button mode="contained" onPress={() => navigation.navigate("Create")}>
        Crear
      </Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 12,
    justifyContent: "center",
  },
  button: {
    marginBottom: 10,
  },
});

export default Home;
