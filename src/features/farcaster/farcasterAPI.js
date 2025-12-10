/**
 * Farcaster API helper
 * این فایل مسئول ارتباط با Farcaster API برای دریافت پروفایل و اعلان‌هاست
 */

const FARCASTER_API_BASE = 'https://api.farcaster.xyz/v2'

/**
 * گرفتن پروفایل کاربر بر اساس آدرس کیف پول
 * @param {string} walletAddress
 * @returns {Promise<object>}
 */
export async function getFarcasterProfile(walletAddress) {
  try {
    const res = await fetch(`${FARCASTER_API_BASE}/user/by-address/${walletAddress}`)
    if (!res.ok) throw new Error('Farcaster API error')
    const data = await res.json()
    return data
  } catch (err) {
    console.error('Farcaster API fetch error:', err)
    return null
  }
}

/**
 * ارسال اعلان به کاربر در Farcaster
 * @param {string} userId
 * @param {string} message
 */
export async function sendFarcasterNotification(userId, message) {
  try {
    const res = await fetch(`${FARCASTER_API_BASE}/notifications`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // اگر توکن API خصوصی داری:
        'Authorization': `Bearer ${import.meta.env.VITE_FARCASTER_API_KEY}`
      },
      body: JSON.stringify({
        userId,
        message
      })
    })
    if (!res.ok) throw new Error('Farcaster API notification error')
    return await res.json()
  } catch (err) {
    console.error('Farcaster notification error:', err)
    return null
  }
}
