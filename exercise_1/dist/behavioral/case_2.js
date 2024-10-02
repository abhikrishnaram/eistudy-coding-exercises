"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class PaginatedDataSource {
    constructor(totalItems, itemsPerPage) {
        this.totalItems = totalItems;
        this.itemsPerPage = itemsPerPage;
    }
    fetchPage(page) {
        return __awaiter(this, void 0, void 0, function* () {
            const start = (page - 1) * this.itemsPerPage;
            const end = Math.min(start + this.itemsPerPage, this.totalItems);
            // Simulate network delay
            yield new Promise(resolve => setTimeout(resolve, 500));
            // Simulate fetching data (returning an array of numbers as data)
            const items = [];
            for (let i = start; i < end; i++) {
                items.push(i + 1); // Simulating item IDs (e.g., 1, 2, 3,...)
            }
            return items;
        });
    }
    getTotalPages() {
        return Math.ceil(this.totalItems / this.itemsPerPage);
    }
}
class PaginatedIterator {
    constructor(dataSource) {
        this.currentPage = 1;
        this.currentIndex = 0;
        this.items = [];
        this.dataSource = dataSource;
    }
    hasNext() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.currentIndex < this.items.length) {
                return true; // There are more items in the current page.
            }
            // Fetch the next page if available
            if (this.currentPage <= this.dataSource.getTotalPages()) {
                this.items = yield this.dataSource.fetchPage(this.currentPage);
                this.currentPage++;
                this.currentIndex = 0;
                return this.items.length > 0;
            }
            return false; // No more pages or items.
        });
    }
    next() {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield this.hasNext()) {
                return this.items[this.currentIndex++];
            }
            return null;
        });
    }
    getItems() {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield this.hasNext()) {
                return this.items;
            }
            return [];
        });
    }
}
function paginateThroughItems() {
    return __awaiter(this, void 0, void 0, function* () {
        const dataSource = new PaginatedDataSource(25, 5); // 25 items, 5 items per page
        const iterator = new PaginatedIterator(dataSource);
        while (yield iterator.hasNext()) {
            const items = yield iterator.getItems();
            items.forEach(item => console.log(`Loaded item ${item}`));
            console.log("Loading more items...");
        }
        console.log("No more items to load.");
    });
}
paginateThroughItems();
/*
Output:

Loaded item 1
Loaded item 2
Loaded item 3
Loaded item 4
Loaded item 5
Loading more items...
Loaded item 6
Loaded item 7
Loaded item 8
Loaded item 9
Loaded item 10
Loading more items...
Loaded item 11
Loaded item 12
...
Loaded item 25
Loading more items...
No more items to load.

----------------------------------------

Explanation:
The PaginatedDataSource class represents a data source with a fixed number of total items and a fixed number of items per page.
The PaginatedIterator class provides an iterator interface to paginate through the items in the data source.
The paginateThroughItems function demonstrates how to use the PaginatedDataSource and PaginatedIterator to load and display paginated items.
This example simulates fetching items from a paginated data source with a delay to demonstrate the asynchronous nature of pagination.

A real-world example of using Iterator pattern is paginating through search results on a website or application.
*/ 
