import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'mbenz-form-error',
  templateUrl: './form-error.component.html',
  imports: [CommonModule],
})
export class FormErrorComponent {
  @Input() ctrl!: any;

  private ERROR_MESSAGES: ValidationErrors = {
    required: () => 'This field is required',
    min: (e: any) => `Must be at least ${e.min} characters`,
    max: (e: any) => `Must be ${e.max} characters`,
  };

  isInvalid(): boolean {
    return (this.ctrl && this.ctrl.errors && this.ctrl.touched) || false;
  }

  errorList(): string[] {
    console.log(this.ctrl.errors);
    return this.ctrl.errors
      ? Object.keys(this.ctrl.errors).map((key) =>
          this.ERROR_MESSAGES[key](this.ctrl.getError(key))
        )
      : [];
  }
}
