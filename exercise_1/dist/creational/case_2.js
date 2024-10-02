"use strict";
// creational/apiRequestBuilder.ts
class APIRequest {
    // Private constructor to prevent direct instantiation
    constructor(builder) {
        this.headers = {};
        this.queryParams = {};
        this.method = builder.method;
        this.url = builder.url;
        this.headers = builder.headers;
        this.queryParams = builder.queryParams;
        this.body = builder.body;
    }
    // Method to display request details
    describe() {
        return `Request: ${this.method} ${this.url} \nHeaders: ${JSON.stringify(this.headers)} \nQuery Params: ${JSON.stringify(this.queryParams)} \nBody: ${JSON.stringify(this.body)}`;
    }
    // Method to display request details in curl format
    getCurlCommand() {
        let curlCommand = `curl -X ${this.method} '${this.url}`;
        // Add query parameters
        if (Object.keys(this.queryParams).length > 0) {
            const queryString = new URLSearchParams(this.queryParams).toString();
            curlCommand += `?${queryString}'`;
        }
        // Add headers using for...in loop
        for (const key in this.headers) {
            if (this.headers.hasOwnProperty(key)) {
                const value = this.headers[key];
                curlCommand += ` -H '${key}: ${value}'`;
            }
        }
        // Add body if present
        if (this.body) {
            curlCommand += ` -d '${JSON.stringify(this.body)}'`;
        }
        return curlCommand;
    }
    // Builder class
    static get Builder() {
        return new APIRequestBuilder();
    }
}
class APIRequestBuilder {
    constructor() {
        this.method = "GET";
        this.url = "";
        this.headers = {};
        this.queryParams = {};
    }
    // Method to set the HTTP method
    setMethod(method) {
        this.method = method;
        return this;
    }
    // Method to set the URL
    setURL(url) {
        this.url = url;
        return this;
    }
    // Method to add a header
    addHeader(key, value) {
        this.headers[key] = value;
        return this;
    }
    // Method to add a query parameter
    addQueryParam(key, value) {
        this.queryParams[key] = value;
        return this;
    }
    // Method to set the request body
    setBody(body) {
        this.body = body;
        return this;
    }
    // Method to build the API request
    build() {
        return new APIRequest(this);
    }
}
// Usage example
const apiRequest = APIRequest.Builder
    .setMethod("POST")
    .setURL("https://api.example.com/data")
    .addHeader("Content-Type", "application/json")
    .addQueryParam("userId", "123")
    .setBody({ name: "John Doe", age: 30 })
    .build();
console.log(apiRequest.getCurlCommand());
/*
Output:

curl -X POST 'https://api.example.com/data?userId=123' -H 'Content-Type: application/json' -d '{"name":"John Doe","age":30}'

----------------------------------------

Explanation:

The APIRequest class represents an API request with various properties like method, URL, headers, query parameters, and body.
The APIRequestBuilder class is a builder class that allows the construction of APIRequest objects with a fluent interface.
This is an example of the Builder design pattern, which is used to construct complex objects step by step.

A real example of this pattern is the Promise object in JavaScript.
The Promise object is used for asynchronous programming and represents a value that may be available now, in the future, or never.
The Promise object has methods like then(), catch(), and finally() that allow you to handle the result of the asynchronous operation.
*/ 
