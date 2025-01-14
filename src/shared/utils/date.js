export const getMonth = (date = Date()) => {
  return new Date(date).toLocaleString('es', { month: 'short' })
}

export const getYear = (date = Date()) => new Date(date).getFullYear()
