import { useAtomValue } from 'jotai'
import formatToCurrency from '~/shared/utils/format-to-currency'
import { expensesAtom, incomeAtom } from '../atoms'
import styles from './financial-statement.module.css'

export default function FinancialStatement() {
  const income = useAtomValue(incomeAtom)
  const expenses = useAtomValue(expensesAtom)

  return (
    <div className={styles.container}>
      <p>
        Saldo Actual <strong>{formatToCurrency(income - expenses)}</strong>
      </p>
      <p>
        <span>Ingresos</span> <strong>{formatToCurrency(income)}</strong>
      </p>
      <p>
        <span>Gastos</span> <strong>{formatToCurrency(expenses)}</strong>
      </p>
    </div>
  )
}
