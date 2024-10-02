# Exercise 1: Design Patterns

## Problem Statement

The first exercise involves demonstrating an understanding of various software design patterns through creative use cases. The following design patterns are implemented:

1. **Singleton Pattern**: Ensures a class has only one instance and provides a global point of access to it.
2. **Builder Pattern**: Allows for the step-by-step construction of complex objects.
3. **Adapter Pattern**: Enables incompatible interfaces to work together.
4. **Observer Pattern**: Provides a subscription mechanism to allow multiple objects to listen and react to events.
5. **Strategy Pattern**: Enables selecting an algorithm's behavior at runtime.
6. **Factory Pattern**: Provides an interface for creating objects in a superclass but allows subclasses to alter the type of objects that will be created.

## Use Cases

- **Singleton Pattern**: A Logger class that ensures only one instance is used throughout the application.
- **Builder Pattern**: An APIRequestBuilder that constructs API requests with a fluent interface.
- **Adapter Pattern**: A WeatherAdapter that adapts an external weather API to a specific interface.
- **Observer Pattern**: A Sale class that notifies clients about sales events via email.
- **Strategy Pattern**: A payment processing system that allows different payment methods to be selected at runtime.
- **Factory Pattern**: A shape factory that creates different shapes based on user input.

## Implementation

The design patterns are implemented in a modular and reusable way to showcase their flexibility and ease of use. Each pattern is demonstrated with a specific use case and example code to illustrate its application.

## How to Run

To run the examples, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd exercise_1
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Compile TypeScript files**:
   ```bash
   npm run build
   ```

4. **Run the examples**:
   You can run the compiled JavaScript files located in the `dist` directory. For example:
   ```bash
   node dist/creational/case_1.js
   ```

## Design Pattern Folders

| Pattern          | Description                                   | Link                     |
|------------------|-----------------------------------------------|--------------------------|
| Singleton        | Logger class example                          | [Singleton](./src/creational/case_1.ts) |
| Builder          | APIRequestBuilder example                     | [Builder](./src/creational/case_2.ts) |
| Adapter          | WeatherAdapter example                        | [Adapter](./src/structural/case_2.ts) |
| Observer         | Sale class example                            | [Observer](./src/behavioral/case_1.ts) |
| Strategy         | Payment processing system example             | [Strategy](./src/behavioral/case_2.ts) |
| Factory          | Shape factory example                         | [Factory](./src/creational/case_3.ts) |

## Additional Information

- Ensure you have Node.js and npm installed on your machine.
- The project uses TypeScript, so make sure to have TypeScript installed globally if you want to compile it manually:
  ```bash
  npm install -g typescript
  ```

This README provides a comprehensive overview of the project, including how to run the examples and navigate through the design patterns implemented.