import { useState, useRef } from "react";
import {
  View,
  Image,
  FlatList,
  useWindowDimensions,
  TouchableWithoutFeedback,
  ViewabilityConfig,
  ViewToken,
} from "react-native";
import DoublePressable from "../DoublePressable";
import colors from "../../theme/colors";

interface ICarousel {
  images: string[];
  onDoublePress?: () => void;
}

const Carousel = ({ images, onDoublePress }: ICarousel) => {
  const { width } = useWindowDimensions();
  const [activeIndex, setActiveIndex] = useState(0);

  const viewabilityConfig: ViewabilityConfig = {
    itemVisiblePercentThreshold: 51,
  };

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: Array<ViewToken> }) => {
      if (viewableItems.length > 0) {
        setActiveIndex(viewableItems[0].index || 0);
      }
    }
  );

  return (
    <View>
      <FlatList
        data={images}
        renderItem={({ item }) => (
          <TouchableWithoutFeedback onPress={() => {}}>
            <DoublePressable onDoublePress={onDoublePress}>
              <Image source={{ uri: item }} style={{ width, aspectRatio: 1 }} />
            </DoublePressable>
          </TouchableWithoutFeedback>
        )}
        horizontal={true}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged.current}
        viewabilityConfig={viewabilityConfig}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          position: "absolute",
          bottom: 0,
          width: "100%",
        }}
      >
        {images.map((_, index) => (
          <View
            key={index}
            style={{
              width: 10,
              aspectRatio: 1,
              borderRadius: 5,
              backgroundColor:
                index === activeIndex ? colors.primary : colors.white,
              margin: 10,
              marginHorizontal: 5,
            }}
          />
        ))}
      </View>
    </View>
  );
};

export default Carousel;
