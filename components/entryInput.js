import {
  View,
  TextInput,
  Button,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import React, { useContext, useState } from "react";
import { MoodContext } from "../context/moodContext";
import MoodButton from "./moodButton";

// const moodColors = {
//   awful: "#FFB6C1",
//   bad: "#FFDAB9",
//   fine: "#FFFACD",
//   good: "#ADD8E6",
//   great: "#90EE90",
// };

function EntryInput(props) {
  const [enteredEntryText, setEnteredEntryText] = useState("");
  const [selectedMood, setSelectedMood] = useState("fine");
  const [textInputHeight, setTextInputHeight] = useState(48);

  const { moodColors, addEntry } = useContext(MoodContext);

  function entryInputHandler(enteredText) {
    setEnteredEntryText(enteredText);
  }

  function addEntryHandler() {
    // props.onAddEntry(enteredEntryText, selectedMood);

    addEntry(enteredEntryText, selectedMood);
    setEnteredEntryText("");
    setTextInputHeight(48);
  }

  return (
    <Modal visible={props.visible} animationType="slide">
      <View
        style={[
          styles.inputContainer,
          { backgroundColor: moodColors[selectedMood] },
        ]}
      >
        <Text style={styles.moodQuestion}>How are you feeling right now?</Text>
        <View style={styles.moodSelection}>
          {Object.keys(moodColors).map((mood) => (
            <MoodButton
              // key={mood}
              // style={[
              //   styles.moodButton,
              //   {
              //     backgroundColor: moodColors[mood],
              //     borderWidth: selectedMood === mood ? 2 : 0,
              //     borderColor: "black",
              //   },
              // ]}
              // onPress={() => setSelectedMood(mood)}
              // moodColors={moodColors}

              key={mood}
              mood={mood}
              selectedMood={selectedMood}
              onPress={() => setSelectedMood(mood)}
              moodColors={moodColors}
            >
              <Text>{mood.charAt(0).toUpperCase() + mood.slice(1)}</Text>
            </MoodButton>
          ))}
        </View>
        <TextInput
          placeholder="What's on your mind?"
          onChangeText={entryInputHandler}
          value={enteredEntryText}
          style={[styles.textInput, { height: textInputHeight }]}
          multiline={true}
          textAlignVertical="top"
          onContentSizeChange={(event) => {
            setTextInputHeight(event.nativeEvent.contentSize.height);
          }}
        />
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button title="Cancel" onPress={props.onCancel} color="#b9cfd5" />
          </View>
          <View style={styles.button}>
            <Button title="Post" onPress={addEntryHandler} color="#5F909F" />
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default EntryInput;

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  moodQuestion: {
    fontSize: 18,
    marginBottom: 10,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#F6EFDD",
    backgroundColor: "#F6EFDD",
    color: "#120438",
    borderRadius: 6,
    width: "80%",
    padding: 16,
    marginTop: 10,
  },
  buttonContainer: {
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  button: {
    width: 100,
  },
  moodSelection: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 10,
  },
  moodButton: {
    padding: 8,
    borderRadius: 5,
    marginHorizontal: 5,
  },
});
