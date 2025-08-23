import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpService } from './http.service';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { provideZonelessChangeDetection } from '@angular/core';
import { beforeEach, afterEach, describe, it, expect } from 'vitest';

describe('HttpService (Vitest)', () => {
  let service: HttpService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [provideZonelessChangeDetection(), HttpService],
    });
    service = TestBed.inject(HttpService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('GET requests', () => {
    it('should make GET request without params and headers', () => {
      const url = '/api/test';
      const mockResponse = { data: 'test' };

      service.get(url).subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(url);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });

    it('should make GET request with params', () => {
      const url = '/api/test';
      const params = new HttpParams().set('page', '1').set('limit', '10');
      const mockResponse = { data: 'test' };

      service.get(url, params).subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(`${url}?page=1&limit=10`);
      expect(req.request.method).toBe('GET');
      expect(req.request.params.get('page')).toBe('1');
      expect(req.request.params.get('limit')).toBe('10');
      req.flush(mockResponse);
    });

    it('should make GET request with headers', () => {
      const url = '/api/test';
      const headers = new HttpHeaders().set('Authorization', 'Bearer token');
      const mockResponse = { data: 'test' };

      service.get(url, undefined, headers).subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(url);
      expect(req.request.method).toBe('GET');
      expect(req.request.headers.get('Authorization')).toBe('Bearer token');
      req.flush(mockResponse);
    });

    it('should make GET request with both params and headers', () => {
      const url = '/api/test';
      const params = new HttpParams().set('page', '1');
      const headers = new HttpHeaders().set('Authorization', 'Bearer token');
      const mockResponse = { data: 'test' };

      service.get(url, params, headers).subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(`${url}?page=1`);
      expect(req.request.method).toBe('GET');
      expect(req.request.params.get('page')).toBe('1');
      expect(req.request.headers.get('Authorization')).toBe('Bearer token');
      req.flush(mockResponse);
    });
  });

  describe('POST requests', () => {
    it('should make POST request without headers', () => {
      const url = '/api/test';
      const body = { name: 'test', value: 123 };
      const mockResponse = { id: 1, ...body };

      service.post(url, body).subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(url);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(body);
      req.flush(mockResponse);
    });

    it('should make POST request with headers', () => {
      const url = '/api/test';
      const body = { name: 'test' };
      const headers = new HttpHeaders().set('Content-Type', 'application/json');
      const mockResponse = { id: 1, ...body };

      service.post(url, body, headers).subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(url);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(body);
      expect(req.request.headers.get('Content-Type')).toBe('application/json');
      req.flush(mockResponse);
    });
  });

  describe('PUT requests', () => {
    it('should make PUT request without headers', () => {
      const url = '/api/test/1';
      const body = { name: 'updated', value: 456 };
      const mockResponse = { id: 1, ...body };

      service.put(url, body).subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(url);
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual(body);
      req.flush(mockResponse);
    });

    it('should make PUT request with headers', () => {
      const url = '/api/test/1';
      const body = { name: 'updated' };
      const headers = new HttpHeaders().set('Content-Type', 'application/json');
      const mockResponse = { id: 1, ...body };

      service.put(url, body, headers).subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(url);
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual(body);
      expect(req.request.headers.get('Content-Type')).toBe('application/json');
      req.flush(mockResponse);
    });
  });

  describe('DELETE requests', () => {
    it('should make DELETE request without headers', () => {
      const url = '/api/test/1';
      const mockResponse = { success: true };

      service.delete(url).subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(url);
      expect(req.request.method).toBe('DELETE');
      req.flush(mockResponse);
    });

    it('should make DELETE request with headers', () => {
      const url = '/api/test/1';
      const headers = new HttpHeaders().set('Authorization', 'Bearer token');
      const mockResponse = { success: true };

      service.delete(url, headers).subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(url);
      expect(req.request.method).toBe('DELETE');
      expect(req.request.headers.get('Authorization')).toBe('Bearer token');
      req.flush(mockResponse);
    });
  });

  describe('PATCH requests', () => {
    it('should make PATCH request without headers', () => {
      const url = '/api/test/1';
      const body = { name: 'patched' };
      const mockResponse = { id: 1, ...body };

      service.patch(url, body).subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(url);
      expect(req.request.method).toBe('PATCH');
      expect(req.request.body).toEqual(body);
      req.flush(mockResponse);
    });

    it('should make PATCH request with headers', () => {
      const url = '/api/test/1';
      const body = { name: 'patched' };
      const headers = new HttpHeaders().set('Content-Type', 'application/json');
      const mockResponse = { id: 1, ...body };

      service.patch(url, body, headers).subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(url);
      expect(req.request.method).toBe('PATCH');
      expect(req.request.body).toEqual(body);
      expect(req.request.headers.get('Content-Type')).toBe('application/json');
      req.flush(mockResponse);
    });
  });

  describe('Error handling', () => {
    it('should handle HTTP errors', () => {
      const url = '/api/test';
      const errorMessage = 'Not Found';

      service.get(url).subscribe({
        next: () => fail('should have failed'),
        error: (error) => {
          expect(error.status).toBe(404);
          expect(error.statusText).toBe(errorMessage);
        },
      });

      const req = httpMock.expectOne(url);
      req.flush(errorMessage, { status: 404, statusText: errorMessage });
    });

    it('should handle network errors', () => {
      const url = '/api/test';

      service.get(url).subscribe({
        next: () => fail('should have failed'),
        error: (error) => {
          expect(error.error).toBeInstanceOf(ErrorEvent);
          expect(error.error.message).toBe('Network error');
        },
      });

      const req = httpMock.expectOne(url);
      req.error(new ErrorEvent('Network error'));
    });
  });

  describe('Request body types', () => {
    it('should handle different body types', () => {
      const url = '/api/test';

      // String body
      service.post(url, 'string body').subscribe();
      let req = httpMock.expectOne(url);
      expect(req.request.body).toBe('string body');
      req.flush({});

      // Number body
      service.post(url, 123).subscribe();
      req = httpMock.expectOne(url);
      expect(req.request.body).toBe(123);
      req.flush({});

      // Array body
      const arrayBody = [1, 2, 3];
      service.post(url, arrayBody).subscribe();
      req = httpMock.expectOne(url);
      expect(req.request.body).toEqual(arrayBody);
      req.flush({});

      // Object body
      const objectBody = { key: 'value', nested: { prop: 'val' } };
      service.post(url, objectBody).subscribe();
      req = httpMock.expectOne(url);
      expect(req.request.body).toEqual(objectBody);
      req.flush({});
    });
  });
});
