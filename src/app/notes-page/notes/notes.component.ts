import { Component, EventEmitter, Input,Output } from '@angular/core';

@Component({
  selector: 'app-notes',
  standalone: false,
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.css'

})
export class NotesComponent {

  @Input() projectTitle?: string
  @Output() OnEdit = new EventEmitter<string>()

  notes: string[] = [];
  newNote: string = '';
  constructor() {
    // Load notes from local storage
    const savedNotes = localStorage.getItem('notes');
    if (savedNotes) {
      this.notes = JSON.parse(savedNotes);
    }
  }

  addNote() {
    if (this.newNote.trim()) {
      this.notes.push(this.newNote.trim());
      this.newNote = '';
      this.saveNotes();
    }
  }

  editNote(index: number) {
    const updatedNote = prompt('Edit your note:', this.notes[index]);
    if (updatedNote !== null && updatedNote.trim() !== '') {
      this.notes[index] = updatedNote.trim();
      this.saveNotes();
    }
  }

  deleteNote(index: number) {
    if (confirm('Are you sure you want to delete this note?')) {
      this.notes.splice(index, 1);
      this.saveNotes();
    }
  }

  saveNotes() {
    localStorage.setItem('notes', JSON.stringify(this.notes));
  }

}
