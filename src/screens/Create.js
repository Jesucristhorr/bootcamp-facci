import React from "react";
import { Formik } from "formik";
import { SafeAreaView, StyleSheet } from "react-native";
import {
  Button,
  Caption,
  HelperText,
  Text,
  TextInput,
} from "react-native-paper";
import * as Yup from "yup";
import { MockApiService } from "../services/MockApiService";
import { useState } from "react";

const initialValues = {
  name: "",
};
const Create = () => {
  const [loading, setLoading] = useState(false);
  const [created, setCreated] = useState(false);
  const [triedCreation, setTriedCreation] = useState(false);

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(4, "Debe ser mayor a 4 caracteres.")
      .max(100, "Debe ser menor a 100 caracteres.")
      .required("Este campo es requerido."),
  });

  const handleFormik = async (values) => {
    const newUser = {
      ...values,
      createdAt: new Date().toISOString(),
      avatar: "http://lorempixel.com/640/480/sports",
    };
    try {
      setLoading(true);
      await MockApiService.postUser(newUser);

      setCreated(true);
      setLoading(false);
      setTriedCreation(true);
    } catch (err) {
      console.error(err);

      setCreated(false);
      setLoading(false);
      setTriedCreation(true);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleFormik}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
      }) => (
        <SafeAreaView style={styles.container}>
          <TextInput
            label="Nombre del usuario"
            value={values.name}
            onChangeText={handleChange("name")}
            onBlur={handleBlur("name")}
            error={errors.name && touched.name}
          />

          <HelperText type="error" visible={errors.name && touched.name}>
            {errors.name}
          </HelperText>

          <Button
            mode="contained"
            disabled={errors.name || loading}
            style={styles.buttonMargin}
            loading={loading}
            onPress={handleSubmit}
          >
            Crear usuario
          </Button>

          {triedCreation && created ? (
            <Caption style={styles.success}>
              El usuario se creó correctamente.
            </Caption>
          ) : triedCreation && !created ? (
            <Caption style={styles.danger}>
              El usuario no se pudo crear.
            </Caption>
          ) : (
            <></>
          )}
        </SafeAreaView>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 12,
  },
  buttonMargin: {
    marginTop: 10,
  },
  success: {
    color: "#27c637",
  },
  danger: {
    color: "#c6272f",
  },
});

export default Create;
