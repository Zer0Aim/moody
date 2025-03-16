import { useContext, useState } from "react";
import {
  View,
  FlatList,
  Button,
  ScrollView,
  StyleSheet,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";

import EntryInput from "./components/entryInput";
import EntryItem from "./components/entryItem";
import MoodButton from "./components/moodButton";

import { MoodContext, MoodProvider } from "./context/moodContext";

// const moodColors = {
//   awful: "#FFB6C1",
//   bad: "#FFDAB9",
//   fine: "#FFFACD",
//   good: "#ADD8E6",
//   great: "#90EE90",
// };

export default function App() {
  return (
    <MoodProvider>
      <AppContent />
    </MoodProvider>
  );
}

function AppContent() {
  const {
    courseEntries,
    entriesBackgroundColor,
    addEntry,
    deleteEntry,
    updateEntry,
    moodColors,
  } = useContext(MoodContext);

  const [modalIsVisible, setModalIsVisible] = useState(false);
  // const [courseEntries, setCourseEntries] = useState([]);
  // const [entriesBackgroundColor, setEntriesBackgroundColor] =
  //   useState("#FFFACD");
  const [openEntry, setOpenEntry] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedText, setEditedText] = useState("");
  const [editedMood, setEditedMood] = useState("fine");
  const [editTextInputHeight, setEditTextInputHeight] = useState(48);

  function startAddEntryHandler() {
    setModalIsVisible(true);
  }

  function endAddEntryHandler() {
    setModalIsVisible(false);
  }

  function addEntryHandler(enteredEntryText, mood) {
    // setCourseEntries((currentCourseEntries) => [
    //   ...currentCourseEntries,
    //   { text: enteredEntryText, id: Math.random().toString(), mood: mood },
    // ]);
    // setEntriesBackgroundColor(moodColors[mood]);
    // endAddEntryHandler();

    addEntry(enteredEntryText, mood);
    endAddEntryHandler();
  }

  function openEntryHandler(entry) {
    setOpenEntry(entry);
    setEditedText(entry.text);
    setEditedMood(entry.mood);
    setIsEditMode(false);
  }

  function closeEntryHandler() {
    setOpenEntry(null);
    setIsEditMode(false);
  }

  function deleteEntryHandler(entryId) {
    // setCourseEntries((currentCourseEntries) =>
    //   currentCourseEntries.filter((entry) => entry.id !== entryId)
    // );
    // setOpenEntry(null);
    // setIsEditMode(false);

    deleteEntry(entryId);
    setOpenEntry(null);
    setIsEditMode(false);
  }

  function startEditEntryHandler() {
    setIsEditMode(true);
  }

  function saveEditedEntryHandler() {
    // setCourseEntries((currentCourseEntries) =>
    //   currentCourseEntries.map((entry) =>
    //     entry.id === openEntry.id
    //       ? { ...entry, text: editedText, mood: editedMood }
    //       : entry
    //   )
    // );
    // setOpenEntry({ ...openEntry, text: editedText, mood: editedMood });
    // setIsEditMode(false);

    updateEntry(openEntry.id, editedText, editedMood);
    setOpenEntry({ ...openEntry, text: editedText, mood: editedMood });
    setIsEditMode(false);
  }

  function editTextInputHandler(enteredText) {
    setEditedText(enteredText);
  }

  function handleEditTextInputContentSizeChange(event) {
    setEditTextInputHeight(event.nativeEvent.contentSize.height);
  }

  return (
    <ScrollView>
      <View style={styles.appContainer}>
        <View style={styles.buttonContainer}>
          <Button
            title="What's on your mind?"
            color="#5F909F"
            onPress={startAddEntryHandler}
          />
        </View>
        <EntryInput
          visible={modalIsVisible}
          onAddEntry={addEntryHandler}
          onCancel={endAddEntryHandler}
        />
        <View
          style={[
            styles.entriesContainer,
            { backgroundColor: entriesBackgroundColor },
          ]}
        >
          <FlatList
            data={courseEntries}
            renderItem={(itemData) => {
              return (
                <EntryItem
                  text={itemData.item.text}
                  id={itemData.item.id}
                  mood={itemData.item.mood}
                  onPress={() => openEntryHandler(itemData.item)}
                />
              );
            }}
            keyExtractor={(item, index) => {
              return item.id;
            }}
            alwaysBounceVertical={false}
          />
        </View>
      </View>
      <Modal visible={openEntry !== null} animationType="slide">
        <View
          style={[
            styles.modalContainer,
            {
              backgroundColor: isEditMode
                ? moodColors[editedMood]
                : openEntry
                ? moodColors[openEntry.mood]
                : "white",
            },
          ]}
        >
          {openEntry && (
            <View>
              {isEditMode ? (
                <View>
                  <TextInput
                    style={[
                      styles.modalTextInput,
                      { height: editTextInputHeight },
                    ]}
                    value={editedText}
                    onChangeText={editTextInputHandler}
                    multiline={true}
                    textAlignVertical="top"
                    onContentSizeChange={handleEditTextInputContentSizeChange}
                  />
                  <View style={styles.moodSelection}>
                    {Object.keys(moodColors).map((mood) => (
                      <MoodButton
                        // key={mood}
                        // style={[
                        //   styles.moodButton,
                        //   {
                        //     backgroundColor: moodColors[mood],
                        //     borderWidth: editedMood === mood ? 2 : 0,
                        //     borderColor: "black",
                        //   },
                        // ]}
                        // onPress={() => setEditedMood(mood)}
                        // moodColors={moodColors}

                        key={mood}
                        mood={mood}
                        selectedMood={editedMood}
                        onPress={() => setEditedMood(mood)}
                        moodColors={moodColors}
                      >
                        <Text>
                          {mood.charAt(0).toUpperCase() + mood.slice(1)}
                        </Text>
                      </MoodButton>
                    ))}
                  </View>
                  <View style={styles.modalButtonContainer}>
                    <View style={styles.modalButton}>
                      <Button
                        title="Save"
                        onPress={saveEditedEntryHandler}
                        color="#5F909F"
                      />
                    </View>
                    <View style={styles.modalButton}>
                      <Button
                        title="Cancel Edit"
                        onPress={() => setIsEditMode(false)}
                        color="#b9cfd5"
                      />
                    </View>
                  </View>
                </View>
              ) : (
                <View>
                  <Text style={styles.modalText}>{openEntry.text}</Text>
                  <Text style={styles.moodText}>
                    Feeling:{" "}
                    {openEntry.mood.charAt(0).toUpperCase() +
                      openEntry.mood.slice(1)}
                  </Text>
                  <View style={styles.modalButtonContainer}>
                    <View style={styles.modalButton}>
                      <Button
                        title="Close"
                        onPress={closeEntryHandler}
                        color="#5F909F"
                      />
                    </View>
                    <View style={styles.modalButton}>
                      <Button
                        title="Delete"
                        onPress={() => deleteEntryHandler(openEntry.id)}
                        color="#FF0000"
                      />
                    </View>
                    <View style={styles.modalButton}>
                      <Button
                        title="Edit"
                        onPress={startEditEntryHandler}
                        color="#0000FF"
                      />
                    </View>
                  </View>
                </View>
              )}
            </View>
          )}
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
    flexDirection: "column-reverse",
  },
  entriesContainer: {
    flex: 1,
    marginBottom: 20,
  },
  buttonContainer: {},
  modalContainer: {
    flex: 1,
    padding: 20,
  },
  modalContent: {
    flex: 1,
  },
  modalText: {
    fontSize: 18,
    marginTop: 30,
    marginBottom: 20,
  },
  moodText: {
    fontSize: 16,
    alignSelf: "flex-start",
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  modalButton: {
    marginHorizontal: 10,
  },
  modalTextInput: {
    borderWidth: 1,
    borderColor: "#F6EFDD",
    backgroundColor: "#F6EFDD",
    color: "#120438",
    borderRadius: 6,
    width: "80%",
    padding: 16,
    marginTop: 10,
  },
  moodSelection: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 10,
    marginTop: 10,
  },
  moodButton: {
    padding: 8,
    borderRadius: 5,
    marginHorizontal: 5,
  },
});
