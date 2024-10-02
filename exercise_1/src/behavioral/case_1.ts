export interface IObserver {
    sendEmail(): void
  }

export class Sale {
    private observers: IObserver[]
  
    constructor() {
      this.observers = []
    }
  
    addObserver(ob: IObserver) {
      this.observers.push(ob)
    }
  
    notifyObservers() {
      console.log('Notifying clients:')
      this.observers.map((observer) => observer.sendEmail())
    }
  
  }

export class Client implements IObserver {
  name: string
  email: string

  constructor(name: string, email: string) {
    this.name = name
    this.email = email
  }

  sendEmail(): void {
    console.log(`Sending a mail to ${this.name}`)
  }

}

// Creates a new Sale on the store
const blackFriday = new Sale()

// Creates our clients
const clientA = new Client('John', 'john@email.com')
const clientB = new Client('Jessica', 'jessica@email.com')
const clientC = new Client('George', 'george@email.com')

// Add our clients to the observers list
blackFriday.addObserver(clientA)
blackFriday.addObserver(clientB)
blackFriday.addObserver(clientC)

// Notify all of our clients about Black Friday
blackFriday.notifyObservers()

/*
Output:

Notifying clients:
Sending a mail to John
Sending a mail to Jessica
Sending a mail to George

----------------------------------------

Explanation:

In this example, we have a Sale class that acts as a subject and maintains a list of observers.
The Sale class has methods to add observers and notify them.
The Client class implements the IObserver interface and defines the sendEmail method.
The Client class is added as an observer to the Sale class and is notified when the Sale event occurs.
The notifyObservers method in the Sale class iterates over the list of observers and calls the sendEmail method on each observer.

An observer pattern is useful when you have multiple objects that need to be notified of changes in another object.
A real-world example of the observer pattern is event handling in web development, where event listeners are notified when an event occurs.
*/