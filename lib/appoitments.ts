import { Appoitment, Optional, Nullable, FormValues } from '../types'
import { sortDate } from './dateAndTime'
import { v4 as uuidv4 } from 'uuid';


function isTail(node: Appoitment): boolean {
    return node.nextAppoitmentId === null
}

function isHead(node: Appoitment): boolean {
    return node.prevAppoitmentId === null
}

function findHead(list: Appoitment[]): Optional<Appoitment> {
    if(list.length === 1) return list[0]

    return list.find(node => isHead(node))
}

function findTail(list: Appoitment[]): Optional<Appoitment> {
    if(list.length === 2) return list[1]

    return list.find(node => isTail(node))
}

function getAppoitment(
    appoitmentId: Nullable<string>, 
    list: Appoitment[]
): Optional<Appoitment> {
    if(appoitmentId === null) return undefined
    return list.find(appt => appt.id === appoitmentId)
}

export function createAppoitment(formData: FormValues): Appoitment {
	const id = uuidv4() 
	const arrival = new Date().toISOString()

    return {
        id,
        arrival,
        owner: formData.owner,
        puppyName: formData.puppyName,
        requestedService: formData.requestedService,
        serviced: false,
        nextAppoitmentId: null,
        prevAppoitmentId: null
    }
}

export function addAppoitment(list: Appoitment[], node: Appoitment): Appoitment[] {
    const tail = findTail(list)

    if(!tail) {
        return [{
            ...node, 
            prevAppoitmentId: null,
            nextAppoitmentId: null,
        }]
    }

    const tempTail: Appoitment = {
        ...tail,
        nextAppoitmentId: node.id
    }

    const newAppoitment: Appoitment = {
        ...node, 
        prevAppoitmentId: tail.id,
        nextAppoitmentId: null
    }

    // Remove tail to replace with updated one.
    const newList: Appoitment[] = list.slice(0, list.length - 1)
    
    newList.push(tempTail, newAppoitment)

    return newList
}

export function deleteAppoitment(list: Appoitment[], node: Appoitment): Appoitment[] {
    if(isHead(node)) {
        const newHead = getAppoitment(node.nextAppoitmentId, list)
        // Remove head and update with new one
        const newList = list.slice(2, list.length)

        if(newHead) {
            newList.unshift({
                ...newHead,
                prevAppoitmentId: null,
            })
        }
        return newList
    }

    if(isTail(node)) {
        const newTail = getAppoitment(node.prevAppoitmentId, list)

        const newList = list.slice(0, list.length - 2)
        
        if(newTail) {
            newList.push({
                ...newTail,
                nextAppoitmentId: null
            })
        }
        return newList
    }

    const newList: Appoitment[] = []

    const prevNode = getAppoitment(node.prevAppoitmentId, list)
    const nextNode = getAppoitment(node.nextAppoitmentId, list)

    for(let index = 0; index < list.length; index++){
        if(list[index].id === prevNode?.id) {
            newList.push({
                ...list[index],
                nextAppoitmentId: nextNode?.id
            }) 
        } else if(list[index].id === nextNode?.id) {
            newList.push({
                ...list[index],
                prevAppoitmentId: prevNode?.id
            })
        } else {
            if(list[index].id !== node.id)
                newList.push(list[index])
        }
    }
    return newList
}

export function swapOrder(
    list: Appoitment[], 
    appoitment: Appoitment, 
    orientation: 'left' | 'right'
): Appoitment [] {



    return list
}

export function toggleServiced(list: Appoitment[], appoitmentId: string): Appoitment[] {
    return list.map(
        (appoitment) => {
            if(appoitment.id === appoitmentId) {
                return {
                    ...appoitment, 
                    serviced: !appoitment.serviced
                }
            } else return appoitment
        }
    )
}

export function orderAppoitmentsById(list: Appoitment[]): Appoitment[] {
    let newOrder: Appoitment[] = []
    const head = findHead(list)
    
    if(head) {
        newOrder.push(head)
        let nextAppoitment = getAppoitment(head.nextAppoitmentId, list)

        while(nextAppoitment) {
            newOrder.push(nextAppoitment)
            nextAppoitment = getAppoitment(nextAppoitment.nextAppoitmentId, list)
        }
    } 
    return newOrder
}

export function orderAppoitmentsByDate(list: Appoitment[]): Appoitment[] {
    const newList = [...list]
    return newList.sort(
        (a, b) => sortDate(new Date(a.arrival), new Date(b.arrival))
    )
}