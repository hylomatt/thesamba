import { format, parse, subDays } from 'date-fns'

export const formatDate = (dateString) => {
  let ds = dateString
  if (ds.includes('Today')) {
    ds = `${format(new Date(), 'EEE MMM dd, yyyy')} ${ds.replace('Today', '').trim()}`
  } else if (ds.includes('Yesterday')) {
    ds = `${format(subDays(new Date(), 1), 'EEE MMM dd, yyyy')} ${ds.replace('Yesterday', '').trim()}`
  }
  return {
    short: format(parse(ds, 'EEE MMM dd, yyyy h:mm a', new Date()), 'yyyy-MM-dd'),
    full: format(parse(ds, 'EEE MMM dd, yyyy h:mm a', new Date()), 'yyyy-MM-dd HH:mm:ss')
  }
}

export const formatPrice = (priceString) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  })
  return !isNaN(priceString) ? formatter.format(priceString.replace(/\$|,/g, '')) : priceString
}
