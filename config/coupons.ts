export const coupons = [
  {
    code: "WELCOME30",
    type: "percentage",
    value: 30,
    minPurchase: 100000,
    description: "Diskon 30% untuk pembelian pertama minimum Rp100.000",
  },
  {
    code: "HEMAT5",
    type: "fixed",
    value: 5000,
    minPurchase: 50000,
    description: "Potongan Rp5.000 untuk minimum pembelian Rp50.000",
  },
  {
    code: "SUPER20",
    type: "fixed",
    value: 20000,
    minPurchase: 200000,
    description: "Potongan Rp20.000 untuk minimum pembelian Rp200.000",
  },
  {
    code: "MEGA50",
    type: "percentage",
    value: 50,
    minPurchase: 500000,
    description: "Diskon 50% untuk minimum pembelian Rp500.000",
  },
  {
    code: "FLASH80",
    type: "percentage",
    value: 80,
    minPurchase: 1000000,
    description: "Diskon 80% untuk minimum pembelian Rp1.000.000",
  },
]

export type Coupon = (typeof coupons)[0]
