import { useAtomValue, useSetAtom } from 'jotai'
import { useRef, useState } from 'react'
import { NumericFormat } from 'react-number-format'
import Dialog from '../shared/components/dialog'
import Input from '../shared/components/input'
import Table from '../shared/components/table'
import {
  addExpenseAtom,
  editExpenseAtom,
  expensesByDateAtom,
  removeExpenseAtom
} from './atoms'

export default function Expenses() {
  const dialogRef = useRef(null)
  const expenses = useAtomValue(expensesByDateAtom)
  const [expense, setExpense] = useState(null)
  const addExpense = useSetAtom(addExpenseAtom)
  const editExpense = useSetAtom(editExpenseAtom)
  const removeExpense = useSetAtom(removeExpenseAtom)

  function action(formData) {
    const { description, quantity } = Object.fromEntries(formData)

    const data = {
      description: description.trim(),
      quantity: Number(quantity.replaceAll(',', ''))
    }

    expense ? editExpense({ id: expense.id, ...data }) : addExpense(data)

    dialogRef.current.close()
  }

  return (
    <>
      <Table
        data={expenses}
        dialogRef={dialogRef}
        handleEdit={(expense) => setExpense(expense)}
        handleRemove={removeExpense}
      />
      <Dialog
        ref={dialogRef}
        title={expense ? 'Editar gasto' : 'Añadir gasto'}
        action={action}
        handleClose={() => setExpense(null)}
      >
        <div>
          <Input
            label="Descripción"
            name="description"
            defaultValue={expense?.description}
          />
          <NumericFormat
            customInput={Input}
            label="Cantidad"
            name="quantity"
            defaultValue={expense?.quantity}
            thousandSeparator
          />
        </div>
        <button className="btn-primary" type="submit">
          {expense ? 'Guardar' : 'Añadir'}
        </button>
      </Dialog>
    </>
  )
}
