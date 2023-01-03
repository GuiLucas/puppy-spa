import React, { ButtonHTMLAttributes } from 'react'
import type * as Core from '../../types'
import styles from './Button.module.css'

type ButtonProps = {
    label: Core.Optional<string>
    variant?: Core.Optional<'neutral' | 'success' | 'danger'>
} & ButtonHTMLAttributes<HTMLButtonElement>

export function Button(props: ButtonProps): React.ReactElement {

    const {
        label,
        variant = 'neutral',
        ...otherProps
    } = props

    const classNames = `${styles.Button} ${styles[variant]}`
    
    return <button 
        className={classNames}
        {...otherProps}
    >
        {label}
    </button>
}

type IconButtonProps = {
    children: React.ReactElement
} & ButtonHTMLAttributes<HTMLButtonElement>

export function IconButton(props: IconButtonProps): React.ReactElement {

    const {
        children,
        ...otherProps
    } = props

    return <button
        className={styles.IconButton}
        {...otherProps}
    >
        {children}
    </button>
}
