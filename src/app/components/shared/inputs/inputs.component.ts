import { CommonModule } from '@angular/common';
import { Component, Input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-inputs',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './inputs.component.html',
  styleUrl: './inputs.component.css'
})
export class InputsComponent {
  @Input() inputId: string = '';  // To set a unique id for each input
  @Input() type: string = 'text'; // Default input type is text
  @Input() placeholder: string = ''; // Placeholder for input
  @Input() label: string = ''; // Optional label for the input
  @Input() value: any; // The value passed to the input field
  @Input() options: Array<any> = [];  // Array of options
  @Input() isRequired: boolean = false;
  @Input() isDisabled: boolean = false;
  @Input() defaultPlaceholder: string = '';
  @Input() maxLength: string = '';

  valueChange = output<any>(); // Emit changes to the parent component

  showPassword: boolean = false; // Flag to toggle password visibility

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword; // Toggle the password visibility
  }

  // Emit changes when the input value changes
  onValueChange() {
    this.valueChange.emit(this.value);
  }

  // Prevent additional input if the value has already reached 11 digits
  preventOverLimit(event: KeyboardEvent) {
    if (this.type === 'number') {
      // Allow special keys: backspace, arrow keys, delete, etc.
      const allowedKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Delete'];
      if (allowedKeys.includes(event.key)) {
        return; // Allow the action for these keys
      }

      // Check if the input length exceeds or equals the max length
      if (this.value.length >= this.maxLength && !allowedKeys.includes(event.key)) {
        event.preventDefault(); // Prevent any further typing
      }
    }
  }

}
