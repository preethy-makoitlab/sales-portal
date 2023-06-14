import { Component, HostListener } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';
import { CustomerService } from 'src/app/services/customer.service';
import { OrdersService } from 'src/app/services/orders.service';
import { isDesktopView } from 'src/app/utils/utils';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent {
  isDesktopView = true;
  customers: any = [];
  allCustomers: any = [];
  textSearch = '';
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
    label: 'Email',
    sortable: false,
    multiData: false,
    clickable: false,
    field: 'email'
  },
  {
    label: 'Order Photobook',
    field: 'guid',
    clickable: true,
    linkText: 'Order Photobook',
    param: 'guid'
  }];
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
    label: 'Email',
    field: 'email'
  },
  {
    label: 'Order Photobook',
    field: 'guid',
    clickable: true,
    linkText: 'Order Photobook',
    param: 'guid'
  }];
  filters = [
    {
      label: 'Customer/Email',
      textInput: true
    },
  ]

  filterData(value: any) {
    let filteredData: any[] = [];
    this.textSearch = value['global'];
    this.customers = this.allCustomers.slice();
    if (this.textSearch) {
      this.customers.forEach((customer: any) => {
        if ((!this.textSearch || customer.customerId?.toUpperCase().includes(this.textSearch.toUpperCase()) || customer.name?.toUpperCase().includes(this.textSearch.toUpperCase()) || customer.email?.toUpperCase().includes(this.textSearch.toUpperCase()))) {
          filteredData.push(customer)
        }
      })
      this.customers = filteredData.slice();

    }
  }

  constructor(private router: Router, private routerModule: RouterModule, private customerService: CustomerService, private sharedService: SharedService, private ordersService: OrdersService) { }
  @HostListener('window:resize', [])
  onResize() {
    this.isDesktopView = isDesktopView();
  }
  ngOnInit(): void {
    this.isDesktopView = isDesktopView();
    this.getCustomers();
    window.addEventListener('message', (event) => {
      if (event?.data && Array.isArray(event.data)) {
        event.data?.forEach(order => {
          this.allCustomers.push(this.getOrderRow(order))
        })
        console.log('customer', this.customers);
      }
      this.customers = this.allCustomers.slice();
    });
  }
  call(id: any) {
    console.log(id);
  }
  getCustomers() {
    this.customerService.getCustomers('7781003466');
    console.log('Call customerslist');
  }

  getOrderRow(order: string[]) {
    return {
      name: order[1] || '',
      customerId: order[0] || '',
      email: order[2] || '',
      guid: order[3] || ''
    }
  }
  orderPhotobook(value: any) {
    this.ordersService.createOrder(value.id);
  }
}
