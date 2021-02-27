import moment from "moment";
import localization from "moment/locale/es";
import React from "react";
import { SafeAreaView } from "react-native";
import { Avatar, Divider, List, TouchableRipple } from "react-native-paper";

const UsersList = ({ user, navigation }) => {
  const momentES = moment(user.createdAt);
  momentES.locale("es", localization);

  return (
    <SafeAreaView>
      <TouchableRipple
        onPress={() =>
          navigation.navigate("Detail", {
            user,
          })
        }
        rippleColor="rgba(0, 0, 0, .32)"
      >
        <List.Item
          title={user.name}
          description={`Usuario creado el ${momentES.format("lll")}`}
          left={(props) => (
            <Avatar.Image {...props} size={64} source={{ uri: user.avatar }} />
          )}
        />
      </TouchableRipple>
      <Divider />
    </SafeAreaView>
  );
};

export default UsersList;
