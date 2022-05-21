import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from "react-native";
import { NewsContext } from "../Apis/context";
import React, { useContext, useState } from "react";
import { Entypo } from "@expo/vector-icons";
import SingleNews from "./SingleNews";

const Search = () => {
  const {
    news: { articles },
    darkTheme,
  } = useContext(NewsContext);
  const [searchResults, setSearchResults] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentNews, setCurrentNews] = useState();
  const handleSearch = (text) => {
    if (!text) {
      setSearchResults([]);
      return;
    }

    setSearchResults(articles.filter((query) => query.title.includes(text)));
  };

  const handleModal = (n) => {
    setModalVisible(true);
    setCurrentNews(n);
  };

  return (
    <View style={{ width: "100%", position: "relative" }}>
      <TextInput
        onChangeText={(text) => handleSearch(text)}
        placeholder="Search for news"
        placeholderTextColor={darkTheme ? "white" : "grey"}
        style={{
          ...styles.search,
          backgroundColor: darkTheme ? "black" : "lightgrey",
          color: darkTheme ? "white" : "black",
        }}
      />
      <View style={styles.searchResults}>
        {searchResults.slice(0, 10).map((n) => (
          <TouchableOpacity
            key={n.title}
            activeOpacity={0.7}
            onPress={() => handleModal(n)}
          >
            <Text
              style={{
                ...styles.singleResult,
                backgroundColor: darkTheme ? "black" : "white",
                color: darkTheme ? "white" : "black",
              }}
            >
              {n.title}ab
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <TouchableOpacity
          onPress={() => setModalVisible(!modalVisible)}
          style={{
            position: "absolute",
            zIndex: 2,
            right: 0,
            margin: 10,
            marginTop: 60,
          }}
        >
          <Entypo name="circle-with-cross" size={30} color="white" />
        </TouchableOpacity>
        <View style={{ height: "100%", transform: [{ scaleY: -1 }] }}>
          <SingleNews item={currentNews} />
        </View>
      </Modal>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  search: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    fontSize: 15,
    marginBottom: 15,
  },
  searchResults: {
    position: "absolute",
    zIndex: 1,
    height: 100,
    top: 50,
  },
  singleResult: {
    borderRadius: 5,
    padding: 10,
    margin: 0.5,
    shadowColor: "black",
    elevation: 5,
  },
});
