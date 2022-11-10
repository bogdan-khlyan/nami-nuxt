module.exports = {
  middleware: ['router-middleware'],
  extendRoutes(routes, resolve) {
    routes.push({
      path: '/contacts',
      name: 'contacts',
      component: resolve('~/components/pages/contactsPage/Contacts')
    }, {
      path: '/delivery',
      name: 'delivery',
      component: resolve('~/components/pages/deliveryPage/DeliveryPage')
    }, {
      path: '/stocks',
      name: 'stocks',
      component: resolve('~/components/pages/stocksPage/StocksPage')
    }, {
      path: '/login',
      name: 'login',
      component: resolve('~/components/pages/loginPage/LoginPage')
    }, {
      path: '/favorites',
      name: 'favorites',
      component: resolve('~/components/pages/favoritesPage/FavoritesPage')
    }, {
      path: '/profile',
      component: resolve('~/components/pages/profilePage/ProfilePage'),
      children: [{
        path: '/profile',
        name: 'profile-info',
        meta: { requiresAuth: true },
        component: resolve('~/components/pages/profilePage/info/Info')
      }, {
        path: '/profile/orders',
        name: 'profile-orders',
        meta: { requiresAuth: true },
        component: resolve('~/components/pages/profilePage/orders/Orders')
      }, {
        path: '/profile/addresses',
        name: 'profile-addresses',
        meta: { requiresAuth: true },
        component: resolve('~/components/pages/profilePage/addresses/Addresses')
      }]
    }, {
      path: '/successful-order',
      name: 'successful-order',
      component: resolve('~/components/pages/successfulOrderPage/SuccessfulOrderPage')
    }, {
      path: '/product/:id',
      name: 'product',
      component: resolve('~/components/pages/productPage/ProductPage')
    })
  }
}
