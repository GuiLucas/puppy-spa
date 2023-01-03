import { CheckCircledIcon, CrossCircledIcon } from '@radix-ui/react-icons'
import { Appoitment } from "../../types"
import { useAppoitmentsActions } from "../../store"
import { makeReadableDate } from "../../lib"
import styles from './Waitlist.module.css'

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

    return <section className={styles.Card}>
        <div className={styles.CardSection}>
            <h2>{appoitment.puppyName}</h2>
            <div style={{ display: 'inherit', gap: '4px' }}>
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