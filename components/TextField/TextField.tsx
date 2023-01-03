import React, { InputHTMLAttributes } from 'react'
import styles from './TextField.module.css'

type TextFieldProps = {
} & InputHTMLAttributes<HTMLInputElement>

export function TextField(props: TextFieldProps): React.ReactElement {
    const {
        ...otherProps
    } = props

    const classNames = `${styles.Input}`
    
    return <input 
        className={classNames}
        type="text"
        {...otherProps}
    />
}
