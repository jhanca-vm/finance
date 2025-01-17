import { atom } from 'jotai'
import { expensesByDateAtom } from '../expenses/atoms'
import { incomesByDateAtom } from '../incomes/atoms'

const reducer = (accumulator, { quantity }) => accumulator + quantity

export const incomeAtom = atom((get) => {
  return get(incomesByDateAtom).reduce(reducer, 0)
})

export const expensesAtom = atom((get) => {
  return get(expensesByDateAtom).reduce(reducer, 0)
})
