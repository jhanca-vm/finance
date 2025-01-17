import { numericFormatter } from 'react-number-format'

export default function formatToCurrency(value) {
  return numericFormatter(value.toString(), {
    prefix: '$ ',
    thousandSeparator: true
  })
}
