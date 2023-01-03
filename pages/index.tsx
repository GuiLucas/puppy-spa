import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { Button, Modal, TextField, Waitlist } from '../components'
import { useMemo, useState } from 'react'
import { useAppoitments } from '../store'
import { Appoitment } from '../types'
import useDebounce from '../hooks/useDebounce'
import Fuse from 'fuse.js'

export default function Home() {
	const [showServiced, setShowServiced] = useState<boolean>(false)
	const [searchValue, setSearchValue] = useState<string>('')

	const appoitments = useAppoitments()

	const servicedList: Appoitment[] = useMemo(
		() => appoitments.filter(
			(appt) => appt.serviced === true
		),
		[appoitments]
	)

	const debouncedSearch = useDebounce(searchValue, 500)

	const fuse = new Fuse<Appoitment>(appoitments, { keys: ['puppyName', 'owner', 'requestedService'] })
	const results = fuse.search(debouncedSearch)
	const searchResults = results.flatMap(result => result.item)

	const appoitmentsToDisplay = searchValue ? searchResults : appoitments

	function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
		setSearchValue(e.target.value)
	}

	return <>
		<Head>
			<title>Puppy Spa</title>
			<meta name="description" content="A local puppy grooming spa" />
			<meta name="viewport" content="width=device-width, initial-scale=1" />
			<link rel="icon" href="/favicon.ico" />
		</Head>
		<main className={styles.main}>
			<h1 className={styles.title}>Puppy Spa 🐶</h1>
			<div className={styles.actions}>
				<Modal />
				<Button
					label='Show Serviced'
					disabled={ servicedList.length === 0 }
					onClick={() => setShowServiced(!showServiced)}
				/>
				<TextField 
					name="search-field" 
					id="search-field" 
					placeholder='Search'
					onChange={handleSearch}
				/>
			</div>
			<Waitlist list={showServiced ? servicedList : appoitmentsToDisplay} />
		</main>
	</>
}
