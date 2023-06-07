import { Component } from '@angular/core';

@Component({
  selector: 'app-customer-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent {
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
  orders: any = [];
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
    this.getCustomerInfo();
  }

  getOrders() {
    const ordersResponse = {
      "responseStatus": "Success",
      "orderMap": {
          "In Process": [
              {
                  "id": 1545357,
                  "orderNumber": "IC-12282037",
                  "ipsUserId": "9000447273",
                  "receivedDt": "May 17, 2022 10:20:32 AM",
                  "total": 0,
                  "orderStatus": "In Process",
                  "externalOrderStatus": "In Assembly",
                  "orderItemLite": [
                      {
                          "orderItemId": 2012564,
                          "designFee": 0,
                          "quantity": 1,
                          "productLite": {
                              "productType": "Calendar",
                              "productAttributeMap": {
                                  "pageLaminationType": "Matte",
                                  "designType": "No Design",
                                  "calendarSize": "Table Calendar"
                              }
                          },
                          "orderDescription": "Test Order"
                      }
                  ],
                  "billingAddress": {
                      "id": 6018149,
                      "salutation": "Mr.",
                      "firstName": "Pk",
                      "lastName": "Kumar",
                      "company": "9110621048",
                      "line1": "#48 K.H. Residency BBMP Office,Road",
                      "line2": "Viratnagar,Bomanahalli",
                      "line3": "",
                      "city": "Nagpur",
                      "country": "India",
                      "pincode": "Maharashtra",
                      "mobile": "",
                      "phone": "813107"
                  },
                  "shippingAddress": {
                      "id": 6018150,
                      "salutation": "Mr.",
                      "firstName": "Pk",
                      "lastName": "Kumar",
                      "company": "9110621048",
                      "line1": "#48 K.H. Residency BBMP Office,Road",
                      "line2": "Viratnagar,Bomanahalli",
                      "line3": "",
                      "city": "Nagpur",
                      "country": "India",
                      "pincode": "Maharashtra",
                      "mobile": "",
                      "phone": "813107"
                  },
                  "balancedToBePayed": 0,
                  "isDeficientInPayment": false
              }
          ],
          "Delivered": [
          ]
      }
    }

  
    const ordersList = ordersResponse?.orderMap?.['In Process'];
    for (let i = 0; i < ordersList.length; i++) {
      const orderDetails = ordersList[i].orderItemLite?.[0];
      // const produ
      this.orders.push(
        {
          orderId: ordersList[i].orderNumber,
          description: orderDetails.orderDescription,
          product: `product${i + 1}`,
          orderDate: new Date(),
          expectedDelivery: new Date(),
          amount: 1000 * (i + 1),
          status: this.statusFilters[0]
        }
      )
    }
  }

  getCustomerInfo() {
    const customerData: any = {
      name: 'Name1',
      customerId: 'ID1',
      email: 'name1@test.com',
      companyName: 'Company1',
      mobileNo: 'Mobile1',
      landlineNo: 'Landline1'
    }
    this.infoFields.forEach(field => {
      this.customerInfo[field.field] = customerData[field.field];
    })
  }
}
