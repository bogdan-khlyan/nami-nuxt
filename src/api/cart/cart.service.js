export default ({ $axios, store, router, $toast }) => ({
  showCart() {
    store.commit('cart.setIsVisibleCart', true)
  },
  hideCart() {
    store.commit('cart.setIsVisibleCart', false)
  },
  addProduct(product) {
    ym(90714880,'reachGoal','add-product-to-cart')
    store.commit('cart.addProduct', {
      ...product,
      count: 1
    })
    this.notifyOrderInfo()
  },
  // changeProductVariant(productId, variant) {
  //   store.commit('cart.changeProductVariant', { productId, variant })
  // },
  changeProductCount(productId, variantId, count) {
    store.commit('cart.changeProductCount', { productId, variantId, count })
    this.notifyOrderInfo()
  },
  removeProduct(productId, variantId) {
    store.commit('cart.removeProduct', { productId, variantId })
    this.notifyOrderInfo('Товар удален из корзины')
  },
  notifyOrderInfo(title = 'Товар добавлен в корзину') {
    let productCount = store.getters['cart.count']
    let productsCost = store.getters['cart.cost']

    $toast.success(
      (title ? title + '<br>' : '') +
      (productCount ?
        `Всего товаров ${productCount} на сумму ${productsCost}₽` :
        'Корзина пуста')
    )
  }
})
