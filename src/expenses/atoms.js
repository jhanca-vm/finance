import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { dateAtom } from '../shared/store/date'

const expensesAtom = atomWithStorage('expenses', [])

export const expensesByDateAtom = atom((get) => {
  const { month, year } = get(dateAtom)

  return get(expensesAtom).filter(({ date }) => date === `${month}-${year}`)
})

export const addExpenseAtom = atom(null, (get, set, expense) => {
  const { month, year } = get(dateAtom)

  set(expensesAtom, (expenses) => {
    return expenses.concat({
      id: crypto.randomUUID(),
      date: `${month}-${year}`,
      ...expense
    })
  })
})

export const editExpenseAtom = atom(null, (_get, set, data) => {
  set(expensesAtom, (expenses) => {
    return expenses.map((expense) => {
      return expense.id === data.id ? { ...expense, ...data } : expense
    })
  })
})

export const removeExpenseAtom = atom(null, (_get, set, id) => {
  set(expensesAtom, (expenses) => {
    return expenses.filter((expense) => expense.id !== id)
  })
})
