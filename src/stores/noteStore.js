import { defineStore } from 'pinia';

export const useNoteStore = defineStore('note', {
  state: () => ({
    note: '',
  }),
  actions: {
    async fetchNote(id) {
      try {
        const response = await fetch(`http://62.72.5.95:1999/notes/${id}`);
        if (response.ok) {
          this.note = await response.json();
          //console.log(this.note);
        } else {
          console.error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
     async deleteNote() {
       if (!this.note?._id) return;
       try {
         const response = await fetch(`http://62.72.5.95:1999/notes/${this.note._id}`, { method: 'DELETE' });
         if (response.ok) {
           this.note = null;
           //console.log(this.note);

           console.log('Note deleted successfully');
         } else {
       console.error('Failed to delete note');
         }
       } catch (error) {
         console.error('Error deleting note:', error);
     }
       }
  }
});
