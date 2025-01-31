import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit,
  OnChanges,
  DoCheck,
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked,
  OnDestroy,
} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notes',
  standalone: false,
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css'],
})
export class NotesComponent
  implements
    OnInit,
    OnChanges,
    DoCheck,
    AfterContentInit,
    AfterContentChecked,
    AfterViewInit,
    AfterViewChecked,
    OnDestroy
{
  @Input() projectTitle?: string;
  @Output() OnEdit = new EventEmitter<string>();

  notes: string[] = [];
  username:string=''; 
  newNote: string = '';
  editModeIndex: number | null = null; // To track which note is being edited
  editedNote: string = '';
  constructor(private router: Router) {
    if (!localStorage.getItem('isLoggedIn')) {
      this.router.navigate(['/login']);
    }
    const savedNotes = localStorage.getItem('notes');
    this.notes = savedNotes ? JSON.parse(savedNotes) : [];
  }

  ngOnInit() {
    console.log(
      'ngOnInit: Component initialized with inputs:');
      this.projectTitle,
      this.username = sessionStorage.getItem('username') || '';
      if(this.username){
        const userNotes =localStorage.getItem(this.username);
        if(userNotes){
          this.notes = JSON.parse(userNotes).notes;
        }

      }
    
  }

  ngOnChanges() {
    if (this.projectTitle) {
      console.log('ngOnChanges: Inputs have changed:', this.projectTitle);
    }
  }

  ngDoCheck() {
    console.log('ngDoCheck: Change detection run');
  }

  ngAfterContentInit() {
    console.log('ngAfterContentInit: Content initialized');
  }

  ngAfterContentChecked() {
    console.log('ngAfterContentChecked: Content checked for changes');
  }

  ngAfterViewInit() {
    console.log('ngAfterViewInit: View initialized');
  }

  ngAfterViewChecked() {
    console.log('ngAfterViewChecked: View checked for changes');
  }

  ngOnDestroy() {
    console.log('ngOnDestroy: Component about to be destroyed');
  }

  addNote() {
    if (this.newNote.trim()) {
      this.notes.unshift(this.newNote.trim());
      console.log('New note added:', this.newNote);
      this.newNote = '';
      this.saveNotes();
    } else {
      console.log('Action is disabled');
    }
  }

  editNote(index: number) {
    this.editModeIndex = index; // Set the current note to edit mode
    this.editedNote = this.notes[index]; // Set the current content in editable field
  }

  saveEditedNote() {
    if (this.editedNote.trim() !== '') {
      if (this.editModeIndex !== null) {
        this.notes[this.editModeIndex] = this.editedNote.trim(); // Save updated content
        this.saveNotes(); // Save notes to persistence layer
      }
      this.editModeIndex = null; // Exit edit mode
      this.ngOnChanges(); // Trigger Angular lifecycle hooks if needed
      this.ngDoCheck(); // Check for changes
    }
  }

  cancelEdit() {
    this.editModeIndex = null; // Exit edit mode without saving
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

  handleClick() {
    this.addNote();
  }
}
