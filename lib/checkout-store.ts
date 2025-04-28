import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Coupon } from "@/config/coupons"

interface ShippingInfo {
  name: string
  phone: string
  email: string
  address: string
  city: string
  postalCode: string
  notes: string
}

interface PaymentMethod {
  type: string
  bank?: string
  wallet?: string
}

interface CheckoutState {
  shippingInfo: ShippingInfo
  appliedCoupon: Coupon | null
  paymentMethod: PaymentMethod
  setShippingInfo: (info: ShippingInfo) => void
  setAppliedCoupon: (coupon: Coupon | null) => void
  setPaymentMethod: (method: PaymentMethod) => void
  clearCheckout: () => void
  isShippingComplete: () => boolean
}

export const useCheckoutStore = create<CheckoutState>()(
  persist(
    (set, get) => ({
      shippingInfo: {
        name: "",
        phone: "",
        email: "",
        address: "",
        city: "",
        postalCode: "",
        notes: "",
      },
      appliedCoupon: null,
      paymentMethod: {
        type: "",
      },
      setShippingInfo: (info) => set({ shippingInfo: info }),
      setAppliedCoupon: (coupon) => set({ appliedCoupon: coupon }),
      setPaymentMethod: (method) => set({ paymentMethod: method }),
      clearCheckout: () =>
        set({
          shippingInfo: {
            name: "",
            phone: "",
            email: "",
            address: "",
            city: "",
            postalCode: "",
            notes: "",
          },
          appliedCoupon: null,
          paymentMethod: { type: "" },
        }),
      isShippingComplete: () => {
        const { shippingInfo } = get()
        return !!(
          shippingInfo.name &&
          shippingInfo.phone &&
          shippingInfo.email &&
          shippingInfo.address &&
          shippingInfo.city &&
          shippingInfo.postalCode
        )
      },
    }),
    {
      name: "checkout-storage",
    },
  ),
)
