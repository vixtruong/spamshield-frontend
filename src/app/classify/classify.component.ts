import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Thêm import này
import { ApiService } from '../services/api.service';
import { Email } from '../models/email.model';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-classify',
  standalone: true,
  imports: [MatTableModule, CommonModule], // Thêm CommonModule
  templateUrl: './classify.component.html',
  styleUrls: ['./classify.component.css']
})
export class ClassifyComponent {
  classifiedEmails: Email[] = [];
  fileName: string = '';
  displayedColumns: string[] = ['emailId', 'sender', 'subject', 'label'];

  constructor(private apiService: ApiService) {}

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.fileName = file.name;
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = reader.result as string;
        this.parseCsv(text);
      };
      reader.readAsText(file);
    }
  }

  parseCsv(csvText: string): void {
    const lines = csvText.split('\n').filter(line => line.trim() !== '');
    const emails: Email[] = [];
    const headers = lines[0].split(',').map(header => header.trim());

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(value =>
        value.trim().replace(/^"|"$/g, '')
      );

      if (values.length === 7) {
        emails.push({
          emailId: 0,
          sender: values[1] || '',
          subject: values[2] || '',
          content: values[3] || '',
          emailDate: values[4] || '',
          label: '',
          createdAt: values[6] || ''
        });
      }
    }

    this.classifyEmails(emails);
  }


  classifyEmails(emails: Email[]): void {
    this.apiService.classifyEmails(emails, null).subscribe({
      next: (response) => {
        this.classifiedEmails = response.classifiedEmails;
      },
      error: (err) => console.error('Error classifying emails:', err)
    });
  }
}