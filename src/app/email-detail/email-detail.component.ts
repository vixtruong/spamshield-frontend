import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmailDetail } from '../models/email.model';
import { ApiService } from '../services/api.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-email-detail',
    imports: [CommonModule],
    templateUrl: './email-detail.component.html',
    styleUrls: ['./email-detail.component.css']
})
export class EmailDetailComponent implements OnInit {
    emailDetail: EmailDetail | null = null;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private apiService: ApiService
    ) { }

    ngOnInit(): void {
        const emailId = Number(this.route.snapshot.paramMap.get('id'));
        if (emailId) {
            this.apiService.getEmailDetail(emailId).subscribe(
                (data: EmailDetail) => {
                    console.log(data);
                    this.emailDetail = data;
                    // Chuyển đổi probabilities từ mảng sang object nếu cần
                    if (this.emailDetail?.emailExplanations) {
                        this.emailDetail.emailExplanations.forEach(ex => {
                            if (ex.probabilities && Array.isArray(ex.probabilities)) {
                                ex.probabilities = { ham: ex.probabilities[0], spam: ex.probabilities[1] };
                            }
                        });
                    }
                },
                error => {
                    console.error('Lỗi khi lấy chi tiết email:', error);
                }
            );
        }
    }

    goBack(): void {
        this.router.navigate(['/dashboard']);
    }
}