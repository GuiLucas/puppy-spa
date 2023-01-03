import create from 'zustand'
import { Appoitment, MOCK_LIST } from '../types'
import { 
    addAppoitment, 
    deleteAppoitment, 
    orderAppoitments, 
    orderAppoitmentsByDate, 
    toggleServiced 
} from '../lib'

type AppoitmentState = {
    appoitments: Appoitment[]
}

type AppoitmentActions = {
    actions: {
        addAppoitment: (appoitment: Appoitment) => void
        deleteAppoitment: (appoitment: Appoitment) => void
        toggleServiced: (appoitmentId: string) => void
    }
}

type AppoitmentStore = AppoitmentState & AppoitmentActions

const initialState: AppoitmentState = {
    appoitments: orderAppoitments(MOCK_LIST)
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
    }
}))

export const useAppoitments = () => useAppoitmentStore((state) => state.appoitments)

export const useAppoitmentsActions = () => useAppoitmentStore((state) => state.actions)
