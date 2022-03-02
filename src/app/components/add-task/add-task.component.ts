import { Subscription } from 'rxjs';
import { UiService } from './../../services/ui.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})
export class AddTaskComponent implements OnInit {
  constructor(private uiService: UiService) {
    this.subscription = this.uiService
      .onToggle()
      .subscribe((value) => (this.showAddTask = value));
  }

  @Output()
  onAddTask: EventEmitter<any> = new EventEmitter();

  text!: string;
  day!: string;
  reminder: boolean = false;
  showAddTask!: boolean;
  subscription: Subscription;

  ngOnInit(): void {}

  onSubmit() {
    if (!this.text) {
      alert('Please add task');
      return;
    }

    const newTask = {
      text: this.text,
      day: this.day,
      reminder: this.reminder,
    };

    // Emit event to the parent
    this.onAddTask.emit(newTask);

    (this.text = ''), (this.day = ''), (this.reminder = false);
  }
}
