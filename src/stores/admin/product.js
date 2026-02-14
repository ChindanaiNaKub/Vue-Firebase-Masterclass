// Chapter 8: Admin Product store - localStorage product-data
import { defineStore } from 'pinia'

const defaultList = [
  {
    name: 'Vue.js Guide',
    imageUrl: 'https://fastly.picsum.photos/id/849/200/200.jpg',
    quantity: 10,
    remainQuantity: 10,
    about: 'คู่มือ Vue.js 3',
    status: 'open',
    price: 299,
    updatedAt: new Date().toLocaleString()
  },
  {
    name: 'Firebase Complete',
    imageUrl: 'https://fastly.picsum.photos/id/100/200/200.jpg',
    quantity: 5,
    remainQuantity: 5,
    about: 'เรียนรู้ Firebase',
    status: 'open',
    price: 399,
    updatedAt: new Date().toLocaleString()
  }
]

export const useAdminProductStore = defineStore('admin-product', {
  state: () => ({
    list: []
  }),
  actions: {
    loadProduct() {
      const productList = localStorage.getItem('product-data')
      if (productList) {
        this.list = JSON.parse(productList)
      } else {
        this.list = [...defaultList]
        localStorage.setItem('product-data', JSON.stringify(this.list))
      }
    },
    getProduct(index) {
      return this.list[parseInt(index, 10)]
    },
    addProduct(productData) {
      const item = {
        ...productData,
        remainQuantity: productData.quantity,
        price: productData.price != null ? productData.price : 0,
        updatedAt: new Date().toLocaleString()
      }
      this.list.push(item)
      localStorage.setItem('product-data', JSON.stringify(this.list))
    },
    updateProduct(index, productData) {
      const i = parseInt(index, 10)
      this.list[i] = {
        ...this.list[i],
        name: productData.name,
        imageUrl: productData.imageUrl,
        quantity: productData.quantity,
        remainQuantity: productData.quantity,
        about: productData.about || this.list[i].about,
        status: productData.status,
        price: productData.price != null ? productData.price : this.list[i].price,
        updatedAt: new Date().toLocaleString()
      }
      localStorage.setItem('product-data', JSON.stringify(this.list))
    },
    removeProduct(index) {
      this.list.splice(parseInt(index, 10), 1)
      localStorage.setItem('product-data', JSON.stringify(this.list))
    }
  }
})
