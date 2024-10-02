"use strict";
class PayPal {
    initiatePayment(amount) {
        return `PayPal: Payment of $${amount} initiated.`;
    }
    confirmPayment(transactionId) {
        return `PayPal: Payment with ID ${transactionId} confirmed.`;
    }
}
class Stripe {
    initiatePayment(amount) {
        return `Stripe: Payment of $${amount} initiated.`;
    }
    confirmPayment(transactionId) {
        return `Stripe: Payment with ID ${transactionId} confirmed.`;
    }
}
class PaymentFacade {
    constructor() {
        this.paypal = new PayPal();
        this.stripe = new Stripe();
    }
    processPayment(amount, method) {
        let response;
        if (method === 'paypal') {
            response = this.paypal.initiatePayment(amount);
        }
        else {
            response = this.stripe.initiatePayment(amount);
        }
        return response;
    }
    confirmPayment(method, transactionId) {
        if (method === 'paypal') {
            return this.paypal.confirmPayment(transactionId);
        }
        else {
            return this.stripe.confirmPayment(transactionId);
        }
    }
}
// Usage
const paymentFacade = new PaymentFacade();
const paymentResponse = paymentFacade.processPayment(100, 'paypal');
console.log(paymentResponse); // PayPal: Payment of $100 initiated.
const confirmationResponse = paymentFacade.confirmPayment('paypal', '12345');
console.log(confirmationResponse); // PayPal: Payment with ID 12345 confirmed.
/*
Output:

PayPal: Payment of $100 initiated.
PayPal: Payment with ID 12345 confirmed.

-----------------------------------------

Explanation:
The PaymentFacade class acts as a facade for the PayPal and Stripe classes.
The PaymentFacade class has methods to process and confirm payments using either PayPal or Stripe.
The processPayment() method initiates a payment using the specified payment method (PayPal or Stripe).
The confirmPayment() method confirms a payment using the specified payment method and transaction ID.

This pattern simplifies the process of making payments by providing a unified interface to interact with multiple payment gateways.
The facade pattern is used to provide a simplified interface to a complex system or set of interfaces.

This pattern is extensively used in SDKs and APIs to provide a simple and unified interface for interacting with systems or services.
*/
