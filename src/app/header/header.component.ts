// import {
//   AfterViewInit,
//   Component,
//   ElementRef,
//   HostListener,
//   OnDestroy,
//   OnInit, Renderer2,
//   TemplateRef,
//   ViewChild,
// } from '@angular/core';
// import {getTengeSymbol} from "../util/stringUtil";
// import {Event} from "../model/Event";
//
//
// @Component({
//   selector: 'asar-header',
//   templateUrl: './header.component.html',
//   styleUrls: ['./header.component.scss'],
// })
// export class HeaderComponent implements OnInit, OnDestroy, AfterViewInit {
//   categoryList: Event[];
//   popoverRef: PopoverRef;
//   currency = getTengeSymbol();
//
//   private readonly subs = new SubSink();
//   search: '';
//   showCatalog = false;
//
//   @ViewChild('catalogButton') catalogButton: ElementRef;
//   @ViewChild('catalogModal') catalogModal: ElementRef;
//
//
//   @HostListener('window:unload', ['$event']) unloadHandler() {
//     this.hotDataService.saveHotDataInStorage();
//   }
//
//   @HostListener('window:pagehide', ['$event']) pageHideHandler() {
//     this.hotDataService.saveHotDataInStorage();
//   }
//
//   @HostListener('document:mousedown', ['$event'])
//   onGlobalClick(event): void {
//     if (!this.catalogModal?.nativeElement.contains(event.target)) {
//       this.showCatalog = false;
//     }
//   }
//
//   constructor(private readonly popover: Popover,
//               public activeRoute: ActivatedRoute,
//               public authService: AuthService,
//               private readonly router: Router,
//               public cartService: CartService,
//               public filterService: FilterService,
//               private readonly categoryService: CategoryService,
//               private readonly catalogPathService: CatalogPathService,
//               private hotDataService: hotDataService,
//               public progress: NgProgress,
//               private renderer: Renderer2,
//               public notificationService: AsarNotificationService) {}
//
//   ngOnInit(): void {
//
//     this.filterService.init();
//     this.progress.ref().start();
//     this.subs.sink = this.categoryService.loadAllCategories()
//                          .pipe(tap(x => this.categoryList = x))
//                          .subscribe(() => this.progress.ref().complete());
//   }
//
//   async ngAfterViewInit() {
//     await this.authService.init().then(
//       () => this.subs.sink = this.notificationService.getNotificationCount(this.authService.authInfo.personId).subscribe(),
//       () => null);
//     if (this.authService.authInfo) {
//       this.cartService.init();
//     } else {
//       this.hotDataService.fetchInStorageHotData();
//     }
//   }
//
//   openPopover(origin: HTMLElement, content: TemplateRef<any>) {
//     this.popoverRef = this.popover.open({
//       origin,
//       content,
//       needArrow: false,
//       hasBackdrop: true,
//       position: Position.bottom,
//     });
//   }
//
//
//   get loggedIn(): boolean {
//     return !!this.authService.authInfo;
//   }
//
//   async logout() {
//     if (this.popoverRef) {
//       this.popoverRef.close();
//     }
//
//     await this.authService.out();
//     await this.router.navigateByUrl('/login');
//   }
//
//   async goToProfile() {
//     await this.router.navigateByUrl('profile');
//   }
//
//   async navigateToCart() {
//     await this.router.navigateByUrl('cart');
//   }
//
//   ngOnDestroy(): void {
//     this.hotDataService.saveHotDataInStorage();
//     this.subs.unsubscribe();
//   }
//
//   openCategoryCatalog(category: Category) {
//     this.showCatalog = false;
//
//     const catalogPath: CatalogPath[] = [{
//       id: category.id,
//       fieldCode: ProductBoCodes.CATEGORY_NAME,
//       name: category.name,
//       url: 'catalog',
//     }];
//     this.catalogPathService.init(catalogPath);
//
//     this.categoryService.selectedProductType.next(null);
//
//     const queryParams = catalogPath[catalogPath.length - 1];
//     this.router.navigate(['catalog'], { queryParams }).then();
//
//     this.popoverRef.close();
//   }
//
//   openCatalog() {
//
//     this.showCatalog = true;
//
//     // this.resetSearchFilter();
//     //
//     // this.catalogPathService.init(undefined);
//     // this.filterService.resetFilters();
//     // this.categoryService.selectedProductType.next(null);
//     // this.router.navigateByUrl('catalog').then();
//   }
//
//   openCatalogProductType(productType: ProductType, category: Category) {
//     const self = this;
//     this.showCatalog = false;
//
//     this.resetSearchFilter();
//
//     const catalogPath: CatalogPath[] = [{
//       id: category.id,
//       fieldCode: ProductBoCodes.CATEGORY_NAME,
//       name: category.name,
//       url: 'catalog',
//     }, {
//       id: productType.id,
//       fieldCode: ProductBoCodes.PRODUCT_TYPE,
//       name: productType.name,
//       parentId: productType.categoryId,
//       url: 'catalog',
//     },
//     ];
//     self.catalogPathService.init(catalogPath);
//
//     self.categoryService.selectedProductType.next(productType);
//
//     const queryParams = catalogPath[catalogPath.length - 1];
//     self.router.navigate([queryParams.url], { queryParams }).then();
//
//     this.popoverRef.close();
//   }
//
//   resetSearchFilter() {
//     this.filterService.search.next('');
//     this.search = null;
//   }
//
//   searchProducts(search: string) {
//
//     const queryParams = {
//       search: search,
//     };
//     this.catalogPathService.init([]);
//     this.filterService.resetFilters();
//     this.categoryService.selectedProductType.next(null);
//     this.router.navigate(['catalog'], { queryParams }).then();
//   }
//
//
//   goToNotification() {
//     const queryParams = {
//       content: ProfileContentType.NOTIFICATIONS,
//     };
//     this.router.navigate(['profile'], { queryParams }).then();
//   }
// }
