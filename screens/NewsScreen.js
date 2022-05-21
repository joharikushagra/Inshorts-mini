import {
  View,
  Text,
  useWindowDimensions,
  Dimensions,
  StyleSheet,
} from "react-native";
import React, { useContext, useState } from "react";
import Carousel from "react-native-snap-carousel";
import { NewsContext } from "../Apis/context";
import SingleNews from "../components/SingleNews";

const NewsScreen = () => {
  const {
    news: { articles },
  } = useContext(NewsContext);
  const windowHeight = Dimensions.get("window").height;
  const [activeIndex, setActiveIndex] = useState();
  return (
    <View style={styles.carousel}>
      {articles && (
        <Carousel
          layout={"stack"}
          data={articles.slice(0, 10)}
          sliderHeight={300}
          itemHeight={windowHeight}
          vertical={true}
          renderItem={({ item, index }) => (
            <SingleNews item={item} index={index} />
          )}
          onSnapToItem={(index) => setActiveIndex(index)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  carousel: {
    flex: 1,
    transform: [{ scaleY: -1 }],
    backgroundColor: "black",
  },
});

export default NewsScreen;
