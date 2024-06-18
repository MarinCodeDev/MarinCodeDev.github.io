import {createApp, ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
const App = {
    data() {
        const storageData = this.load();
        
        console.log("storageData", storageData);
        return {
            page: "notes",
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
                this.notes.push(
                    {
                        message: this.newNote,
                        done: false
                    });

                this.newNote = ""
                this.save()
            }
        },

        startEdit(note){
            note.edition = true
        },

        endEdit(note){
            note.edition = false
        },

        removeNote(index) {
            this.trashes.push(this.notes[index]);
            this.notes.splice(index, 1);
            this.save()
        },

        removeAllNote() {
            this.trashes = this.trashes.concat(this.notes);
            this.notes = [];
            this.save()
        },

        removeDoneNote() {
            var noteDone = this.notes.filter((note) => note.done == true);
            this.notes = this.notes.filter((note) => note.done == false);
            this.trashes = this.trashes.concat(noteDone);
            this.save()
        },

        removeTrash(index) {
            this.trashes.splice(index, 1);
            this.save()
        },

        removeAllTrash() {
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

    }
}

createApp(App).mount('#app')

