import { Text, View, StyleSheet, Image } from "react-native";
import colors from "./src/theme/colors";
import fonts from "./src/theme/fonts";
import Entypo from "react-native-vector-icons/Entypo";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";

const App = () => {
  return (
    <View style={styles.post}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={{ uri: "https://picsum.photos/200/300" }} style={styles.userAvatar} />
        <Text style={styles.userName}>@croko22</Text>
        <Entypo name="dots-three-horizontal" size={20} style={styles.threeDots} />
      </View>
      {/* Content */}
      <Image source={{ uri: "https://picsum.photos/200/300" }} style={styles.image} />
      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.iconContainer}>
          <AntDesign name="hearto" size={24} style={styles.icon} color={colors.black}/>
          <Ionicicons name="chatbubble-outline" size={24} style={styles.icon} color={colors.black}/>
          <Feather name="send" size={24} style={styles.icon} color={colors.black}/>
          <Feather name="bookmark" size={24} style={{marginLeft: "auto"}} color={colors.black}/>
        </View> 
        {/* Likes */}
        <Text style={styles.text}>
          Liked by{' '} 
          <Text style={styles.bold}>felipe</Text> and{' '}
          <Text style={styles.bold}>77 others</Text>
        </Text>
        {/* Post description */}
        <Text>
          <Text style={styles.bold}>croko22</Text>{' '}
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Text>
        {/* Comments */}
        <Text>View all 16 comments</Text>
        <View style={styles.comment}>
          <Text style={styles.commentText}>
            <Text style={styles.bold}>croko22</Text>{' '}
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Text>
          <AntDesign name={'hearto'} style={styles.icon} size={12} color={colors.black}/>
        </View>

        {/* Posted date */}
        <Text>2 days ago</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  post: {

  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  userAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  userName: {
    fontWeight: fonts.weight.bold,
    color : colors.black
  },
  threeDots: {
    marginLeft: "auto",
  },
  footer: {
    padding: 10,
  },
  iconContainer: {
    flexDirection: "row",
    marginBottom: 5,
  },
  icon: {
    marginHorizontal: 5,
  },
  text: {
    color: colors.black,
    lineHeight: 18,
  },
  bold: {
    fontWeight: fonts.weight.bold,
  },
  comment: {
    flexDirection: "row",
    alignItems: "center",
  },
  commentText: {
    color: colors.black,
    flex: 1,
  },
});

export default App;
