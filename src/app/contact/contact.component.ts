import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  standalone:true,
  imports:[FormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatTooltipModule,CommonModule]
})
export class ContactComponent {
  contact = {
    name: '',
    email: '',
    message: ''
  };
  submitted = false;

  onSubmit(): void {
    if (this.contact.name && this.contact.email && this.contact.message) {
      this.submitted = false;
      console.log('Form submitted:', this.contact);

      // Reset form fields after submission
      this.contact = {
        name: '',
        email: '',
        message: ''
      };

      // Optionally reset the submitted flag
      this.submitted = true;
      
    }
  }
}
