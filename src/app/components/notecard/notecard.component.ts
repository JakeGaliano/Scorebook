import { Component, OnInit } from '@angular/core';
import { Note } from 'src/app/components/note';

@Component({
  selector: 'app-notecard',
  templateUrl: './notecard.component.html',
  styleUrls: ['./notecard.component.css']
})

export class NotecardComponent implements OnInit {

  notes: Note[] = [];
  idArray: number[] = [];
  previousNote: Note | undefined;
  placeholders = [
  'Put some points on the board!',
  'Get off the sidelines!',
  'Take off the gloves and get typing!',
  `Don't throw in the towel!`,
  `Hit 'em with the one-two punch!`,
  'Get the ball rolling!',
  `We're in your corner!`,
  'You can go the distance!',
  'Breeze by the chicane!',
  'The ball is in your court!',
  'Blow the competition away!',
  'Give it your best shot!',
  'Settle the score!'
  ];

  constructor() {}

  ngOnInit(): void {
    /* reset arrays every time the page is refreshed (data need not persist between refreshes) */
    this.notes = [];
    this.idArray = [];
    this.previousNote = undefined;
  }

  addNewNote() {
    let newNote = {} as Note;

    /* set the note's id based on the current id's in the idArray */
    if(this.notes.length <= 0) {
      newNote.id = 1;
      this.idArray.push(newNote.id);
    } else {
      newNote.id = (Math.max(...this.idArray) + 1);
      this.idArray.push(newNote.id);
    }

    /* set value as false because content has not yet been added to the note
    and add note to the notes array */
    newNote.editable = true;
    newNote.selected = false;
    this.notes.push(newNote);

  }

  removeNote(note: any) {
    const index = this.notes.indexOf(note);
    const id = note['id'];

    /* remove the note from the notes array */
    this.notes.splice(index, 1);

    /* remove the note's id from the idArray so that each new node has the correct id */
    if(this.idArray.includes(id)) {
      this.idArray.splice(this.idArray.indexOf(id), 1);
    }
  }

  editNote(note: any) {
    note.editable = true;
  }

  saveNote(note: any) {
    note.editable = false;
  }

  checkEditable(note: any) {
    /* check if note is edtiable or not */
    if(note.editable === true) {
      return true;
    } else {
      return false;
    }
  }

  selectedNote(note: any) {
    /* set note as editable or not */
    if(note.selected == false) {
      note.selected = true;
    } else {
      note.selected = false;
    }

    /* set previous note as the current note if the previous note does not exist or if it is not selected */
    if(this.previousNote == undefined || this.previousNote.selected == false) {
      this.previousNote = note;
      return;
    }

    /* logic to see if previous note and current note are selected in order to switch their places in the
    notes array */
    if(this.previousNote != null && note.selected == true && this.previousNote.selected == true) {
      let previousIndex = this.notes.indexOf(this.previousNote);
      let currentIndex = this.notes.indexOf(note);
      this.notes.splice(previousIndex, 1, note)
      this.notes.splice(currentIndex, 1, this.previousNote);
      this.previousNote.selected = false;
      this.previousNote = undefined;
      note.selected = false;
    }
  }

  checkSelected(note: any) {
    /* check to see if current note is selected */
    if(note.selected === true) {
      return true;
    } else {
      return false;
    }
  }

  getRandomPlaceholder() {
    /* select random placeholder from the placeholder array for each note */
    let random = Math.floor(Math.random() * 12);
    return this.placeholders[random];
  }
}
