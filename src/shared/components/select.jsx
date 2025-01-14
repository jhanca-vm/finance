import { useSelect } from 'downshift'
import IconCaret from '../icons/caret'
import styles from './select.module.css'

export default function Select({ options, value, onChange }) {
  const select = useSelect({
    items: options,
    defaultSelectedItem: value,
    onSelectedItemChange: ({ selectedItem }) => onChange(selectedItem)
  })

  return (
    <div className={styles.container}>
      <button type="button" {...select.getToggleButtonProps()}>
        {value}
        <IconCaret />
      </button>
      <ul {...select.getMenuProps()}>
        {select.isOpen &&
          options.map((option, index) => (
            <li
              className={
                index === select.highlightedIndex ? styles.highlight : undefined
              }
              key={option}
              {...select.getItemProps({ item: option, index })}
            >
              {option}
            </li>
          ))}
      </ul>
    </div>
  )
}
