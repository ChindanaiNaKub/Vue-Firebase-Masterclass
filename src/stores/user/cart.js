// Chapter 7: Cart store - ตะกร้าสินค้า + checkout
import { defineStore } from 'pinia'

export const useUserCartStore = defineStore('user-cart', {
  state: () => ({
    items: [],
    lastCheckout: {}  // เก็บข้อมูล order ล่าสุด (ไม่ใช้ชื่อ checkout เพื่อไม่บัง action)
  }),
  getters: {
    summaryPrice(state) {
      return state.items.reduce((acc, item) => acc + (item.price * item.quantity), 0)
    },
    quantity(state) {
      return state.items.reduce((acc, item) => acc + item.quantity, 0)
    }
  },
  actions: {
    loadCart() {
      const cartItem = localStorage.getItem('cart-item')
      if (cartItem) {
        this.items = JSON.parse(cartItem)
      }
    },
    addToCart(productData) {
      const itemIndex = this.items.findIndex(item => item.name === productData.name)
      if (itemIndex >= 0) {
        this.updateQuantity(itemIndex, this.items[itemIndex].quantity + 1)
      } else {
        this.items.push({ ...productData, quantity: 1 })
      }
      localStorage.setItem('cart-item', JSON.stringify(this.items))
    },
    updateQuantity(index, quantity) {
      this.items[index].quantity = parseInt(quantity, 10)
      localStorage.setItem('cart-item', JSON.stringify(this.items))
    },
    removeItemInCart(index) {
      this.items.splice(index, 1)
      localStorage.setItem('cart-item', JSON.stringify(this.items))
    },
    checkout(checkoutData) {
      const checkout = {
        ...checkoutData,
        totalPrice: this.summaryPrice,
        paymentMethod: 'Credit Card',
        createdAt: new Date().toLocaleString(),
        orderNumber: `AA${(Math.floor(Math.random() * 900000) + 100000).toString()}`,
        products: [...this.items]
      }
      localStorage.setItem('checkout-data', JSON.stringify(checkout))
      this.lastCheckout = checkout
      this.items = []
      localStorage.removeItem('cart-item')
    },
    loadCheckout() {
      const checkoutData = localStorage.getItem('checkout-data')
      if (checkoutData) {
        this.lastCheckout = JSON.parse(checkoutData)
      }
    }
  }
})
