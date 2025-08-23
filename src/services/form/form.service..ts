import { inject, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
}

export interface UserInfoFormData {
  username: string;
  age: number;
  gender: string;
  address: string;
}

@Injectable({
  providedIn: 'root',
})
export class FormService {
  private fb = inject(FormBuilder);

  createContactForm(data?: Partial<ContactFormData>): FormGroup {
    return this.fb.group({
      name: [data?.name || '', [Validators.required, Validators.minLength(2)]],
      email: [data?.email || '', [Validators.required, Validators.email]],
      phone: [data?.phone || '', [Validators.pattern(/^\+?[0-9]{10,15}$/)]],
    });
  }

  createUserInfoForm(data?: Partial<UserInfoFormData>): FormGroup {
    return this.fb.group({
      username: [data?.username || '', [Validators.required, Validators.minLength(3)]],
      age: [data?.age || null, [Validators.required, Validators.min(18), Validators.max(120)]],
      gender: [data?.gender || ''],
      address: [data?.address || '', Validators.maxLength(100)],
    });
  }
}
