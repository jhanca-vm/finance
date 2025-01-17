import { useEffect, useImperativeHandle, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import IconClose from '../icons/close'
import styles from './dialog.module.css'

export default function Dialog({ ref, title, action, handleClose, children }) {
  const dialogRef = useRef(null)
  const [isOpen, setIsOpen] = useState(false)
  const close = () => dialogRef.current.close()

  useImperativeHandle(ref, () => ({ open: () => setIsOpen(true), close }))

  useEffect(() => {
    if (isOpen) dialogRef.current.showModal()
  }, [isOpen])

  if (!isOpen) return null

  return createPortal(
    <dialog
      ref={dialogRef}
      className={styles.container}
      onClose={() => {
        handleClose?.()
        setIsOpen(false)
      }}
    >
      <header className={styles.header}>
        <h2>{title}</h2>
        <button type="button" onClick={close}>
          <IconClose />
        </button>
      </header>
      <form
        className={styles.form}
        method={action ? undefined : 'dialog'}
        action={action}
      >
        {children}
      </form>
    </dialog>,
    document.getElementById('root')
  )
}
