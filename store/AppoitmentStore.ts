import create from 'zustand'
import { Appoitment, MOCK_LIST } from '../types'
import {
    addAppoitment,
    deleteAppoitment,
    orderAppoitmentsById,
    orderAppoitmentsByDate,
    toggleServiced,
    swapOrder
} from '../lib'

type AppoitmentState = {
    appoitments: Appoitment[]
    orderBy: 'id' | 'date'
}

type AppoitmentActions = {
    actions: {
        addAppoitment: (appoitment: Appoitment) => void
        deleteAppoitment: (appoitment: Appoitment) => void
        toggleServiced: (appoitmentId: string) => void
        swapAppoitmentOrder: (appoitment: Appoitment, orientation: 'left' | 'right') => void
        orderByDate: () => void
        orderById: () => void
    }
}

type AppoitmentStore = AppoitmentState & AppoitmentActions

const initialState: AppoitmentState = {
    appoitments: orderAppoitmentsById(MOCK_LIST),
    orderBy: 'id'
}

const useAppoitmentStore = create<AppoitmentStore>()((set, get) => ({
    ...initialState,
    actions: {
        addAppoitment:
            (appoitment) => set({
                appoitments: addAppoitment(get().appoitments, appoitment)
            }),
        deleteAppoitment:
            (appoitment) => set({
                appoitments: deleteAppoitment(get().appoitments, appoitment)
            }),
        toggleServiced:
            (appoitmentId) => set({
                appoitments: toggleServiced(get().appoitments, appoitmentId)
            }),
        swapAppoitmentOrder:
            (appoitment, orientation) => set({
                appoitments: swapOrder(get().appoitments, appoitment, orientation)
            }),
        orderByDate:
            () => set({
                appoitments: orderAppoitmentsByDate(get().appoitments),
                orderBy: 'date'
            }),
        orderById:
            () => set({
                appoitments: orderAppoitmentsById(get().appoitments),
                orderBy: 'id'
            }),
    }
}))

export const useAppoitments = () => useAppoitmentStore((state) => state.appoitments)
export const useAppoitmentsOrder = () => useAppoitmentStore((state) => state.orderBy)


export const useAppoitmentsActions = () => useAppoitmentStore((state) => state.actions)

