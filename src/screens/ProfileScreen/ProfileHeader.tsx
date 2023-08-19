import { View, Text, Image } from "react-native";
import { Auth } from "aws-amplify";
import Button from "../../components/Button";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import { ProfileNavigationProp } from "../../types/navigation";
import { User } from "../../API";
import { DEFAULT_USER_IMAGE } from "../../config";
import { useAuthContext } from "../../contexts/AuthContext";

interface IProfileHeader {
  user: User;
}

const ProfileHeader = ({ user }: IProfileHeader) => {
  const { userId } = useAuthContext();
  const navigation = useNavigation<ProfileNavigationProp>();
  return (
    <View style={styles.root}>
      <View style={styles.headerRow}>
        {/* Profile pic */}
        <Image
          source={{ uri: user.image || DEFAULT_USER_IMAGE }}
          style={styles.avatar}
        />

        {/* Posts, followers, folling number */}
        <View style={styles.statsContainer}>
          <Text style={styles.numberText}>{user.nofPosts}</Text>
          <Text>Posts</Text>
        </View>
        <View style={styles.statsContainer}>
          <Text style={styles.numberText}>{user.nofFollowers}</Text>
          <Text>Followers</Text>
        </View>
        <View style={styles.statsContainer}>
          <Text style={styles.numberText}>{user.nofFollowings}</Text>
          <Text>Following</Text>
        </View>
      </View>

      {/* User name */}
      <Text style={styles.name}>{user.name}</Text>
      <Text>{user.bio}</Text>

      {user.id === userId && (
        <View style={{ flexDirection: "row" }}>
          <Button
            text="Edit Profile"
            onPress={() => navigation.navigate("Edit Profile")}
          />
          <Button text="Sign Out" onPress={() => Auth.signOut()} />
        </View>
      )}
    </View>
  );
};

export default ProfileHeader;
