import { CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';

type Campaign = {
  name: string;
  channel: string;
  owner: string;
  budget: number;
  status: 'Live' | 'Draft' | 'Review';
};

@Component({
  selector: 'app-root',
  imports: [CurrencyPipe, ButtonModule, CardModule, TableModule, TagModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly campaigns: Campaign[] = [
    {
      name: 'Spring Launch',
      channel: 'Email',
      owner: 'Marketing Ops',
      budget: 12400,
      status: 'Live'
    },
    {
      name: 'Retention Push',
      channel: 'Paid Social',
      owner: 'Growth',
      budget: 8600,
      status: 'Review'
    },
    {
      name: 'Partner Webinar',
      channel: 'Events',
      owner: 'Demand Gen',
      budget: 5300,
      status: 'Draft'
    },
    {
      name: 'Product Trial',
      channel: 'Search',
      owner: 'Acquisition',
      budget: 15200,
      status: 'Live'
    }
  ];

  protected getSeverity(status: Campaign['status']): 'success' | 'warn' | 'info' {
    const severities = {
      Live: 'success',
      Draft: 'info',
      Review: 'warn'
    } as const;

    return severities[status];
  }
}
