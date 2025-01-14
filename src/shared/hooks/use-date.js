import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { getMonth, getYear } from '../utils/date'

const useDate = create(
  persist(
    (set) => ({
      month: getMonth(),
      year: getYear(),
      setMonth: (month) => set({ month }),
      setYear: (year) => set({ year })
    }),
    { name: 'selected-date' }
  )
)

export default useDate
