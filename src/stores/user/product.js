// Chapter 7-8: User Product store - โหลดจาก localStorage product-data (เดียวกับ Admin)
import { defineStore } from 'pinia'

export const useUserProductStore = defineStore('user-product', {
  state: () => ({
    list: [],
    loaded: false
  }),
  actions: {
    loadProduct() {
      const productList = localStorage.getItem('product-data')
      if (productList) {
        const raw = JSON.parse(productList)
        this.list = raw
          .filter(p => p.status === 'open')
          .map(p => ({
            name: p.name,
            imageUrl: p.imageUrl,
            quantity: p.remainQuantity != null ? p.remainQuantity : p.quantity,
            about: p.about,
            status: p.status,
            price: p.price != null ? p.price : 0
          }))
      }
      this.loaded = true
    },
    filterProducts(searchName) {
      if (!searchName || !searchName.trim()) return this.list
      return this.list.filter(product =>
        product.name.toLowerCase().includes(searchName.toLowerCase())
      )
    }
  }
})
