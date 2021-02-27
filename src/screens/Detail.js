import axios from "axios";
import { Formik } from "formik";
import React from "react";
import { useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import {
  Button,
  Dialog,
  Paragraph,
  Portal,
  Text,
  TextInput,
} from "react-native-paper";
import * as Yup from "yup";
import { MockApiService } from "../services/MockApiService";

const Detail = ({ route, navigation }) => {
  const [visible, setVisible] = useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  const { user } = route.params;

  const initialValues = {
    ...user,
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(4, "Debe ser mayor a 4 caracteres.")
      .max(100, "Debe ser menor a 100 caracteres.")
      .required("Este campo es requerido."),
    avatar: Yup.string().url(),
  });

  const removeUser = async () => {
    try {
      await MockApiService.deleteUser(user.id);

      hideDialog();

      navigation.popToTop();
    } catch (err) {
      console.error(err);
      hideDialog();
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      //   onSubmit={handleFormik}
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
            label="Id"
            value={values.id}
            disabled
            onChangeText={handleChange("id")}
            onBlur={handleBlur("id")}
            //   error={errors.name && touched.name}
          />

          <TextInput
            label="Nombre del usuario"
            value={values.name}
            style={styles.inputMargin}
            disabled
            onChangeText={handleChange("name")}
            onBlur={handleBlur("name")}
            //   error={errors.name && touched.name}
          />

          <TextInput
            label="URL de Avatar"
            value={values.avatar}
            style={styles.inputMargin}
            disabled
            onChangeText={handleChange("avatar")}
            onBlur={handleBlur("avatar")}
            //   error={errors.name && touched.name}
          />

          <TextInput
            label="Fecha de creación"
            value={values.createdAt}
            style={styles.inputMargin}
            disabled
            onChangeText={handleChange("createdAt")}
            onBlur={handleBlur("createdAt")}
            //   error={errors.name && touched.name}
          />

          {/* <HelperText type="error" visible={errors.name && touched.name}>
          {errors.name}
        </HelperText> */}

          <Button
            mode="contained"
            color="#c6272f"
            style={styles.inputMargin}
            // disabled={errors.name || loading}
            // loading={loading}
            onPress={showDialog}
          >
            Eliminar usuario
          </Button>

          <Portal>
            <Dialog visible={visible} onDismiss={hideDialog}>
              <Dialog.Title>Alerta</Dialog.Title>
              <Dialog.Content>
                <Paragraph>
                  Estás a punto de eliminar un usuario, ¿estás seguro?
                </Paragraph>
                <Paragraph>Recuerda los buenos tiempos con él/ella.</Paragraph>
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={hideDialog}>No, me arrepentí</Button>
                <Button onPress={removeUser}>Si</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>

          {/* {triedCreation && created ? (
          <Caption style={styles.success}>
            El usuario se creó correctamente.
          </Caption>
        ) : triedCreation && !created ? (
          <Caption style={styles.danger}>
            El usuario no se pudo crear.
          </Caption>
        ) : (
          <></>
        )} */}
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
  inputMargin: {
    marginTop: 10,
  },
});

export default Detail;
