import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from '../services/analytics.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders: any[] = []; 
  isLoading = true;
  error: string | null = null;

  constructor(
    private analyticsService: AnalyticsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.analyticsService.getOrders().subscribe({
      next: (orders) => {
        this.orders = orders;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to load orders';
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  viewOrderDetails(orderId: string): void {
    this.router.navigate(['/orders', orderId]);
  }
}