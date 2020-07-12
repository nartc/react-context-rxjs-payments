# React Payments Application

This application is a part of a React technical interview that a friend shares with me. I took interest in the problem statement so here it is

### Technologies

- React
- Context API
- RxJS
- json-server
- AntDesign

### Problem Statement

You will build a configurable application that makes API calls, processes data, and conditionally
displays it in the UI.

You will also need to create a mock API server that runs locally. We recommend you look at
Express (https://expressjs.com/) and/or the JSON-server project
(https://github.com/typicode/json-server).

This application will be configuration driven. Styling, text, API endpoints, etc. will all be specified in a config. Once functionality has been implemented, it should be easy to create multiple instances of the application by changing variables in the config.

The example we have given below is for applying payments. A different config loaded into the
same application could handle many other business use cases. Another example could be
updating customer information and displaying the updated info in the table.

You will be given some initial sample data to work with. However, the data may be changed
when we demo your application.

##### UI Components:

- [ ] Table
- [ ] Modal
- [ ] Forms (2)
  - [ ] Dummy Payment Form
  - [ ] Dummy Credit Form

##### Use case:

- [ ] Fetch Application Config from an end point (Call 1)
- [ ] Fetch all invoices from an end point. (Call 2)
- [ ] Fetch vendors from another end point (Call3)
- [ ] Merge Data (PostProcessor) – A function to normalize / filter and do any data massage.
- [ ] Display it on the table. Columns to Display will come from Configuration from Call1
- [ ] Last column of the table will have a button (Payment Button).
- [ ] Payment button will be enabled only if there if Amount Due is &gt; 0
- [ ] When Payment Button is clicked, a modal is shown
- [ ] Modal workflow: - Modal will be a separate component – that will be loaded on button click - What component the modal will load will be based on the following condition - If there is credit available with the vendor -&gt; Ask user if he wants to apply
      available credit (whether Credit Adjustment can be used or not will be
      dependent on config. If we set credit adjustment enabled to false in
      config, user will not be able to use credit) - Once Credit is applied, if there is still amount Due, then continue the flow
      (load next payment component), where user can make remaining
      payment due. In this the amount to be paid should be (original Amount
      Due – credit applied). - Once This entire flow is complete, show the new amount Due in the table - If the amount Due now becomes 0, then Disable button.

| Endpoint                           | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| /app/config GET                    | This will be left to your imagination, it should contain all of the application config, including all the end points that you need to call. During the demo in the config, we can change call 2 end point to /invoices/v2 and this should not require any change in code. <br><br> We also can change, what columns can be shown in table. The config also enables or disables credit adjustment. Design wise it is important to separate configuration for component (example what columns to show and what end points to call) and Business Logic config (enable / disable credit adjustment). |
| /invoices , GET                    | Use supplied Data                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| /vendors , GET                     | Use Supplied Data                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| (Credit Call) /credit/apply , POST | This will be observed in the Network tab                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| (Payment) /payment , POST          | This will be observed in the Network tab                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |

##### Data Flow

Call 1 (Get Config) -> Call2 (Call Data Api) , Call 3 (Call vendor API) 2 and 3 should be in parallel -> PostProcessor (A function to normalize data and filter data) -> Render Table

##### Sample Data

```json
{
  "appConfig": {
    "tableConfig": {
      "paymentEnabled": true,
      "adjustEnabled": true,
      "columns": [
        {
          "fieldName": "vendor",
          "display": true,
          "displayName": "Vendor",
          "filter": {
            "enabled": true
          },
          "sorter": {
            "enabled": true,
            "sortField": "vendor",
            "sortMeta": "length"
          }
        }
      ]
    },
    "endpoints": {
      "call2": {
        "endpoint": "/invoices"
      },
      "call3": {
        "endpoint": "/vendors"
      },
      "creditPost": {
        "endpoint": "/credit/apply"
      },
      "paymentPost": {
        "endpoint": "/payment"
      }
    }
  },
  "invoices": [
    {
      "invoiceId": 1234,
      "vendorId": "G1",
      "quantity": 20,
      "product": "Apple",
      "amountBal": 129.92,
      "amountDue": 25.5,
      "invoiceDate": "04/01/2020"
    },
    {
      "invoiceId": 4578,
      "vendorId": "Delmonte",
      "product": "B1",
      "quantity": 500,
      "amountBal": 1024.12,
      "amountDue": 612.5,
      "invoiceDate": "03/31/2020"
    },
    {
      "invoiceId": 9999,
      "vendorId": "W1",
      "quantity": 1000,
      "product": "Napkin",
      "amountBal": 12.25,
      "amountDue": 12.25,
      "invoiceDate": "03/31/2020"
    },
    {
      "invoiceId": 1000,
      "vendorId": "W1",
      "quantity": 25,
      "product": "Sanitizer",
      "amountBal": 25.0,
      "amountDue": 12.25,
      "invoiceDate": "03/31/2020"
    },
    {
      "invoiceId": 1025,
      "vendorId": "W1",
      "quantity": 1000,
      "product": "Napkin",
      "amountBal": 0,
      "amountDue": 0,
      "invoiceDate": "03/31/2020"
    }
  ],
  "vendors": [
    {
      "vendorId": "D1",
      "vendorName": "Delmonte",
      "creditBal": 600.0
    },
    {
      "vendorId": "T1",
      "vendorName": "Target"
    },
    {
      "vendorId": "W1",
      "vendorName": "Walmart",
      "creditBal": 12.25
    },
    {
      "vendorId": "G1",
      "creditBal": 0.0
    }
  ]
}
```
