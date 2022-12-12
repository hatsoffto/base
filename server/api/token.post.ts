import { setCookie, deleteCookie } from 'h3'

const getNextYears = () => {
  const date = new Date()
  date.setFullYear(date.getFullYear() + 10)
  return date
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (!body || body && !body.token) {
    deleteCookie(event, 'token')
    deleteCookie(event, 'apollo:default.token')
    return {}
  }

  if (body && body.token) {
    setCookie(event, 'token', body.token, {
      maxAge: 60 * 60 * 24 * 365 * 10, // 60 min * 24 uur * 365 dagen * 10
      expires: getNextYears(),
      sameSite: 'lax',
      httpOnly: true,
    })
  }

  // Send JSON response
  return {}
})