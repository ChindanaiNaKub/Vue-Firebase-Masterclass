// Chapter 8: Admin Order store - โหลดจาก checkout-data + mock
import { defineStore } from 'pinia'

const mockOrders = [
  {
    no: 'A112234',
    customerName: 'นายทดสอบ นะ',
    totalPrice: '25,000',
    status: 'Payment Completed',
    address: '111/892 Nonthaburi Thailand 99999',
    paymentMethod: 'Credit card',
    updatedAt: '9/15/2023, 11:50:24 PM',
    products: [
      { name: 'ทดสอบ', description: 'รายละเอียดสินค้า 1', imageUrl: 'https://fastly.picsum.photos/id/928/200/200.jpg', quantity: 1, price: '13,000' },
      { name: 'ทดสอบ 2', description: 'รายละเอียดสินค้า 2', imageUrl: 'https://fastly.picsum.photos/id/59/200/200.jpg', quantity: 1, price: '12,000' }
    ]
  }
]

export const useAdminOrderStore = defineStore('admin-order', {
  state: () => ({
    list: []
  }),
  actions: {
    loadOrders() {
      const checkoutData = localStorage.getItem('checkout-data')
      if (checkoutData) {
        const order = JSON.parse(checkoutData)
        const adminOrder = {
          no: order.orderNumber,
          customerName: order.name || 'Guest',
          totalPrice: String(order.totalPrice),
          status: 'Payment Completed',
          address: order.address || '-',
          paymentMethod: order.paymentMethod || 'Credit Card',
          updatedAt: order.createdAt,
          products: (order.products || []).map(p => ({
            name: p.name,
            description: p.about || '',
            imageUrl: p.imageUrl || '',
            quantity: p.quantity,
            price: String(p.price * p.quantity)
          }))
        }
        this.list = [adminOrder, ...mockOrders]
      } else {
        this.list = [...mockOrders]
      }
    },
    getOrder(index) {
      return this.list[parseInt(index, 10)]
    }
  }
})
