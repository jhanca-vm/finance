import { useAtomValue, useSetAtom } from 'jotai'
import { useMemo } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router'
import BudgetsIcon from '~/budgets/icon'
import ExpensesIcon from '~/expenses/icon'
import IncomesIcon from '~/incomes/icon'
import OverviewIcon from '~/overview/icon'
import { MONTHS } from '../constants'
import IconCaret from '../icons/caret'
import {
  currentMonth,
  currentYear,
  dateAtom,
  setMonthAtom,
  setYearAtom
} from '../store/date'
import Dropdown from './dropdown'
import styles from './layout.module.css'
import Logo from './logo'

const years = [currentYear, currentYear - 1]
const links = {
  '/': { Icon: OverviewIcon, name: 'Resumen' },
  '/ingresos': { Icon: IncomesIcon, name: 'Ingresos' },
  '/gastos': { Icon: ExpensesIcon, name: 'Gastos' },
  '/presupuestos': { Icon: BudgetsIcon, name: 'Presupuestos' }
}

export default function Layout() {
  const { pathname } = useLocation()
  const { month, year } = useAtomValue(dateAtom)
  const setMonth = useSetAtom(setMonthAtom)
  const setYear = useSetAtom(setYearAtom)
  const months = useMemo(() => {
    return year === currentYear
      ? MONTHS.slice(0, MONTHS.indexOf(currentMonth) + 1)
      : MONTHS.toReversed()
  }, [year])

  return (
    <>
      <main className={styles.main}>
        <header className={styles.header}>
          <h1>{links[pathname].name}</h1>
          <div className={styles.dropdowns}>
            <Dropdown
              items={months}
              select
              selectedIndex={months.indexOf(month)}
              handleClick={setMonth}
            >
              {month}
              <IconCaret />
            </Dropdown>
            <Dropdown
              items={years}
              select
              selectedIndex={years.indexOf(year)}
              handleClick={setYear}
            >
              {year}
              <IconCaret />
            </Dropdown>
          </div>
        </header>
        <Outlet />
      </main>
      <aside className={styles.aside}>
        <Logo />
        <nav className={styles.nav}>
          {Object.entries(links).map(([path, { Icon, name }]) => (
            <NavLink
              className={({ isActive }) => {
                return isActive ? styles.active : undefined
              }}
              to={path}
              tabIndex={path === pathname ? -1 : undefined}
              key={path}
            >
              <Icon />
              <span>{name}</span>
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  )
}
