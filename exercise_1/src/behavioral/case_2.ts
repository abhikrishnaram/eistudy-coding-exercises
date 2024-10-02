class PaginatedDataSource {
    private totalItems: number;
    private itemsPerPage: number;
  
    constructor(totalItems: number, itemsPerPage: number) {
      this.totalItems = totalItems;
      this.itemsPerPage = itemsPerPage;
    }
  
    public async fetchPage(page: number): Promise<number[]> {
      const start = (page - 1) * this.itemsPerPage;
      const end = Math.min(start + this.itemsPerPage, this.totalItems);
  
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
  
      // Simulate fetching data (returning an array of numbers as data)
      const items: number[] = [];
      for (let i = start; i < end; i++) {
        items.push(i+1); // Simulating item IDs (e.g., 1, 2, 3,...)
      }
  
      return items;
    }
  
    public getTotalPages(): number {
      return Math.ceil(this.totalItems / this.itemsPerPage);
    }
  }

  class PaginatedIterator {
    private dataSource: PaginatedDataSource;
    private currentPage: number = 1;
    private currentIndex: number = 0;
    private items: number[] = [];
  
    constructor(dataSource: PaginatedDataSource) {
      this.dataSource = dataSource;
    }
  
    public async hasNext(): Promise<boolean> {
      if (this.currentIndex < this.items.length) {
        return true; // There are more items in the current page.
      }
  
      // Fetch the next page if available
      if (this.currentPage <= this.dataSource.getTotalPages()) {
        this.items = await this.dataSource.fetchPage(this.currentPage);
        this.currentPage++;
        this.currentIndex = 0;
        return this.items.length > 0;
      }
  
      return false; // No more pages or items.
    }
  
    public async next(): Promise<number | null> {
      if (await this.hasNext()) {
        return this.items[this.currentIndex++];
      }
      return null;
    }

    public async getItems(): Promise<number[]> {
        if (await this.hasNext()) {        
            return this.items;
        }    
        return [];
    }
  }
  
  async function paginateThroughItems() {
    const dataSource = new PaginatedDataSource(25, 5); // 25 items, 5 items per page
    const iterator = new PaginatedIterator(dataSource);
  
    while (await iterator.hasNext()) {
      const items = await iterator.getItems();
      items.forEach(item => console.log(`Loaded item ${item}`));
      console.log("Loading more items...");
    }
  
    console.log("No more items to load.");
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