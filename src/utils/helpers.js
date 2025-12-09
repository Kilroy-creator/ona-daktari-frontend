import { VALIDATION_RULES } from './constants'

/**
 * Validate Email
 */
export const validateEmail = (email) => {
  return VALIDATION_RULES.EMAIL.test(email)
}

/**
 * Validate Phone Number
 */
export const validatePhone = (phone) => {
  return VALIDATION_RULES.PHONE.test(phone)
}

/**
 * Validate Password
 */
export const validatePassword = (password) => {
  return password && password.length >= VALIDATION_RULES.PASSWORD_MIN_LENGTH
}

/**
 * Validate Name
 */
export const validateName = (name) => {
  return name && name.length >= VALIDATION_RULES.NAME_MIN_LENGTH && 
         name.length <= VALIDATION_RULES.NAME_MAX_LENGTH
}

/**
 * Format Phone Number
 */
export const formatPhone = (phone) => {
  if (!phone) return ''
  const cleaned = phone.replace(/\D/g, '')
  const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/)
  if (!match) return phone
  const [, area, prefix, line] = match
  if (!line) return area
  if (!prefix) return `${area}`
  return `${area} ${prefix} ${line}`.trim()
}

/**
 * Format Currency
 */
export const formatCurrency = (amount, currency = 'KES') => {
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: currency
  }).format(amount)
}

/**
 * Format Date
 */
export const formatDate = (date, format = 'MMM DD, YYYY') => {
  if (!date) return ''
  
  const d = new Date(date)
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  
  const year = d.getFullYear()
  const month = months[d.getMonth()]
  const day = String(d.getDate()).padStart(2, '0')
  const hours = String(d.getHours()).padStart(2, '0')
  const minutes = String(d.getMinutes()).padStart(2, '0')

  if (format === 'YYYY-MM-DD') {
    return `${year}-${String(d.getMonth() + 1).padStart(2, '0')}-${day}`
  } else if (format === 'HH:mm') {
    return `${hours}:${minutes}`
  } else if (format === 'YYYY-MM-DD HH:mm:ss') {
    const seconds = String(d.getSeconds()).padStart(2, '0')
    return `${year}-${String(d.getMonth() + 1).padStart(2, '0')}-${day} ${hours}:${minutes}:${seconds}`
  }
  
  return `${month} ${day}, ${year}`
}

/**
 * Format Time Difference
 */
export const formatTimeDifference = (date) => {
  const now = new Date()
  const diff = now - new Date(date)
  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (seconds < 60) return 'Just now'
  if (minutes < 60) return `${minutes}m ago`
  if (hours < 24) return `${hours}h ago`
  if (days < 7) return `${days}d ago`
  
  return formatDate(date)
}

/**
 * Get User Initials
 */
export const getInitials = (name) => {
  if (!name) return '??'
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

/**
 * Generate Random ID
 */
export const generateId = () => {
  return Math.random().toString(36).substr(2, 9)
}

/**
 * Check if Email is Valid
 */
export const isValidEmail = (email) => {
  return validateEmail(email)
}

/**
 * Truncate Text
 */
export const truncateText = (text, length = 50) => {
  if (!text) return ''
  if (text.length <= length) return text
  return text.substring(0, length) + '...'
}

/**
 * Capitalize First Letter
 */
export const capitalize = (str) => {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * Sort Array by Property
 */
export const sortBy = (arr, property, order = 'asc') => {
  return [...arr].sort((a, b) => {
    if (a[property] < b[property]) return order === 'asc' ? -1 : 1
    if (a[property] > b[property]) return order === 'asc' ? 1 : -1
    return 0
  })
}

/**
 * Filter Array by Property
 */
export const filterBy = (arr, property, value) => {
  return arr.filter(item => item[property] === value)
}

/**
 * Group Array by Property
 */
export const groupBy = (arr, property) => {
  return arr.reduce((groups, item) => {
    const key = item[property]
    if (!groups[key]) {
      groups[key] = []
    }
    groups[key].push(item)
    return groups
  }, {})
}

/**
 * Debounce Function
 */
export const debounce = (func, wait = 300) => {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

/**
 * Throttle Function
 */
export const throttle = (func, limit = 300) => {
  let inThrottle
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

/**
 * Deep Clone Object
 */
export const deepClone = (obj) => {
  return JSON.parse(JSON.stringify(obj))
}

/**
 * Merge Objects
 */
export const mergeObjects = (target, source) => {
  return { ...target, ...source }
}

/**
 * Get Query Parameter
 */
export const getQueryParam = (param) => {
  const params = new URLSearchParams(window.location.search)
  return params.get(param)
}

/**
 * Sleep (Promise delay)
 */
export const sleep = (ms = 1000) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * Check if Object is Empty
 */
export const isEmpty = (obj) => {
  return Object.keys(obj).length === 0
}

/**
 * Get Unique Values from Array
 */
export const getUnique = (arr, property = null) => {
  if (property) {
    return [...new Set(arr.map(item => item[property]))]
  }
  return [...new Set(arr)]
}

/**
 * Rate Limiting Check
 */
export const isRateLimited = (key, limit = 5, windowMs = 60000) => {
  const now = Date.now()
  const stores = JSON.parse(localStorage.getItem('rateLimits') || '{}')
  
  if (!stores[key]) {
    stores[key] = []
  }
  
  stores[key] = stores[key].filter(time => now - time < windowMs)
  
  if (stores[key].length >= limit) {
    localStorage.setItem('rateLimits', JSON.stringify(stores))
    return true
  }
  
  stores[key].push(now)
  localStorage.setItem('rateLimits', JSON.stringify(stores))
  return false
}