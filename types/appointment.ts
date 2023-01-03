import type * as Core from './core'
export type Appoitment = {
    id: string // uuid generated
    arrival: string
    owner: string
    puppyName: string
    requestedService: string // Can be enum with diff kind of services
    serviced: boolean
    prevAppoitmentId: Core.Nullable<string>
    nextAppoitmentId: Core.Nullable<string>
}

export type FormValues = {
	owner: string
	puppyName: string 
	requestedService: string
}

function serializeAppoitment(raw: any): Appoitment {
    return {
        ...raw,
        serviced: raw.serviced
    }
}

export const MOCK_LIST: Appoitment[] = [
    {
      id: "45658a88-6441-46b2-933a-23817d2c1fbc",
      arrival: "2022-12-05T12:00:00Z",
      owner: "Bill Thornberry",
      puppyName: "Cuddles",
      requestedService: "Grooming",
      serviced: true,
      prevAppoitmentId: null,
      nextAppoitmentId: "e9e365b7-8588-4205-bc03-b71cab3c1a8a"
    },
    {
      id: "7fb8834f-810c-4a47-ade6-ab7999c0167d",
      arrival: "2022-12-05T11:48:29Z",
      owner: "Jill Doe",
      puppyName: "Fluffy",
      requestedService: "Full Body Shave",
      serviced: false,
      prevAppoitmentId: "e9e365b7-8588-4205-bc03-b71cab3c1a8a",
      nextAppoitmentId: "70569642-3aca-4c9d-b72b-ca640a53e6a7"
    },
    {
      id: "70569642-3aca-4c9d-b72b-ca640a53e6a7",
      arrival: "2022-12-05T13:03:01Z",
      owner: "Diane de Poitiers",
      puppyName: "Marie",
      requestedService: "Exotic Hairdo",
      serviced: false,
      prevAppoitmentId: "7fb8834f-810c-4a47-ade6-ab7999c0167d",
      nextAppoitmentId: null
    },
    {
      id: "e9e365b7-8588-4205-bc03-b71cab3c1a8a",
      arrival: "2022-12-05T12:01:40Z",
      owner: "Bob Hope",
      puppyName: "Paws",
      requestedService: "Nail Clipping",
      serviced: false,
      prevAppoitmentId: "45658a88-6441-46b2-933a-23817d2c1fbc",
      nextAppoitmentId: "7fb8834f-810c-4a47-ade6-ab7999c0167d"
    }
  ]