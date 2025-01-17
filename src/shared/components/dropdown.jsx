import {
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useListNavigation,
  useRole
} from '@floating-ui/react'
import { useEffect, useRef, useState } from 'react'
import styles from './dropdown.module.css'

export default function Dropdown({
  className,
  items,
  select,
  selectedIndex,
  handleClick,
  children
}) {
  const listRef = useRef([])
  const [open, onOpenChange] = useState(false)
  const [activeIndex, onNavigate] = useState(null)

  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange,
    placement: 'bottom-end',
    transform: false
  })

  const click = useClick(context)
  const dismiss = useDismiss(context)
  const role = useRole(context, { role: 'menu' })

  const listNavigation = useListNavigation(context, {
    listRef,
    selectedIndex,
    activeIndex,
    onNavigate
  })

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions(
    [click, dismiss, role, listNavigation]
  )

  useEffect(() => {
    if (select && open) {
      listRef.current[selectedIndex]?.scrollIntoView({ block: 'center' })
    }
  }, [select, open, selectedIndex])

  return (
    <div className={styles.container}>
      <button
        ref={refs.setReference}
        className={select ? styles.select : className}
        type="button"
        {...getReferenceProps()}
      >
        {children}
      </button>
      {open && (
        <div
          ref={refs.setFloating}
          style={floatingStyles}
          {...getFloatingProps()}
        >
          {items.map((item, index) => (
            <button
              ref={(node) => {
                listRef.current[index] = node
              }}
              className={index === selectedIndex ? styles.selected : undefined}
              type="button"
              tabIndex={index === activeIndex ? 0 : -1}
              role="menuitem"
              key={item}
              {...getItemProps({
                onClick() {
                  handleClick?.(item)
                  onOpenChange(false)
                }
              })}
            >
              <span>{item}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
