import { CommonModule } from '@angular/common';
import { Component, Input, output, input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-inputs',
    imports: [FormsModule, CommonModule],
    templateUrl: './inputs.component.html',
    styleUrl: './inputs.component.css'
})
export class InputsComponent {
  readonly inputId = input<string>('');  // To set a unique id for each input
  readonly type = input<string>('text'); // Default input type is text
  readonly placeholder = input<string>(''); // Placeholder for input
  @Input() label: string = ''; // Optional label for the input
  @Input() value: any; // The value passed to the input field
  readonly options = input<Array<any>>([]);  // Array of options
  readonly isRequired = input<boolean>(false);
  readonly isDisabled = input<boolean>(false);
  readonly defaultPlaceholder = input<string>('');
  readonly maxLength = input<string>('');

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
    if (this.type() === 'number') {
      // Allow special keys: backspace, arrow keys, delete, etc.
      const allowedKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Delete'];
      if (allowedKeys.includes(event.key)) {
        return; // Allow the action for these keys
      }

      // Check if the input length exceeds or equals the max length
      if (this.value.length >= this.maxLength() && !allowedKeys.includes(event.key)) {
        event.preventDefault(); // Prevent any further typing
      }
    }
  }

}
