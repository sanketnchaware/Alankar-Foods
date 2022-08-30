import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { Server: 'running...!' }
})

//order
Route.group(() => {
  Route.resource('orders', 'OrderController').middleware({
    show: ['find:Order'],
    update: ['find:Order'],
    destroy: ['find:Order'],
  })
  Route.get('coupons-check', 'OrderController.checkCoupon')
  Route.patch('orders/payment/status/:id', 'OrderController.updateStatus')
  Route.patch('table/transfer/:id', 'OrderController.tableTransfer')
  Route.get('past-orders', 'OrderController.pastOrder')
  Route.get('active-orders', 'OrderController.activeOrder')
  Route.get('takeaway-orders', 'OrderController.takeAwayOrder')
  Route.get('remove/coupon', 'OrderController.removeCoupon')

  //table
  Route.resource('tables', 'TablesController').middleware({
    show: ['find:Table'],
    update: ['find:Table'],
    destroy: ['find:Table'],
  })
  Route.get('list/tables', 'TablesController.listTables')
  Route.patch('tables/status/:id', 'TablesController.updateStatus')
  Route.get('table/drop/down', 'TablesController.tableDropDown')
  Route.get('list-tab', 'TablesController.listTab')
  Route.get('rolewise', 'TablesController.rolewise')

  //coupon
  Route.resource('coupons', 'CouponsController').middleware({
    show: ['find:Coupon'],
    update: ['find:Coupon'],
    destroy: ['find:Coupon'],
  })
  Route.patch('coupon-status/:id', 'CouponsController.couponStatus')
  Route.patch('updateCouponStatus/:id', 'CouponsController.updateCouponStatus')

  //role
  Route.resource('role', 'RolesController').middleware({
    show: ['find:Role'],
    update: ['find:Role'],
    destroy: ['find:Role'],
  })

  //store
  Route.resource('stores', 'StoresController').middleware({
    show: ['find:Store'],
    update: ['find:Store'],
    destroy: ['find:Store'],
  })
  Route.get('gst', 'StoresController.gstFromStore')
})
  .prefix('admin')
  .middleware('auth')

Route.post('login', 'AuthController.login')
Route.patch('item/status/update/:id','MetasController.itemsStatusUpdateOnPaid')
//categories
Route.group(() => {
  Route.patch('categories/status/:id', 'CategoryController.updateStatus').middleware(
    'find:Category'
  )
  Route.get('sub-category', 'CategoryController.subCategory')
  Route.get('category-data', 'CategoryController.searchCategory')
  Route.get('category/drop-down', 'CategoryController.categoryDropdown')
  Route.resource('categories', 'CategoryController')
    .middleware({
      show: ['find:Category'],
      update: ['find:Category'],
      destroy: ['find:Category'],
    })
    .apiOnly()

  //menus
  Route.patch('update/menu/status/:id', 'MenuController.changeMenuStatus').middleware('find:Menu')
  Route.patch('menus/availability_count/:id', 'MenuController.updateAvailabilityCount').middleware(
    'find:Menu'
  )
  Route.get('list-menu', 'MenuController.getMenu')
  Route.get('search-menu', 'MenuController.searchMenu')
  Route.get('getKdsData', 'MenuController.getMenuByKdsId')
  Route.get('menu', 'MenuController.menuByCategoryandKdsId')
  Route.get('search/menu','MenuController.searchMenuForOrder')

  Route.resource('menus', 'MenuController')
    .middleware({
      show: ['find:Menu'],
      update: ['find:Menu'],
      destroy: ['find:Menu'],
    })
    .apiOnly()

  //users
  Route.get('users/dropdown', 'UserController.usersDropDown')
  Route.patch('users/status/:id', 'UserController.updateStatus').middleware('find:User')
  Route.resource('users', 'UserController')
    .middleware({
      show: ['find:User'],
      update: ['find:User'],
      destroy: ['find:User'],
    })
    .except(['destroy'])
    .apiOnly()
})
  .prefix('admin')
  .middleware('auth')

Route.post('/upload-image', 'UploadsController.uploadImage')

Route.group(() => {
  //reports
  Route.get('reports/stats/dashboard', 'ReportsController.dashBoardRevenue')
  Route.get('reports/graph', 'ReportsController.graphStats')
  Route.get('reports/graph/range', 'ReportsController.graphStatsRange')
  Route.get('reports/sales', 'ReportsController.salesReport')
  Route.get('reports/sales/stats', 'ReportsController.reportStats')
  Route.get('reports/feedbacks/stats', 'FeedbacksController.feedbackStats')
  Route.get('reports/stats/dashboard/top', 'ReportsController.countStats')
  Route.get('reports/stats/feedback', 'ReportsController.feedbackCount')
  Route.get('reports/staff/report', 'ReportsController.staffReport')

  //kds
  Route.resource('kds', 'KdsController').middleware({
    show: ['find:Kd'],
    update: ['find:Kd'],
    destroy: ['find:Kd'],
  })
  Route.get('kds-order', 'KdsController.kds')
  Route.get('kds-id', 'KdsController.kds')
  Route.get('kdswiseMenu', 'KdsController.kdsWiseMenu')

  //metaOrder
  Route.resource('meta', 'MetasController')
  Route.get('items/status/count', 'MetasController.countCooking')
  Route.resource('meta-order', 'MetasController')


  //bill
  Route.get('print-bills', 'PrintbillsController.printBill')
}).middleware('auth')

//feedbacks
Route.resource('feedback', 'FeedbacksController').middleware({
  show: ['find:Feedback'],
  update: ['find:Feedback'],
  destroy: ['find:Feedback'],
})

//MobileView
Route.resource('menu-view', 'MobileViewsController')
Route.get('menu-view-mealType', 'MobileViewsController.menus')
Route.get('categories/mealType', 'MobileViewsController.categoriesOnMealType')
Route.get('menu-on-category', 'MobileViewsController.menuSearchCategory')

Route.post('sms', 'ResetController.sendOrderSMS')

