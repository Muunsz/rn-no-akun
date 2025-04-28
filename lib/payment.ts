import { create } from "zustand"

export type PaymentMethod = "bank_transfer" | "credit_card" | "e-wallet" | "virtual_account" | "cod"

export type PaymentStatus = "pending" | "processing" | "success" | "failed" | "expired"

export interface PaymentDetails {
  method: PaymentMethod
  provider?: string
  accountNumber?: string
  expiryTime?: string
  amount: number
  status: PaymentStatus
  transactionId?: string
  paymentUrl?: string
  qrCode?: string
}

interface PaymentState {
  currentPayment: PaymentDetails | null
  paymentHistory: PaymentDetails[]
  initiatePayment: (details: Omit<PaymentDetails, "status" | "transactionId">) => Promise<PaymentDetails>
  checkPaymentStatus: (transactionId: string) => Promise<PaymentStatus>
  setCurrentPayment: (payment: PaymentDetails | null) => void
  clearCurrentPayment: () => void
}

export const usePayment = create<PaymentState>((set, get) => ({
  currentPayment: null,
  paymentHistory: [],

  initiatePayment: async (details) => {
    // Simulate API call to payment gateway
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const transactionId = Math.random().toString(36).substr(2, 9)

    const paymentDetails: PaymentDetails = {
      ...details,
      status: "pending",
      transactionId,
      paymentUrl: `https://payment-gateway.example/pay/${transactionId}`,
      qrCode: details.method === "e-wallet" ? `https://example.com/qr/${transactionId}` : undefined,
      expiryTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours from now
    }

    set((state) => ({
      currentPayment: paymentDetails,
      paymentHistory: [...state.paymentHistory, paymentDetails],
    }))

    return paymentDetails
  },

  checkPaymentStatus: async (transactionId) => {
    // Simulate API call to check payment status
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Simulate random payment status for demo
    const statuses: PaymentStatus[] = ["pending", "processing", "success", "failed", "expired"]
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)]

    set((state) => ({
      paymentHistory: state.paymentHistory.map((payment) =>
        payment.transactionId === transactionId ? { ...payment, status: randomStatus } : payment,
      ),
      currentPayment:
        state.currentPayment?.transactionId === transactionId
          ? { ...state.currentPayment, status: randomStatus }
          : state.currentPayment,
    }))

    return randomStatus
  },

  setCurrentPayment: (payment) => {
    set({ currentPayment: payment })
  },

  clearCurrentPayment: () => {
    set({ currentPayment: null })
  },
}))
