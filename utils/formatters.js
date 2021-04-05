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
