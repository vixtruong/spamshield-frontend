import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Email } from '../models/email.model';
import { MatTableModule } from '@angular/material/table';
import { DatePipe} from '@angular/common';
import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective  } from 'ng2-charts';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatTableModule, DatePipe, FormsModule, BaseChartDirective, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  emails: Email[] = [];
  filteredEmails: Email[] = [];
  displayedColumns: string[] = ['emailId', 'sender', 'subject', 'label', 'createdAt'];
  selectedFilter: string = 'all';

  customStartDate: string = '';
  customEndDate: string = '';


  public pieChartData: ChartConfiguration['data'] = {
    labels: ['Spam', 'Ham'],
    datasets: [{
      data: [0, 0],
      backgroundColor: ['#ff6384', '#36a2eb']
    }]
  };
  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Phân bố Spam và Ham' }
    }
  };

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.loadEmails();
  }

  loadEmails(): void {
    this.apiService.getAllEmails().subscribe({
      next: (data) => {
        this.emails = data;
        this.applyTimeFilter(); // dùng luôn filter
      },
      error: (err) => console.error('Error loading emails:', err)
    });
  }

  goToDetail(emailId: number): void {
    this.router.navigate(['/email-detail', emailId]);
  }

  applyTimeFilter(): void {
    const now = new Date();

    this.filteredEmails = this.emails.filter(email => {
      const created = new Date(email.createdAt!);

      switch (this.selectedFilter) {
        case 'today':
          return created.toDateString() === now.toDateString();
        case 'week':
          const weekAgo = new Date();
          weekAgo.setDate(now.getDate() - 7);
          return created >= weekAgo;
        case 'month':
          return created.getMonth() === now.getMonth() && created.getFullYear() === now.getFullYear();
        case 'custom':
          if (this.customStartDate && this.customEndDate) {
            const start = new Date(this.customStartDate);
            const end = new Date(this.customEndDate);
            end.setHours(23, 59, 59, 999);
            return created >= start && created <= end;
          }
          return false;
        default:
          return true;
      }
    });

    this.updateChart();
  }


  updateChart(): void {
    const spamCount = this.filteredEmails.filter(e => e.label === 'spam').length;
    const hamCount = this.filteredEmails.filter(e => e.label === 'ham').length;

    this.pieChartData = {
      labels: ['Spam', 'Ham'],
      datasets: [{
        data: [spamCount, hamCount],
        backgroundColor: ['#ff6384', '#36a2eb']
      }]
    };
  }
}
