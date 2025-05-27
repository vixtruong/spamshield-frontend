import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Email, EmailDetail } from '../models/email.model'; // Đảm bảo import EmailDetail

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://localhost:7008/api/email'; // Địa chỉ backend ASP.NET

  constructor(private http: HttpClient) {}

  classifyEmails(emails: Email[], filterLabel: string | null = null): Observable<any> {
    const url = filterLabel ? `${this.apiUrl}/classify-list?filterLabel=${filterLabel}` : `${this.apiUrl}/classify-list`;
    return this.http.post<any>(url, emails);
  }

  getAllEmails(): Observable<Email[]> {
    return this.http.get<Email[]>(`${this.apiUrl}/all`);
  }

  getEmailDetail(emailId: number): Observable<EmailDetail> {
    return this.http.get<EmailDetail>(`${this.apiUrl}/${emailId}`);
  }
}