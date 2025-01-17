import { lazy } from 'react'
import { createBrowserRouter } from 'react-router'
import Layout from './shared/components/layout'

export default createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: lazy(() => import('./overview')) },
      { path: 'ingresos', Component: lazy(() => import('./incomes')) },
      { path: 'gastos', Component: lazy(() => import('./expenses')) },
      { path: 'presupuestos', Component: lazy(() => import('./budgets')) }
    ]
  }
])
