import { Pressable, StyleSheet, View } from "react-native";
import { Video } from "expo-av";
import { useState } from "react";
import Ionicicons from "react-native-vector-icons/Ionicons";
import colors from "../../theme/colors";

interface IVideoPlayer {
  uri: string;
  paused?: boolean;
}

const index = ({ uri, paused }: IVideoPlayer) => {
  const [muted, setMuted] = useState(true);

  return (
    <View>
      <Video
        source={{ uri }}
        style={styles.video}
        // @ts-ignore
        resizeMode="contain"
        shouldPlay={!paused}
        isLooping
        isMuted={muted}
      />

      <Pressable onPress={() => setMuted(!muted)} style={styles.muteButton}>
        <Ionicicons
          name={muted ? "volume-mute" : "volume-high"}
          size={14}
          color="white"
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  video: {
    width: "100%",
    aspectRatio: 1,
  },
  muteButton: {
    backgroundColor: colors.black,
    padding: 5,
    borderRadius: 25,
    position: "absolute",
    bottom: 10,
    right: 10,
  },
});

export default index;
