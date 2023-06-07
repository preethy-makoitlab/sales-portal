import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { OrdersService } from 'src/app/services/orders.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-customer-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent {
  constructor(private router: Router, private route: ActivatedRoute, private routerModule: RouterModule, private ordersService: OrdersService, private sharedService: SharedService) { }

  customerId: string = '';
  customerInfo: any = { name: '', customerId: '', email: '', company: '', mobile: '', landline: '' };
  infoFields = [{
    label: "Name",
    field: "name"
  },
  {
    label: "Customer ID",
    field: "customerId"
  },
  {
    label: "Email",
    field: "email"
  },
  {
    label: "Company",
    field: "companyName"
  },
  {
    label: "Mobile",
    field: "mobileNo"
  },
  {
    label: "Landline",
    field: "landlineNo"
  }]
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
  selectedDateRange = '';
  textSearch = '';
  allOrders: any = [];
  orders: any = [];
  totalOrders = 0;
  totalOrderValue = 0;
  paymentPending = 0;
  totalPending = 0;
  customerDetails: any = {};
  fields = [{
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
    field: 'customerTotalOrderValue'
  },
  {
    title: 'Total Orders',
    subscription: true,
    field: 'customerTotalOrders'
  }, {
    title: 'Payment Pending',
    value: '1'
  },
  {
    title: 'Total Pending',
    value: '80'
  }];

  ngOnInit(): void {
    window.addEventListener('message', (event) => {
      this.populateOrders(event.data);
      this.allOrders = this.orders;
      this.getCustomerInfo();
    });
    this.customerId = this.route.snapshot.paramMap.get('id') || '';
    this.getOrders();
  }

  getOrders() {
    this.ordersService.getCustomerOrders(this.customerId);
  }

  populateOrders(orders: any[]) {
    this.totalOrders = orders.length || 0;
    this.orders = [];
    orders?.forEach((order, ind) => {
      if (ind === 0) {
        // temporarily fetch customerinfo from first element in array
        this.customerDetails = order;
      }
      this.totalOrderValue += order.total;
      this.orders.push(this.getOrderRow(order))
    })
    this.sharedService.setData('customerTotalOrders', this.totalOrders);
    this.sharedService.setData('customerTotalOrderValue', this.totalOrderValue);
  }

  getCustomerInfo() {
    const customerData: any = {
      name: this.customerDetails.billingAddress.firstName + ' ' + this.customerDetails.billingAddress.lastName,
      customerId: this.customerDetails.ipsUserId,
      email: 'test@test.com',
      companyName: this.customerDetails.billingAddress.company,
      mobileNo: this.customerDetails.billingAddress.mobile,
      landlineNo: this.customerDetails.billingAddress.phone
    }
    this.infoFields.forEach(field => {
      this.customerInfo[field.field] = customerData[field.field];
    })
  }

  filterData(value: any) {
    if (Object.keys(value)?.[0] == 'Status') {
      this.selectedStatus = value['Status'];
    }
    else if (Object.keys(value)?.[0] == 'Date Range') {
      this.selectedDateRange = value['Date Range'];
    }
    else {

    }
    const filteredData: any[] = []
    this.allOrders.forEach((order: any) => {
      if (!this.selectedStatus || (this.selectedStatus && order.status === this.selectedStatus)) {
        if (!this.selectedDateRange) {
          filteredData.push(order)
        }
      }
    })
    this.orders = filteredData;
  }

  getOrderRow(order: any) {
    console.log(order);
    const product = order?.orderItemLite?.[0].productLite?.productType == 'PhotoBook' ? order?.orderItemLite?.[0].productLite?.productAttributeMap?.coverType : order?.orderItemLite?.[0].productLite?.productType;
    return {
      orderId: order?.orderNumber || '',
      description: order?.orderItemLite?.[0]?.orderDescription || '',
      product: product || '',
      orderDate: order?.receivedDt || '',
      expectedDelivery: new Date(),
      amount: order?.total || '',
      status: order?.externalOrderStatus || ''
    }
  }
}
