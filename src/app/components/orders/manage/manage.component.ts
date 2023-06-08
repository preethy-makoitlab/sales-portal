import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { OrdersService } from 'src/app/services/orders.service';
import { SharedService } from 'src/app/services/shared.service';
import { filterByDate, getDateRange } from 'src/app/utils/utils';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent {
  constructor(private router: Router, private routerModule: RouterModule, private ordersService: OrdersService, private sharedService: SharedService) { }
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
  selectedStatus = '';
  selectedDateRange: any = {};
  textSearch = '';
  orders: any = [];
  allOrders: any = [];
  totalOrders = 0;
  totalOrderValue = 0;
  paymentPending = 0;
  totalPending = 0;
  fields = [{
    label: 'Customer',
    sortable: false,
    multiData: true,
    fields: [{
      field: 'name', clickable: true, route: '/customer/view', param: 'guid'
    },
    {
      field: 'customerId'
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
    subscription: true,
    field: 'totalOrderValue'
  },
  {
    title: 'Total Orders',
    subscription: true,
    field: 'totalOrders'
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
      if (event?.data && Array.isArray(event.data)) {
        event.data?.forEach(order => {
          this.totalOrderValue += order[7];
          this.allOrders.push(this.getOrderRow(order))
        })
        this.sharedService.setData('totalOrders', this.totalOrders);
        this.sharedService.setData('totalOrderValue', this.totalOrderValue);
      }
      this.totalOrders = this.allOrders.length || 0;
      this.orders = this.allOrders.slice();
    });
  }

  getOrders() {
    this.ordersService.getAllOrders('7781003466');
  }

  // populateOrders(orders: any[]) {
  //   this.totalOrders = orders.length || 0;
  //   this.orders = [];
  //   orders?.forEach(order => {
  //     this.totalOrderValue += order[7];
  //     this.orders.push(this.getOrderRow(order))
  //   })
  //   this.sharedService.setData('totalOrders', this.totalOrders);
  //   this.sharedService.setData('totalOrderValue', this.totalOrderValue);
  // }

  filterData(value: any) {
    let dateRange : any = {};
    if (Object.keys(value)?.[0] == 'Status') {
      this.selectedStatus = value['Status'];
    }
    else if (Object.keys(value)?.[0] == 'Date Range') {
      this.selectedDateRange = value['Date Range'];
      dateRange = getDateRange(this.selectedDateRange);
    }
    else {
      this.textSearch = value['global'];
    }
    let filteredData: any[] = [];
    this.orders = this.allOrders.slice();
    if (this.selectedDateRange.startDate && this.selectedDateRange.endDate) {
      // filter by date
      this.orders = filterByDate(this.orders, 'orderDate', this.selectedDateRange)
    }
    if (this.selectedStatus || this.textSearch) {
      this.orders.forEach((order: any) => {
        if ((!this.selectedStatus || (this.selectedStatus && order.status === this.selectedStatus)) && (!this.textSearch || (this.textSearch && (order.orderId?.toUpperCase().includes(this.textSearch.toUpperCase()) || order.customerId?.toUpperCase().includes(this.textSearch.toUpperCase()) || order.name?.toUpperCase().includes(this.textSearch.toUpperCase()))))) {
          filteredData.push(order)
        }
      })
      this.orders = filteredData.slice();
    }
  }

  getOrderRow(order: string[]) {
    return {
      name: order[1] || '',
      customerId: order[0] || '',
      orderId: order[3] || '',
      description: order[5] || '',
      product: order[4] || '',
      orderDate: order[6] || '',
      expectedDelivery: new Date(),
      amount: order[7] || '',
      status: order[8] || '',
      guid: order[2] || ''
    }
  }
}
