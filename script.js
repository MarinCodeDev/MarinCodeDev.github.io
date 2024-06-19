import { createApp, ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
const App = {
    data() {
        const storageData = this.load();

        console.log("storageData", storageData);
        return {
            page: "notes",
            histories: [],

            notes: storageData.notes,
            trashes: storageData.trashes,

            newNote: ""
        }
    },

    methods: {
        goToNotes() {
            this.page = "notes"
        },
        goToTrash() {
            this.page = "trash"
        },
        goToNew() {
            this.page = "new"
        },

        addNote() {
            if (this.newNote != "") {
                this.keepHistory()
                this.notes.push(
                    {
                        message: this.newNote,
                        done: false
                    });

                this.newNote = ""
                this.save()
            }
        },

        checkRefresh() {
            this.keepHistory();
            this.save();
        },

        startEdit(note) {
            this.keepHistory();
            note.edition = true
        },

        endEdit(note) {
            note.edition = false
        },

        removeNote(index) {
            this.keepHistory();
            this.trashes.push(this.notes[index]);
            this.notes.splice(index, 1);
            this.save()
        },

        removeAllNote() {
            this.keepHistory();
            this.trashes = this.trashes.concat(this.notes);
            this.notes = [];
            this.save()
        },

        removeDoneNote() {
            this.keepHistory();
            var noteDone = this.notes.filter((note) => note.done == true);
            this.notes = this.notes.filter((note) => note.done == false);
            this.trashes = this.trashes.concat(noteDone);
            this.save()
        },

        removeTrash(index) {
            this.keepHistory();
            this.trashes.splice(index, 1);
            this.save()
        },

        removeAllTrash() {
            this.keepHistory();
            this.trashes = [];
            this.save()
        },

        save() {
            window.localStorage.setItem("trashes", JSON.stringify(this.trashes));
            window.localStorage.setItem("notes", JSON.stringify(this.notes));
        },

        loadItem(itemId) {
            let values = window.localStorage.getItem(itemId);
            return values ? JSON.parse(values) : [];
        },

        load() {
            return {
                trashes: this.loadItem("trashes"),
                notes: this.loadItem("notes"),
            };
        },

        keepHistory() {
            this.histories.splice(0, 0, {
                trashesJson: JSON.stringify(this.trashes),
                notesJson: JSON.stringify(this.notes)
            });
        },

        restoreHistory() {
            if (!this.hasHistory()) {
                return;
            }

            //            this.histories[0];
            var history = (this.histories.splice(0, 1))[0];

            this.trashes = JSON.parse(history.trashesJson);
            this.notes = JSON.parse(history.notesJson);
        },

        hasHistory() {
            return Boolean(this.histories.length);
        }

    }
}

createApp(App).mount('#app')

