import * as Dialog from '@radix-ui/react-dialog';
import { useForm } from "react-hook-form";
import { useState } from 'react';

import { useAppoitmentsActions } from '../../store';
import { FormValues } from '../../types';
import { createAppoitment } from '../../lib';
import styles from './Modal.module.css'
import { Cross2Icon } from '@radix-ui/react-icons';
import { Button, IconButton } from '../Button';

const wait = () => new Promise((resolve) => setTimeout(resolve, 100));

type ModalProps = {} 

export function Modal(props: ModalProps): React.ReactElement {
	const [open, setOpen] = useState(false);

	const {
		handleSubmit,
		register,
		reset,
		formState: { errors }
	} = useForm<FormValues>({
		defaultValues: {
			owner: undefined,
			puppyName: undefined,
			requestedService: undefined
		}
	})

	const { addAppoitment } = useAppoitmentsActions()

	function onSubmit(data: FormValues) {
		addAppoitment(createAppoitment(data))
		wait().then(() => {
			setOpen(false)
			reset()
		});
	}

	const errorStyle = {
		color: 'red', fontSize:'0.7rem', marginBottom: '8px'
	}

	return <Dialog.Root open={open} onOpenChange={setOpen}>
		<Dialog.Trigger asChild>
			<div>
				<Button label='New Entry' variant='neutral' />
			</div>
		</Dialog.Trigger>
		<Dialog.Portal>
			<Dialog.Overlay className={styles.DialogOverlay} />
			<Dialog.Content className={styles.DialogContent}>
				<Dialog.Title className={styles.DialogTitle}>Create new Appoitment</Dialog.Title>
				<form onSubmit={handleSubmit(onSubmit)} id='create-new'>
					{errors.puppyName?.type === 'required' 
					&& <p role="alert" style={errorStyle}>Puppy name is required</p>}
					<fieldset className={styles.Fieldset}>
						<label className={styles.Label} htmlFor="name">
							Puppy Name
						</label>
						<input 
							className={styles.Input} 
							id="name" 
							aria-invalid={errors.puppyName ? "true" : "false"} 
							{...register('puppyName', {required: true})}
						/>
					</fieldset>
					{errors.requestedService?.type === 'required' && <p style={errorStyle} role="alert">Treatment is required</p>}
					<fieldset className={styles.Fieldset}>
						<label className={styles.Label} htmlFor="requestedService">
							Treatment
						</label>
						<input 
							className={styles.Input} 
							id="requestedService" 
							aria-invalid={errors.requestedService ? "true" : "false"} 
							{...register('requestedService', {required: true})}
						/>
					</fieldset>
					<p role="alert" style={errorStyle}>{errors.owner?.type === 'required' && `Owner name is required`}</p>
					<fieldset className={styles.Fieldset}>
						<label className={styles.Label} htmlFor="owner">
							Owner Name
						</label>
						<input 
							className={styles.Input} 
							id="owner" 
							aria-invalid={errors.owner ? "true" : "false"} 
							{...register('owner', {required: true})}
						/>
					</fieldset>
					<div style={{ display: 'flex', marginTop: 25, justifyContent: 'flex-end' }}>
						<Button label={'Save Changes'} type='submit' variant={'success'}/>
					</div>
				</form>
				<Dialog.Close asChild>
					<div>
						<IconButton aria-label="Close">
							<Cross2Icon />
						</IconButton>
					</div>
       			</Dialog.Close>
			</Dialog.Content>
		</Dialog.Portal>
	</Dialog.Root>
}
