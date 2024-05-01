## MVP

In this assignment, we will try to create simple microservices that can talk to each other to create end-to-end functionalities. This microservices will be about e-commerce where a user can create an order. The process will involve check authentication and authorization, inventory check whether the product is still available or not, send notification, etc.
Services to be created are not limited to:

- API Gateway
- Order Service
- Inventory / Product Service
- Notification Service

The tech stack of each service can vary if you want, no limitation on that. To make it smooth, try to containerize the service.
You can split the service into more components if needed. The communication way is up to you, you can use either sync or async or combine. Please explain the trade-off and reason for your choice during the presentation.
The database is also up to you along with the schema, please choose wisely. Remember, 1 service 1 database.

## Tech Stack

- API Gateway: Kong
- Backend: NodeJS
- Database: MySQL
- Containerization: Docker
- Orchestration: Docker Compose
- Message Broker: Kafka

## Scenario

1. User creates an order
   With the following payload:

```json
{
  "user_id": 1,
  "product_id": 1,
  "quantity": 1
}
```

2. API Gateway receives the request and checks the authentication and authorization
3. API Gateway forwards the request to Order Service
4. Order Service checks the inventory using Inventory Service, with help from Kafka
5. If the product is available, Order Service will create an order
6. Order Service will send a notification to Notification Service
7. Notification Service will send a notification to the user
8. Order Service will return the order details to the user
