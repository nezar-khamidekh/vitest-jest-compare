import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { ValidationService } from '../../services/validation/validation.service';

export interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  age: number;
  bio: string;
}

@Component({
  selector: 'app-form',
  standalone: true,
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  imports: [ReactiveFormsModule],
})
export class FormComponent implements OnInit, OnDestroy {
  private readonly fb = inject(FormBuilder);
  private readonly validationService = inject(ValidationService);

  form: FormGroup;
  isSubmitted = false;
  validationErrors: { [key: string]: string[] } = {};
  private destroy$ = new Subject<void>();

  constructor() {
    this.form = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      age: [null, [Validators.required, Validators.min(18), Validators.max(120)]],
      bio: ['', [Validators.maxLength(500)]],
    });
  }

  ngOnInit(): void {
    this.form.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.clearValidationErrors();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSubmit(): void {
    this.isSubmitted = true;
    this.clearValidationErrors();

    if (this.form.valid) {
      this.processFormSubmission();
    } else {
      this.markFormGroupTouched();
      this.validateFormFields();
    }
  }

  private processFormSubmission(): void {
    const formData: FormData = this.form.value;
    console.log('Form submitted successfully:', formData);

    this.resetForm();
    this.isSubmitted = false;
  }

  private validateFormFields(): void {
    const controls = this.form.controls;

    Object.keys(controls).forEach((key) => {
      const control = controls[key];
      const value = control.value;

      if (control.errors) {
        this.validationErrors[key] = [];

        if (control.errors['required']) {
          this.validationErrors[key].push(`${this.getFieldDisplayName(key)} is required`);
        }

        if (control.errors['minlength']) {
          this.validationErrors[key].push(
            `${this.getFieldDisplayName(key)} must be at least ${
              control.errors['minlength'].requiredLength
            } characters`
          );
        }

        if (control.errors['maxlength']) {
          this.validationErrors[key].push(
            `${this.getFieldDisplayName(key)} must not exceed ${
              control.errors['maxlength'].requiredLength
            } characters`
          );
        }

        if (control.errors['email']) {
          this.validationErrors[key].push('Invalid email format');
        }

        if (control.errors['min']) {
          this.validationErrors[key].push(
            `${this.getFieldDisplayName(key)} must be at least ${control.errors['min'].min}`
          );
        }

        if (control.errors['max']) {
          this.validationErrors[key].push(
            `${this.getFieldDisplayName(key)} must not exceed ${control.errors['max'].max}`
          );
        }
      }
    });
  }

  private getFieldDisplayName(fieldName: string): string {
    const displayNames: { [key: string]: string } = {
      firstName: 'First Name',
      lastName: 'Last Name',
      email: 'Email',
      phone: 'Phone',
      age: 'Age',
      bio: 'Bio',
    };

    return displayNames[fieldName] || fieldName;
  }

  private markFormGroupTouched(): void {
    Object.keys(this.form.controls).forEach((key) => {
      const control = this.form.get(key);
      control?.markAsTouched();
    });
  }

  private clearValidationErrors(): void {
    this.validationErrors = {};
  }

  private resetForm(): void {
    this.form.reset();
    this.clearValidationErrors();
  }

  getFieldError(fieldName: string): string[] {
    return this.validationErrors[fieldName] || [];
  }

  isFieldInvalid(fieldName: string): boolean {
    const control = this.form.get(fieldName);
    return !!(control?.invalid && (control?.dirty || control?.touched || this.isSubmitted));
  }

  getFormData(): FormData | null {
    if (this.form.valid) {
      return this.form.value;
    }
    return null;
  }

  setFormData(data: Partial<FormData>): void {
    this.form.patchValue(data);
  }

  clearForm(): void {
    this.resetForm();
    this.isSubmitted = false;
  }
}
