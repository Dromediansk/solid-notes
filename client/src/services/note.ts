type CreateNoteBody = {
  text: string;
};

export const fetchNotes = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_HOST}/api/notes`,
      { credentials: "include", method: "get" }
    );
    return await response.json();
  } catch (error) {
    console.error("Error fetching notes: ", error);
  }
};

export const createNote = async (body: CreateNoteBody) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_HOST}/api/notes`,
      {
        credentials: "include",
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    );
    return await response.json();
  } catch (error) {
    console.error("Error creating note: ", error);
  }
};

export const deleteNote = async (noteId: string) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_HOST}/api/notes?noteId=${noteId}`,
      {
        credentials: "include",
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error deleting note: ", error);
  }
};
