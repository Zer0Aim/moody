import { StyleSheet, View, Text, Pressable } from "react-native";
import React, { useContext } from "react";
import { MoodContext } from "../context/moodContext";

// const moodColors = {
//   awful: "#FFB6C1",
//   bad: "#FFDAB9",
//   fine: "#FFFACD",
//   good: "#ADD8E6",
//   great: "#90EE90",
// };

function EntryItem(props) {
  const { moodColors } = useContext(MoodContext);

  return (
    <View
      style={[styles.entryItem, { backgroundColor: moodColors[props.mood] }]}
    >
      <Pressable
        android_ripple={{ color: "#210644" }}
        style={({ pressed }) => pressed && styles.pressedItem}
        onPress={props.onPress}
      >
        <Text style={styles.entryText}>{props.text}</Text>
      </Pressable>
    </View>
  );
}

export default EntryItem;

const styles = StyleSheet.create({
  entryItem: {
    marginTop: 5,
    borderRadius: 6,
  },
  pressedItem: {
    opacity: 0.5,
  },
  entryText: {
    color: "#210644",
    padding: 8,
  },
});
