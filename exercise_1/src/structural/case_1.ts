class PayPal {
    public initiatePayment(amount: number): string {
        return `PayPal: Payment of $${amount} initiated.`;
    }
    public confirmPayment(transactionId: string): string {
        return `PayPal: Payment with ID ${transactionId} confirmed.`;
    }
}

class Stripe {
    public initiatePayment(amount: number): string {
        return `Stripe: Payment of $${amount} initiated.`;
    }
    public confirmPayment(transactionId: string): string {
        return `Stripe: Payment with ID ${transactionId} confirmed.`;
    }
}

class PaymentFacade {
    private paypal: PayPal;
    private stripe: Stripe;

    constructor() {
        this.paypal = new PayPal();
        this.stripe = new Stripe();
    }

    public processPayment(amount: number, method: 'paypal' | 'stripe'): string {
        let response: string;
        if (method === 'paypal') {
            response = this.paypal.initiatePayment(amount);
        } else {
            response = this.stripe.initiatePayment(amount);
        }
        return response;
    }

    public confirmPayment(method: 'paypal' | 'stripe', transactionId: string): string {
        if (method === 'paypal') {
            return this.paypal.confirmPayment(transactionId);
        } else {
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
