import { TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { FormService, ContactFormData, UserInfoFormData } from './form.service';
import { provideZonelessChangeDetection } from '@angular/core';

describe('FormService', () => {
  let service: FormService;
  let fb: FormBuilder;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [provideZonelessChangeDetection(), FormService, FormBuilder],
    });
    service = TestBed.inject(FormService);
    fb = TestBed.inject(FormBuilder);
  });

  it('должен создать сервис', () => {
    expect(service).toBeTruthy();
  });

  describe('createContactForm', () => {
    it('должен создать форму контакта с пустыми значениями по умолчанию', () => {
      const form = service.createContactForm();

      expect(form.get('name')?.value).toBe('');
      expect(form.get('email')?.value).toBe('');
      expect(form.get('phone')?.value).toBe('');
    });

    it('должен создать форму контакта с переданными значениями', () => {
      const data: Partial<ContactFormData> = {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+1234567890',
      };

      const form = service.createContactForm(data);

      expect(form.get('name')?.value).toBe(data.name);
      expect(form.get('email')?.value).toBe(data.email);
      expect(form.get('phone')?.value).toBe(data.phone);
    });

    it('должен проверить валидацию поля name', () => {
      const form = service.createContactForm();
      const nameControl = form.get('name') as AbstractControl;

      nameControl.setValue('');
      expect(nameControl.hasError('required')).toBe(true);

      nameControl.setValue('a');
      expect(nameControl.hasError('minlength')).toBe(true);

      nameControl.setValue('John');
      expect(nameControl.valid).toBe(true);
    });

    it('должен проверить валидацию поля email', () => {
      const form = service.createContactForm();
      const emailControl = form.get('email') as AbstractControl;

      emailControl.setValue('');
      expect(emailControl.hasError('required')).toBe(true);

      emailControl.setValue('invalid-email');
      expect(emailControl.hasError('email')).toBe(true);

      emailControl.setValue('john@example.com');
      expect(emailControl.valid).toBe(true);
    });

    it('должен проверить валидацию поля phone', () => {
      const form = service.createContactForm();
      const phoneControl = form.get('phone') as AbstractControl;

      phoneControl.setValue('invalid-phone');
      expect(phoneControl.hasError('pattern')).toBe(true);

      phoneControl.setValue('+1234567890');
      expect(phoneControl.valid).toBe(true);

      phoneControl.setValue('');
      expect(phoneControl.valid).toBe(true);
    });

    it('должен быть невалидным при пустых обязательных полях', () => {
      const form = service.createContactForm();

      expect(form.valid).toBe(false);
    });

    it('должен быть валидным при заполненных обязательных полях', () => {
      const data: Partial<ContactFormData> = {
        name: 'John Doe',
        email: 'john@example.com',
      };

      const form = service.createContactForm(data);

      expect(form.valid).toBe(true);
    });
  });

  describe('createUserInfoForm', () => {
    it('должен создать форму информации пользователя с пустыми значениями по умолчанию', () => {
      const form = service.createUserInfoForm();

      expect(form.get('username')?.value).toBe('');
      expect(form.get('age')?.value).toBe(null);
      expect(form.get('gender')?.value).toBe('');
      expect(form.get('address')?.value).toBe('');
    });

    it('должен создать форму информации пользователя с переданными значениями', () => {
      const data: Partial<UserInfoFormData> = {
        username: 'johndoe',
        age: 25,
        gender: 'male',
        address: '123 Main St',
      };

      const form = service.createUserInfoForm(data);

      expect(form.get('username')?.value).toBe(data.username);
      expect(form.get('age')?.value).toBe(data.age);
      expect(form.get('gender')?.value).toBe(data.gender);
      expect(form.get('address')?.value).toBe(data.address);
    });

    it('должен проверить валидацию поля username', () => {
      const form = service.createUserInfoForm();
      const usernameControl = form.get('username') as AbstractControl;

      usernameControl.setValue('');
      expect(usernameControl.hasError('required')).toBe(true);

      usernameControl.setValue('ab');
      expect(usernameControl.hasError('minlength')).toBe(true);

      usernameControl.setValue('johndoe');
      expect(usernameControl.valid).toBe(true);
    });

    it('должен проверить валидацию поля age', () => {
      const form = service.createUserInfoForm();
      const ageControl = form.get('age') as AbstractControl;

      ageControl.setValue(null);
      expect(ageControl.hasError('required')).toBe(true);

      ageControl.setValue(17);
      expect(ageControl.hasError('min')).toBe(true);

      ageControl.setValue(121);
      expect(ageControl.hasError('max')).toBe(true);

      ageControl.setValue(25);
      expect(ageControl.valid).toBe(true);
    });

    it('должен проверить валидацию поля address', () => {
      const form = service.createUserInfoForm();
      const addressControl = form.get('address') as AbstractControl;

      const longAddress = 'a'.repeat(101);
      addressControl.setValue(longAddress);
      expect(addressControl.hasError('maxlength')).toBe(true);

      addressControl.setValue('123 Main St');
      expect(addressControl.valid).toBe(true);

      addressControl.setValue('');
      expect(addressControl.valid).toBe(true);
    });

    it('должен быть невалидным при пустых обязательных полях', () => {
      const form = service.createUserInfoForm();

      expect(form.valid).toBe(false);
    });

    it('должен быть валидным при заполненных обязательных полях', () => {
      const data: Partial<UserInfoFormData> = {
        username: 'johndoe',
        age: 25,
      };

      const form = service.createUserInfoForm(data);

      expect(form.valid).toBe(true);
    });
  });
});
