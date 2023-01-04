import {
    CheckCircledIcon,
    CrossCircledIcon,
    ArrowUpIcon,
    ArrowDownIcon
} from '@radix-ui/react-icons'
import { Appoitment } from "../../types"
import { useAppoitmentsActions, useAppoitmentsOrder } from "../../store"
import { makeReadableDate } from "../../lib"
import styles from './Waitlist.module.css'

type CardProps = {
    appoitment: Appoitment
}

function Card(props: CardProps) {
    const { appoitment } = props

    const {
        deleteAppoitment,
        toggleServiced,
        swapAppoitmentOrder
    } = useAppoitmentsActions()

    const orderBy = useAppoitmentsOrder()
    // Disabled swap of items when ordered by Date because it was causing random deletes
    const disableSwap = orderBy === 'date'

    const arrivalDate = makeReadableDate(new Date(appoitment.arrival))

    return <section className={styles.Card}>

        <div className={styles.CardSection}>
            <h2>{appoitment.puppyName}</h2>
            <div style={{ display: 'inherit', gap: '4px' }}>
                <div 
                    title='Move Up'
                    style={{
                        display: appoitment.prevAppoitmentId === null || disableSwap ? 'none' : undefined
                    }}
                >
                    <ArrowUpIcon onClick={() => swapAppoitmentOrder(appoitment, 'left')} />
                </div>
                <div 
                    title='Move Down'
                    style={{
                        display: appoitment.nextAppoitmentId === null || disableSwap ? 'none' : undefined
                    }}
                >
                    <ArrowDownIcon onClick={() => swapAppoitmentOrder(appoitment, 'right')} />

                </div>
                <div title="Mark as Serviced">
                    <CheckCircledIcon
                        color={appoitment.serviced ? 'green' : undefined}
                        onClick={() => toggleServiced(appoitment.id)}
                    />
                </div>
                <div title='Delete Entry'>
                    <CrossCircledIcon
                        color='var(--tomato10)'
                        onClick={() => deleteAppoitment(appoitment)}
                    />
                </div>
            </div>
        </div>
        <div className={styles.CardSection}>
            <p><em>{appoitment.requestedService}</em></p>
            <p>{appoitment.owner}</p>
        </div>
        <div className={styles.CardFooter} >
            <p>{arrivalDate}</p>
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
                appoitment => <Card key={appoitment.id} appoitment={appoitment} />
            )
        }
    </div>
}