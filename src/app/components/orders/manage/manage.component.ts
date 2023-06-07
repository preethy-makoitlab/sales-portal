import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent {
  constructor(private router: Router, private routerModule: RouterModule, private ordersService: OrdersService) {}
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
    window.addEventListener('message', (event) => {
      this.populateOrders(event.data);
    });
  }

  getOrders() {
    this.ordersService.getOrdersList('7781003466');
  }

  populateOrders(orders: any[]) {
    orders.forEach(order => {
      this.orders.push(
        {
          name: order[1] || '',
          phoneNo: order[0] || '',
          orderId: order[3],
          description: order[5],
          product: order[4],
          orderDate: order[6],
          expectedDelivery: new Date(),
          amount: order[7],
          status: order[8],
          guid: order[2]
        }
      )
    })
  }
}
