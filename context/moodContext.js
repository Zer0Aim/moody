import { createContext, useState } from "react";

export const MoodContext = createContext();

export const MoodProvider = ({ children }) => {
  const [courseEntries, setCourseEntries] = useState([]);
  const [entriesBackgroundColor, setEntriesBackgroundColor] =
    useState("#FFFACD");

  const addEntry = (enteredEntryText, mood) => {
    setCourseEntries((currentCourseEntries) => [
      ...currentCourseEntries,
      { text: enteredEntryText, id: Math.random().toString(), mood: mood },
    ]);
    setEntriesBackgroundColor(moodColors[mood]);
  };

  const deleteEntry = (entryId) => {
    setCourseEntries((currentCourseEntries) =>
      currentCourseEntries.filter((entry) => entry.id != entryId)
    );
  };

  const updateEntry = (entryId, updatedText, updatedMood) => {
    setCourseEntries((currentCourseEntries) =>
      currentCourseEntries.map((entry) =>
        entry.id === entryId
          ? { ...entry, text: updatedText, mood: updatedMood }
          : entry
      )
    );
  };

  const moodColors = {
    awful: "#FFB6C1",
    bad: "#FFDAB9",
    fine: "#FFFACD",
    good: "#ADD8E6",
    great: "#90EE90",
  };

  return (
    <MoodContext.Provider
      value={{
        courseEntries,
        setCourseEntries,
        entriesBackgroundColor,
        setEntriesBackgroundColor,
        addEntry,
        deleteEntry,
        updateEntry,
        moodColors,
      }}
    >
      {children}
    </MoodContext.Provider>
  );
};
