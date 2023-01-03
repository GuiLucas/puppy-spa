import { useMemo, useState } from "react"
import { Appoitment } from "../../types"
import { CheckCircledIcon } from '@radix-ui/react-icons'
import { useAppoitments, useAppoitmentsActions } from "../../store"
import { makeReadableDate, orderAppoitments, orderAppoitmentsByDate } from "../../lib"

type CardProps = {
    appoitment: Appoitment
}

function Card(props: CardProps) {
    const { appoitment } = props

    const {
        deleteAppoitment, 
        toggleServiced
    } = useAppoitmentsActions()

    const arrivalDate = makeReadableDate(new Date(appoitment.arrival))

    return <section style={{border: '1px solid white', padding: '1rem', borderRadius: '8px', marginBottom: '8px', minWidth: '300px', backgroundColor: 'white'}}>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <h2>{appoitment.puppyName}</h2>
            <div title="Mark as Serviced">
                <CheckCircledIcon 
                    color={appoitment.serviced ? 'green' : 'red'} 
                    onClick={() => toggleServiced(appoitment.id)} 
                />
            </div>
        </div>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <p><em>{appoitment.requestedService}</em></p>
            <p>{appoitment.owner}</p>
        </div>
        <div style={{textAlign: 'right'}} onClick={() => deleteAppoitment(appoitment)}>
            <p style={{fontSize: '0.7rem'}}>{arrivalDate}</p>
        </div>        
    </section>
}

type WaitlistProps = {
    list: Appoitment[]
}
export function Waitlist(props: WaitlistProps) {

    const { list } = props

    return <div>
        {
            list.map(
                appoitment => <Card key={appoitment.id} appoitment={appoitment}/>
            )
        }
    </div>
}