# Created with GrishteSync
# https://suryasticsai.github.io/GrishteSync
# Suryasticsai | suryasticsai@gmail.com
const createForm = document.getElementById("create-form");
const readBtn = document.getElementById("read-btn");
const updateForm = document.getElementById("update-form");
const deleteForm = document.getElementById("delete-form");
const entriesDiv = document.getElementById("entries");

let entries = [];

// Create entry
createForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;
    const newEntry = { title, content, id: entries.length + 1 };
    entries.push(newEntry);
    createForm.reset();
    displayEntries();
});

// Read entries
readBtn.addEventListener("click", displayEntries);

// Display entries
function displayEntries() {
    entriesDiv.innerHTML = "";
    entries.forEach((entry) => {
        const entryHTML = `
            <div>
                <h3>${entry.title}</h3>
                <p>${entry.content}</p>
                <button id="update-${entry.id}">Update</button>
                <button id="delete-${entry.id}">Delete</button>
            </div>
        `;
        entriesDiv.insertAdjacentHTML("beforeend", entryHTML);
        const updateBtn = document.getElementById(`update-${entry.id}`);
        const deleteBtn = document.getElementById(`delete-${entry.id}`);
        updateBtn.addEventListener("click", () => updateEntry(entry.id));
        deleteBtn.addEventListener("click", () => deleteEntry(entry.id));
    });
}

// Update entry
updateForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const id = document.getElementById("update-id").value;
    const title = document.getElementById("update-title").value;
    const content = document.getElementById("update-content").value;
    const updatedEntry = { title, content, id: parseInt(id) };
    entries = entries.map((entry) => (entry.id === updatedEntry.id ? updatedEntry : entry));
    updateForm.reset();
    displayEntries();
});

// Delete entry
deleteForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const id = document.getElementById("delete-id").value;
    entries = entries.filter((entry) => entry.id !== parseInt(id));
    deleteForm.reset();
    displayEntries();
});

// Update entry
function updateEntry(id) {
    const entry = entries.find((entry) => entry.id === id);
    if (entry) {
        document.getElementById("update-title").value = entry.title;
        document.getElementById("update-content").value = entry.content;
        document.getElementById("update-id").value = entry.id;
    }
}

// Delete entry
function deleteEntry(id) {
    const confirmDelete = confirm(`Are you sure you want to delete entry ${id}?`);
    if (confirmDelete) {
        entries = entries.filter((entry) => entry.id !== id);
        displayEntries();
    }
}
