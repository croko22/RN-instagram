import { View, Text, StyleSheet, Pressable } from "react-native";
import { Camera } from "expo-camera";
import {
  CameraPictureOptions,
  CameraRecordingOptions,
  FlashMode,
  CameraType,
  VideoQuality,
} from "expo-camera/build/Camera.types";
import { useEffect, useState, useRef } from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import colors from "../../theme/colors";

const flashModes = [
  FlashMode.off,
  FlashMode.on,
  FlashMode.auto,
  FlashMode.torch,
];

const flashModeIcons = {
  [FlashMode.off]: "flash-off",
  [FlashMode.on]: "flash-on",
  [FlashMode.auto]: "flash-auto",
  [FlashMode.torch]: "highlight",
};

const PostUploadScreen = () => {
  const [hasPermissions, setHasPermissions] = useState<boolean | null>(null);
  const [cameraType, setCameraType] = useState(CameraType.back);
  const [flash, setFlash] = useState(FlashMode.off);
  const [isCameryReady, setIsCameraReady] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  const camera = useRef<Camera>(null);

  //* Request permissions
  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const microphonePermission =
        await Camera.requestMicrophonePermissionsAsync();

      setHasPermissions(
        cameraPermission.status === "granted" &&
          microphonePermission.status === "granted"
      );
    })();
  }, []);

  const flipFlash = () => {
    const index = flashModes.indexOf(flash);
    const nextIndex = (index + 1) % flashModes.length;
    setFlash(flashModes[nextIndex]);
  };

  const takePicture = async () => {
    if (!isCameryReady || !camera.current || isRecording) return;

    const options: CameraPictureOptions = {
      quality: 0.5,
      skipProcessing: true,
    };

    const result = await camera.current?.takePictureAsync(options);
    console.log(result);
  };

  const startRecording = async () => {
    if (!isCameryReady || !camera.current || isRecording) return;
    const options: CameraRecordingOptions = {
      quality: VideoQuality["480p"],
      maxDuration: 60,
      maxFileSize: 1024 * 1024 * 10,
      mute: false,
    };
    setIsRecording(true);
    try {
      const result = await camera.current?.recordAsync(options);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
    setIsRecording(false);
  };

  const stopRecording = async () => {
    if (isRecording) camera.current?.stopRecording();
    setIsRecording(false);
  };

  if (hasPermissions === null) return <Text>Requesting permissions</Text>;
  if (hasPermissions === false) return <Text>No access to camera</Text>;

  return (
    <View style={styles.page}>
      <Camera
        ref={camera}
        style={styles.camera}
        type={cameraType}
        ratio="4:3"
        flashMode={flash}
        onCameraReady={() => setIsCameraReady(true)}
      />

      <View style={[styles.buttonContainer, { top: 25 }]}>
        <MaterialIcons name="close" size={30} color={colors.white} />
        <Pressable onPress={flipFlash}>
          <MaterialIcons
            name={flashModeIcons[flash]}
            size={30}
            color={colors.white}
          />
        </Pressable>
        <MaterialIcons name="settings" size={30} color={colors.white} />
      </View>

      <View style={[styles.buttonContainer, { bottom: 25 }]}>
        <MaterialIcons name="photo-library" size={30} color={colors.white} />

        {isCameryReady && (
          <Pressable
            onPress={takePicture}
            onLongPress={startRecording}
            onPressOut={stopRecording}
          >
            <View
              style={[
                styles.circle,
                { backgroundColor: isRecording ? colors.red : colors.white },
              ]}
            />
          </Pressable>
        )}

        <Pressable
          onPress={() =>
            setCameraType(
              cameraType === CameraType.back
                ? CameraType.front
                : CameraType.back
            )
          }
        >
          <MaterialIcons
            name="flip-camera-ios"
            size={30}
            color={colors.white}
          />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: colors.black,
  },
  camera: {
    width: "100%",
    aspectRatio: 3 / 4,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",

    position: "absolute",
  },
  circle: {
    width: 75,
    aspectRatio: 1,
    borderRadius: 75,
    backgroundColor: colors.white,
  },
});

export default PostUploadScreen;
