import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { FormComponent, FormData } from './form.component';
import { ValidationService } from '../../services/validation/validation.service';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { provideZonelessChangeDetection } from '@angular/core';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;
  let validationService: ValidationService;

  beforeEach(async () => {
    const validationServiceSpy = {
      validateEmail: vi.fn(),
      validatePassword: vi.fn(),
      validatePhoneNumber: vi.fn(),
      validateRequired: vi.fn(),
      validateMinLength: vi.fn(),
      validateMaxLength: vi.fn(),
      validateNumeric: vi.fn(),
      validateRange: vi.fn(),
    };

    await TestBed.configureTestingModule({
      declarations: [],
      imports: [ReactiveFormsModule, FormComponent],
      providers: [
        provideZonelessChangeDetection(),
        { provide: ValidationService, useValue: validationServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    validationService = TestBed.inject(ValidationService);
    fixture.detectChanges();
  });

  it('должен создаваться', () => {
    expect(component).toBeTruthy();
  });

  it('если компонент инициализируется, то форма должна быть пустой', () => {
    expect(component.form.get('firstName')?.value).toBe('');
    expect(component.form.get('lastName')?.value).toBe('');
    expect(component.form.get('email')?.value).toBe('');
    expect(component.form.get('phone')?.value).toBe('');
    expect(component.form.get('age')?.value).toBe(null);
    expect(component.form.get('bio')?.value).toBe('');
  });

  it('если форма только что создана, то она должна быть невалидной', () => {
    expect(component.form.valid).toBe(false);
  });

  it('если поля обязательные, то они должны иметь ошибку валидации', () => {
    const firstNameControl = component.form.get('firstName');
    const lastNameControl = component.form.get('lastName');
    const emailControl = component.form.get('email');
    const phoneControl = component.form.get('phone');
    const ageControl = component.form.get('age');

    expect(firstNameControl?.errors?.['required']).toBeTruthy();
    expect(lastNameControl?.errors?.['required']).toBeTruthy();
    expect(emailControl?.errors?.['required']).toBeTruthy();
    expect(phoneControl?.errors?.['required']).toBeTruthy();
    expect(ageControl?.errors?.['required']).toBeTruthy();
  });

  it('если имя и фамилия короче 2 символов, то должна быть ошибка минимальной длины', () => {
    const firstNameControl = component.form.get('firstName');
    const lastNameControl = component.form.get('lastName');

    firstNameControl?.setValue('A');
    lastNameControl?.setValue('B');

    expect(firstNameControl?.errors?.['minlength']).toBeTruthy();
    expect(lastNameControl?.errors?.['minlength']).toBeTruthy();
  });

  it('если email имеет неверный формат, то должна быть ошибка валидации', () => {
    const emailControl = component.form.get('email');

    emailControl?.setValue('invalid-email');

    expect(emailControl?.errors?.['email']).toBeTruthy();
  });

  it('если возраст меньше 18 или больше 120, то должна быть ошибка валидации', () => {
    const ageControl = component.form.get('age');

    ageControl?.setValue(17);
    expect(ageControl?.errors?.['min']).toBeTruthy();

    ageControl?.setValue(121);
    expect(ageControl?.errors?.['max']).toBeTruthy();
  });

  it('если био длиннее 500 символов, то должна быть ошибка максимальной длины', () => {
    const bioControl = component.form.get('bio');
    const longBio = 'a'.repeat(501);

    bioControl?.setValue(longBio);

    expect(bioControl?.errors?.['maxlength']).toBeTruthy();
  });

  it('если все данные корректны, то форма должна быть валидной', () => {
    const validData: FormData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '1234567890',
      age: 25,
      bio: 'Software developer',
    };

    component.form.patchValue(validData);

    expect(component.form.valid).toBe(true);
  });

  it('если форма валидна, то должен возвращаться объект с данными', () => {
    const validData: FormData = {
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      phone: '0987654321',
      age: 30,
      bio: 'Product manager',
    };

    component.form.patchValue(validData);

    const result = component.getFormData();
    expect(result).toEqual(validData);
  });

  it('если форма невалидна, то должен возвращаться null', () => {
    const result = component.getFormData();
    expect(result).toBeNull();
  });

  it('если вызывается setFormData, то данные должны устанавливаться в форму', () => {
    const testData: Partial<FormData> = {
      firstName: 'Test',
      email: 'test@example.com',
    };

    component.setFormData(testData);

    expect(component.form.get('firstName')?.value).toBe('Test');
    expect(component.form.get('email')?.value).toBe('test@example.com');
  });

  it('если вызывается clearForm, то форма должна очищаться', () => {
    component.form.patchValue({
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      phone: '1234567890',
      age: 25,
      bio: 'Test bio',
    });

    component.clearForm();

    expect(component.form.get('firstName')?.value).toBe(null);
    expect(component.form.get('lastName')?.value).toBe(null);
    expect(component.form.get('email')?.value).toBe(null);
    expect(component.form.get('phone')?.value).toBe(null);
    expect(component.form.get('age')?.value).toBe(null);
    expect(component.form.get('bio')?.value).toBe(null);
    expect(component.isSubmitted).toBe(false);
  });

  it('если вызывается onSubmit, то форма должна помечаться как отправленная', () => {
    component.onSubmit();

    expect(component.isSubmitted).toBe(true);
  });

  it('если изменяется значение в форме, то ошибки валидации должны очищаться', () => {
    component.validationErrors = { firstName: ['Error message'] };

    component.form.get('firstName')?.setValue('Test');

    expect(component.validationErrors).toEqual({});
  });

  it('если есть ошибки валидации, то они должны возвращаться для соответствующих полей', () => {
    component.validationErrors = {
      firstName: ['First Name is required'],
      email: ['Invalid email format'],
    };

    expect(component.getFieldError('firstName')).toEqual(['First Name is required']);
    expect(component.getFieldError('email')).toEqual(['Invalid email format']);
    expect(component.getFieldError('nonexistent')).toEqual([]);
  });

  it('если поле имеет невалидное значение и помечено как touched, то оно должно считаться невалидным', () => {
    const firstNameControl = component.form.get('firstName');
    firstNameControl?.setValue('A');
    firstNameControl?.markAsTouched();

    expect(component.isFieldInvalid('firstName')).toBe(true);
    expect(component.isFieldInvalid('lastName')).toBe(false);
  });

  it('если форма отправлена, то все невалидные поля должны считаться невалидными', () => {
    component.onSubmit();

    expect(component.isFieldInvalid('firstName')).toBe(true);
    expect(component.isFieldInvalid('lastName')).toBe(true);
  });

  it('если форма успешно отправлена, то она должна сбрасываться', () => {
    const validData: FormData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '1234567890',
      age: 25,
      bio: 'Software developer',
    };

    component.form.patchValue(validData);
    component.onSubmit();

    expect(component.form.get('firstName')?.value).toBe(null);
    expect(component.isSubmitted).toBe(false);
  });
});
