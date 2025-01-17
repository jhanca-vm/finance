import { useAtomValue, useSetAtom } from 'jotai'
import { useRef, useState } from 'react'
import { NumericFormat } from 'react-number-format'
import Dialog from '../shared/components/dialog'
import Input from '../shared/components/input'
import Table from '../shared/components/table'
import {
  addIncomeAtom,
  editIncomeAtom,
  incomesByDateAtom,
  removeIncomeAtom
} from './atoms'

export default function Incomes() {
  const dialogRef = useRef(null)
  const incomes = useAtomValue(incomesByDateAtom)
  const [income, setIncome] = useState(null)
  const addIncome = useSetAtom(addIncomeAtom)
  const editIncome = useSetAtom(editIncomeAtom)
  const removeIncome = useSetAtom(removeIncomeAtom)

  function action(formData) {
    const { description, quantity } = Object.fromEntries(formData)

    const data = {
      description: description.trim(),
      quantity: Number(quantity.replaceAll(',', ''))
    }

    income ? editIncome({ id: income.id, ...data }) : addIncome(data)

    dialogRef.current.close()
  }

  return (
    <>
      <Table
        data={incomes}
        dialogRef={dialogRef}
        handleEdit={(income) => setIncome(income)}
        handleRemove={removeIncome}
      />
      <Dialog
        ref={dialogRef}
        title={income ? 'Editar ingreso' : 'Añadir ingreso'}
        action={action}
        handleClose={() => setIncome(null)}
      >
        <div>
          <Input
            label="Descripción"
            name="description"
            defaultValue={income?.description}
          />
          <NumericFormat
            customInput={Input}
            label="Cantidad"
            name="quantity"
            defaultValue={income?.quantity}
            thousandSeparator
          />
        </div>
        <button className="btn-primary" type="submit">
          {income ? 'Guardar' : 'Añadir'}
        </button>
      </Dialog>
    </>
  )
}
