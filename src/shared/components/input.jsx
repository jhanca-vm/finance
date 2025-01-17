import { useId } from 'react'
import styles from './input.module.css'

export default function Input({ label, name, defaultValue, ...props }) {
  const id = useId()

  return (
    <div>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <input
        className={styles.input}
        type="text"
        name={name}
        id={id}
        defaultValue={defaultValue}
        autoComplete="off"
        required
        {...props}
      />
    </div>
  )
}
