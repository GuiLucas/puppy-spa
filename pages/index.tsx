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

	const debouncedSearch = useDebounce(searchValue, 200)

	function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
		setSearchValue(e.target.value)
	}

	const fuse = new Fuse<Appoitment>(appoitments, { keys: ['puppyName', 'owner', 'requestedService'] })

	const searchResult = fuse.search(debouncedSearch)
	const results = searchResult.flatMap(result => result.item)

	return <>
		<Head>
			<title>Puppy Spa</title>
			<meta name="description" content="A local puppy grooming spa" />
			<meta name="viewport" content="width=device-width, initial-scale=1" />
			<link rel="icon" href="/favicon.ico" />
		</Head>
		<main className={styles.main}>
			<h1>Puppy Spa 🐶</h1>
			<div style={{display:'flex', gap:'16px', marginTop: '16px'}}>
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
			<br />
			<Waitlist list={showServiced ? servicedList : appoitments} />
			{
				results.length > 0 
				? results.map(result => <p key={result.id}>{result.puppyName}</p>)
				: null
			}
		</main>
	</>
}
