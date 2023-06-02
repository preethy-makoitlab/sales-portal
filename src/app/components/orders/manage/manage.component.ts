import { Component } from '@angular/core';
// import { TableComponent } from '../../table/table.component';
// import { DashboardCountsComponent } from '../../common/dashboard-counts/dashboard-counts.component';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent {
  statusFilters: string[] = ['Pending', 'Pending payment', 'Upload pending', 'In Design', 'In Assembly', 'In Production', 'Shipped', 'Cancelled'];
  dateFilters: string[] = ['Today', 'Last 7 days', 'Last 30 days', 'Last 60 days', 'Last 90 days'];
  filters = [
    {
      label: 'Status',
      options: this.statusFilters
    },
    {
      label: 'Date Range',
      options: this.dateFilters
    },
    {
      label: 'Order#/Customer/Sub-batch',
      textInput: true
    },
  ]
  orders: any = [];
  fields = [{
    label: 'Customer',
    sortable: false,
    multiData: true,
    fields: [{
      field: 'name', clickable: true, route: '/customer'
    },
    {
      field: 'phoneNo'
    }]
  },
  {
    label: 'Order ID',
    sortable: false,
    multiData: true,
    fields: [{
      field: 'orderId', clickable: true, route: '/'
    },
    {
      field: 'description'
    }]
  }, {
    label: 'Product',
    sortable: false,
    multiData: false,
    clickable: false,
    field: 'product'
  }, {
    label: 'Order Date',
    sortable: true,
    multiData: false,
    clickable: false,
    date: true,
    field: 'orderDate'
  }, {
    label: 'Expected Delivery',
    sortable: true,
    multiData: false,
    clickable: false,
    date: true,
    field: 'expectedDelivery'
  }, {
    label: 'Amount (INR)',
    sortable: false,
    multiData: false,
    clickable: false,
    field: 'amount'
  },
  {
    label: 'Status',
    sortable: false,
    multiData: false,
    clickable: false,
    button: true,
    field: 'status'
  }]

  dashboardSections = [{
    title: 'Total Order Value',
    value: '1,20,000'
  },
  {
    title: 'Total Orders',
    value: '120'
  }, {
    title: 'Payment Pending',
    value: '1'
  },
  {
    title: 'Total Pending',
    value: '80'
  }];

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders() {
    for (let i = 0; i < 10; i++) {
      const statusIndex = Math.floor(Math.random() * 8);
      this.orders.push(
        {
          name: `name${i + 1}`,
          phoneNo: `phoneNo${i + 1}`,
          orderId: `orderId${i + 1}`,
          description: `description${i + 1}`,
          product: `product${i + 1}`,
          orderDate: new Date(),
          expectedDelivery: new Date(),
          amount: 1000 * (i + 1),
          status: this.statusFilters[statusIndex]
        }
      )
    }
  }
}
