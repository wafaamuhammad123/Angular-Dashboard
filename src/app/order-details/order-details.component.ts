import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnalyticsService } from '../services/analytics.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  order: any;
  isLoading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private analyticsService: AnalyticsService
  ) {}

  ngOnInit(): void {
    const orderId = this.route.snapshot.paramMap.get('id');
    if (orderId) {
      this.loadOrderDetails(orderId);
    } else {
      this.error = 'No order ID provided';
      this.isLoading = false;
    }
  }

  loadOrderDetails(orderId: string): void {
    this.analyticsService.getOrderDetails(orderId).subscribe({
      next: (order) => {
        this.order = order;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to load order details';
        this.isLoading = false;
        console.error(err);
      }
    });
  }
}