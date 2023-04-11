import { View, Text, Image } from "react-native";
import Button from "../../components/Button";
import styles from "./styles";
import FeedPost from "../../components/FeedPost";
import user from "../../assets/data/user.json";

const ProfileHeader = () => {
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
          onPress={() => console.warn("Editing profile")}
        />
        <Button text="Dummy Button" onPress={() => console.warn("Dummy")} />
      </View>
    </View>
  );
};

export default ProfileHeader;
