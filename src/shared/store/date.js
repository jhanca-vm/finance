import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

const date = new Date()

export const currentMonth = date.toLocaleString('es', { month: 'short' })

export const currentYear = date.getFullYear()

export const dateAtom = atomWithStorage('selected-date', {
  month: currentMonth,
  year: currentYear
})

export const setMonthAtom = atom(null, (_get, set, month) => {
  set(dateAtom, ({ year }) => ({ month, year }))
})

export const setYearAtom = atom(null, (_get, set, year) => {
  set(dateAtom, { month: year === currentYear ? currentMonth : 'dic', year })
})
