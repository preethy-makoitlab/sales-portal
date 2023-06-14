import { Component, HostListener } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { OrdersService } from 'src/app/services/orders.service';
import { SharedService } from 'src/app/services/shared.service';
import { filterByDate, getDateRange, isDesktopView } from 'src/app/utils/utils';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent {
  statusFilters: string[] = ['Waiting For Online QC', 'Waiting For Design', 'Submitted for Design Corrections', 'In Design', 'In Preview', 'Waiting For Assembly', 'In Assembly', 'In Printing', 'Shipped', 'Cancelled'];
  dateFilters: string[] = ['Today', 'Last 7 days', 'Last 30 days', 'Last 60 days', 'Last 90 days'];
  isDesktopView = true;
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
  tableFields = [{
    label: 'Customer',
    sortable: false,
    multiData: true,
    fields: [{
      // field: 'name', clickable: true, param: 'guid'
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

  cardFields = [{
    label: 'Customer',
    field: 'name',
    clickable: true,
    route: '/customer/view',
    param: 'guid'
  },
  {
    label: 'Customer ID',
    field: 'customerId'
  },
  {
    label: 'Order ID',
    field: 'orderId'
  },
  {
    label: 'Description',
    field: 'description'
  }, {
    label: 'Product',
    field: 'product'
  }, {
    label: 'Order Date',
    date: true,
    field: 'orderDate'
  }, {
    label: 'Expected Delivery',
    date: true,
    field: 'expectedDelivery'
  }, {
    label: 'Amount (INR)',
    field: 'amount'
  },
  {
    label: 'Status',
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

  constructor(private router: Router, private routerModule: RouterModule, private ordersService: OrdersService, private sharedService: SharedService) { }
  @HostListener('window:resize', [])
  onResize() {
    this.isDesktopView = isDesktopView();
  }

  ngOnInit(): void {
    this.isDesktopView = isDesktopView();
    this.getOrders();
    window.addEventListener('message', (event) => {
      if (event?.data && Array.isArray(event.data)) {
        event.data?.forEach(order => {
          this.totalOrderValue += order[11];
          this.allOrders.push(this.getOrderRow(order))
        })
        this.sharedService.setData('totalOrderValue', this.totalOrderValue);
      }
      this.totalOrders = this.allOrders.length || 0;
      this.sharedService.setData('totalOrders', this.totalOrders);
      this.orders = this.allOrders.slice();
    });
  }

  getOrders() {
    this.ordersService.getAllOrders('7781003466');
  }

  goTo(route: string) {
    this.router.navigate([route]);
  }

  filterData(value: any) {
    if (Object.keys(value)?.[0] == 'Status') {
      this.selectedStatus = value['Status'];
    }
    else if (Object.keys(value)?.[0] == 'Date Range') {
      this.selectedDateRange = getDateRange(value['Date Range']);
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
      orderId: order[7] || '',
      description: order[9] || '',
      product: order[8] || '',
      orderDate: order[10] || '',
      expectedDelivery: new Date(),
      amount: order[11] || '',
      status: order[12] || '',
      guid: order[6] || '',
      email: order[2] || '',
      company: order[3] || ''
    }
  }

  call(id: String) {
    console.log(this.orders);
  }
}
