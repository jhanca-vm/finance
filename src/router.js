import { createBrowserRouter } from 'react-router'
import Budgets from './budgets'
import Expenses from './expenses'
import Incomes from './incomes'
import Overview from './overview'
import Layout from './shared/components/layout'

export default createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: Overview },
      { path: 'ingresos', Component: Incomes },
      { path: 'gastos', Component: Expenses },
      { path: 'presupuestos', Component: Budgets }
    ]
  }
])
