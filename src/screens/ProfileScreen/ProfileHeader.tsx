import { View, Text, Image } from "react-native";
import { Auth } from "aws-amplify";
import styles from "./styles";
import user from "../../assets/data/user.json";
import Button from "../../components/Button";
import { useNavigation } from "@react-navigation/native";
import { ProfileNavigationProp } from "../../navigation/types";

const ProfileHeader = () => {
  const navigation = useNavigation<ProfileNavigationProp>();
  return (
    <View style={styles.root}>
      <View style={styles.headerRow}>
        {/* Profile pic */}
        <Image source={{ uri: user.image }} style={styles.avatar} />

        {/* Posts, followers, folling number */}
        <View style={styles.statsContainer}>
          <Text style={styles.numberText}>77</Text>
          <Text>Posts</Text>
        </View>
        <View style={styles.statsContainer}>
          <Text style={styles.numberText}>7</Text>
          <Text>Followers</Text>
        </View>
        <View style={styles.statsContainer}>
          <Text style={styles.numberText}>772</Text>
          <Text>Following</Text>
        </View>
      </View>

      {/* User name */}
      <Text style={styles.name}>{user.name}</Text>
      <Text>{user.bio}</Text>

      <View style={{ flexDirection: "row" }}>
        <Button
          text="Edit Profile"
          onPress={() => navigation.navigate("Edit Profile")}
        />
        <Button text="Sign Out" onPress={() => Auth.signOut()} />
      </View>
    </View>
  );
};

export default ProfileHeader;
