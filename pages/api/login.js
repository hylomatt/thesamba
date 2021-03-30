import fetch from 'node-fetch'
import constants from '../../utils/constants'
import { getSetCookieHeaders } from '../../utils/cookies'
import { URLSearchParams } from 'url'

export default async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).end()
  }

  const resp = await fetch(`${constants.baseUrl}/vw/forum/login.php`, {
    method: 'post',
    redirect: 'manual',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      cookie: req.headers.cookie
    },
    body: new URLSearchParams(req.body)
  })
    .then(async (r) => ({
      status: r.status,
      statusText: r.statusText,
      cookies: getSetCookieHeaders(r.headers.get('set-cookie')),
      redirect: (r.headers.get('location') || '').replace(/^.*\/vw/, '/vw')
    }))
    .catch((e) => {
      console.log('login err:', e)
      return { error: e }
    })

  res.setHeader('set-cookie', resp.cookies || [])
  res.status(resp.status).json({
    status: resp.status,
    statusText: resp.statusText,
    redirect: resp.redirect
  })
}
