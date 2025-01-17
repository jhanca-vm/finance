import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { dateAtom } from '../shared/store/date'

const incomesAtom = atomWithStorage('incomes', [])

export const incomesByDateAtom = atom((get) => {
  const { month, year } = get(dateAtom)

  return get(incomesAtom).filter(({ date }) => date === `${month}-${year}`)
})

export const addIncomeAtom = atom(null, (get, set, income) => {
  const { month, year } = get(dateAtom)

  set(incomesAtom, (incomes) => {
    return incomes.concat({
      id: crypto.randomUUID(),
      date: `${month}-${year}`,
      ...income
    })
  })
})

export const editIncomeAtom = atom(null, (_get, set, data) => {
  set(incomesAtom, (incomes) => {
    return incomes.map((income) => {
      return income.id === data.id ? { ...income, ...data } : income
    })
  })
})

export const removeIncomeAtom = atom(null, (_get, set, id) => {
  set(incomesAtom, (incomes) => incomes.filter((income) => income.id !== id))
})
