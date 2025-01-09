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
  newNote: string = '';

 constructor() {
    console.log('NotesComponent constructor called');
    const savedNotes = localStorage.getItem('notes');
    this.notes = savedNotes ? JSON.parse(savedNotes) : [];
  }

  ngOnInit() {
    console.log('ngOnInit: Component initialized with inputs:', this.projectTitle);
  }


  ngOnChanges() {
    if (this.projectTitle) {
      console.log('ngOnChanges: Inputs have changed:', this.projectTitle);
    }
  }

  ngDoCheck() {
    if(this.editNote){
    console.log('ngDoCheck: Change detection run:',this.editNote);
    }
  }

  ngAfterContentInit() {
    console.log('ngAfterContentInit: Content initialized');
  }

  ngAfterContentChecked() {
    // Runs every time this component content has been checked for changes.
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

  expandedNoteIndex: number | null = null; 

  editNote(index: number) {
    const updatedNote = prompt('Edit your note:', this.notes[index]);
    if (updatedNote !== null && updatedNote.trim() !== '') {
      this.notes[index] = updatedNote.trim();
      this.saveNotes();
    }
    this.ngOnChanges();// Call ngOnChanges after updating the note 
    this.ngDoCheck();// Call ngDoCheck for checking the chage are happen in the code
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
