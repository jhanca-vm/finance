import IconDots from '../icons/dots'
import formatToCurrency from '../utils/format-to-currency'
import Dropdown from './dropdown'
import styles from './table.module.css'

export default function Table({ data, dialogRef, handleEdit, handleRemove }) {
  function handleClick(label, income) {
    if (label === 'Editar') {
      handleEdit(income)
      dialogRef.current.open()
    }

    if (label === 'Eliminar') handleRemove(income.id)
  }

  return (
    <section>
      {data.length > 0 && (
        <table className={styles.container}>
          <tbody>
            {data.map(({ id, description, quantity }) => (
              <tr key={id}>
                <th scope="row">{description}</th>
                <td>
                  <pre>{formatToCurrency(quantity)}</pre>
                </td>
                <td>
                  <Dropdown
                    className={styles.dropdown}
                    items={['Editar', 'Eliminar']}
                    handleClick={(label) => {
                      handleClick(label, { id, description, quantity })
                    }}
                  >
                    <IconDots />
                  </Dropdown>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <button
        className={styles.button}
        type="button"
        onClick={() => dialogRef.current.open()}
      >
        + Añadir
      </button>
    </section>
  )
}
