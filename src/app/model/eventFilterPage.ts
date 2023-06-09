export class EventFilterPage {
  find: string;
  totalItems: number;
  pageSize: number;
  currentPage: number;

  constructor() {
    this.pageSize = 3;
    this.currentPage = 0;
    this.totalItems = 0;
  }

}
