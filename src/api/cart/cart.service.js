import {OrdersRepository} from "@/api/orders/orders.repository";

export class CartService {

  #store = null
  #router = null
  #repository = new OrdersRepository()
  #notify = null

  constructor(app, notify) {
    this.#store = app.store
    this.#router = app.router
    this.#notify = notify
  }

  showCart() {
    this.#store.commit('cart.setIsVisibleCart', true)
  }

  hideCart() {
    this.#store.commit('cart.setIsVisibleCart', false)
  }

  addProduct(product) {
    product.count = 1
    this.#store.commit('cart.addProduct', product)
    this.notifyOrderInfo()
  }

  changeProductVariant(productId, variant) {
    this.#store.commit('cart.changeProductVariant', { productId, variant })
  }

  changeProductCount(productId, count) {
    this.#store.commit('cart.changeProductCount', { productId, count })
    this.notifyOrderInfo()
  }

  removeProduct(productId) {
    this.#store.commit('cart.removeProduct', productId)
    this.notifyOrderInfo('Товар удален из корзины')
  }

  notifyOrderInfo(title = 'Товар добавлен в корзину') {
    let productCount = this.#store.getters['cart.count']
    let productsCost = this.#store.getters['cart.cost']

    this.#notify.success({
      title,
      message: productCount ?
        `Всего товаров ${productCount} на сумму ${productsCost}₽` :
        'Корзина пуста'
    })
  }

}

export default {}
