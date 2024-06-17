// const { createApp, ref } = Vue

//   createApp({
//     setup() {
//       const message = ref('Hello vue!')
//       return {
//         message
//       }
//     }
//   }).mount('#app')

const App = {
    data() {
        return {
            page: "notes",
            notes: [],

            trashes: [
                { message: "Trash note", done: true },
            ],

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
            }
        },
        removeNote(index) {
            this.notes.splice(index, 1);
        },

        removeAllNote() {
            this.notes = [];
        },

        removeDoneNote() {
            this.notes = this.notes.filter((note) => note.done == false)
        },

        addTrash() {
            this.trashes.push(
                {
                    message: this.newNote,
                    done: false
                });

            this.newNote = ""
        },

        removeTrash(index) {
            this.trashes.splice(index, 1);
        },

        removeAllTrash() {
            this.trashes = [];
        },

    }
}

Vue.createApp(App).mount('#app')

