import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const MoodButton = ({ mood, selectedMood, onPress, moodColors }) => {
  const getMoodText = (moodString) => {
    if (moodString && moodString.length > 0) {
      return moodString.charAt(0).toUpperCase() + moodString.slice(1);
    }
    return "";
  };

  return (
    <TouchableOpacity
      style={[
        styles.moodButton,
        {
          backgroundColor: moodColors[mood],
          borderWidth: selectedMood === mood ? 2 : 0,
          borderColor: "black",
        },
      ]}
      onPress={onPress}
    >
      <Text>{getMoodText(mood)}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  moodButton: {
    padding: 8,
    borderRadius: 5,
    marginHorizontal: 5,
  },
});

export default MoodButton;
