import setCookie from 'set-cookie-parser'
import { serialize } from 'cookie'

export const getSetCookieHeaders = (setCookieHeaders) => {
  const splitCookies = setCookie.splitCookiesString(setCookieHeaders)
  const parsedCookies = setCookie.parse(splitCookies).map((ck) => [ck].map(({ name, value, path, domain, secure, ...rest }) => serialize(name, value, { ...rest, path: '/' }))[0])
  return parsedCookies
}
