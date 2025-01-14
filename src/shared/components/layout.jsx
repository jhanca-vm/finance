import { NavLink, Outlet, useLocation } from 'react-router'
import BudgetsIcon from '~/budgets/icon'
import ExpensesIcon from '~/expenses/icon'
import IncomeIcon from '~/income/icon'
import OverviewIcon from '~/overview/icon'
import { MONTHS } from '../constants'
import useDate from '../hooks/use-date'
import { getYear } from '../utils/date'
import styles from './layout.module.css'
import Logo from './logo'
import Select from './select'

const currentYear = getYear()
const years = [currentYear, currentYear - 1]
const links = {
  '/': { Icon: OverviewIcon, name: 'Resumen' },
  '/ingresos': { Icon: IncomeIcon, name: 'Ingresos' },
  '/gastos': { Icon: ExpensesIcon, name: 'Gastos' },
  '/presupuestos': { Icon: BudgetsIcon, name: 'Presupuestos' }
}

export default function Layout() {
  const { pathname } = useLocation()
  const month = useDate((state) => state.month)
  const year = useDate((state) => state.year)
  const setMonth = useDate((state) => state.setMonth)
  const setYear = useDate((state) => state.setYear)

  return (
    <>
      <main className={styles.main}>
        <header className={styles.header}>
          <h1>{links[pathname].name}</h1>
          <div>
            <Select options={MONTHS} value={month} onChange={setMonth} />
            <Select options={years} value={year} onChange={setYear} />
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
