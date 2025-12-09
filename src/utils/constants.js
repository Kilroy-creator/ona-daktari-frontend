// User Types
export const USER_TYPES = {
  PATIENT: 'patient',
  DOCTOR: 'doctor',
  ADMIN: 'admin'
}

// Appointment Status
export const APPOINTMENT_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  DECLINED: 'declined',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled'
}

// Specializations
export const SPECIALIZATIONS = [
  'Cardiology',
  'Neurology',
  'Orthopedics',
  'Pediatrics',
  'Dermatology',
  'Psychiatry',
  'Oncology',
  'Gastroenterology',
  'Rheumatology',
  'Endocrinology',
  'Pulmonology',
  'Nephrology',
  'Ophthalmology',
  'Otolaryngology',
  'Urology',
  'General Practice'
]

// Medicine Categories
export const MEDICINE_CATEGORIES = [
  'Pain Relief',
  'Antibiotics',
  'Vitamins',
  'Cold & Flu',
  'Digestive Health',
  'Allergy Relief',
  'Skincare',
  'Anti-inflammatory'
]

// Days of Week
export const DAYS_OF_WEEK = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
]

// API Endpoints
export const API_ENDPOINTS = {
  // Auth
  AUTH_REGISTER: '/auth/register',
  AUTH_LOGIN: '/auth/login',
  AUTH_LOGOUT: '/auth/logout',
  AUTH_ME: '/auth/me',

  // Appointments
  APPOINTMENTS: '/appointments',
  APPOINTMENT_CONFIRM: '/appointments/:id/confirm',
  APPOINTMENT_DECLINE: '/appointments/:id/decline',
  APPOINTMENT_CANCEL: '/appointments/:id/cancel',

  // Doctors
  DOCTORS: '/doctors',
  DOCTOR_PROFILE: '/doctors/:id',
  DOCTOR_AVAILABILITY: '/doctors/:id/availability',
  DOCTOR_APPOINTMENTS: '/doctors/:id/appointments',

  // Chat
  MESSAGES: '/messages',
  MESSAGES_BY_APPOINTMENT: '/messages/appointment/:id',

  // Pharmacy
  MEDICINES: '/medicines',
  PRESCRIPTIONS: '/prescriptions',
  ORDERS: '/orders'
}

// Validation Rules
export const VALIDATION_RULES = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^(\+254|0)[0-9]{9}$/,
  PASSWORD_MIN_LENGTH: 8,
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 100
}

// Notification Types
export const NOTIFICATION_TYPES = {
  INFO: 'info',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error'
}

// Error Messages
export const ERROR_MESSAGES = {
  INVALID_EMAIL: 'Please enter a valid email address',
  INVALID_PHONE: 'Please enter a valid phone number (e.g., +254712345678)',
  INVALID_PASSWORD: 'Password must be at least 8 characters',
  INVALID_NAME: 'Name must be between 2 and 100 characters',
  REQUIRED_FIELD: 'This field is required',
  UNAUTHORIZED: 'You are not authorized to perform this action',
  NOT_FOUND: 'Resource not found',
  SERVER_ERROR: 'Server error. Please try again later'
}

// Success Messages
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Login successful',
  REGISTER_SUCCESS: 'Registration successful',
  APPOINTMENT_BOOKED: 'Appointment booked successfully',
  APPOINTMENT_CONFIRMED: 'Appointment confirmed',
  APPOINTMENT_DECLINED: 'Appointment declined',
  PROFILE_UPDATED: 'Profile updated successfully',
  MESSAGE_SENT: 'Message sent successfully'
}

// API Timeout
export const API_TIMEOUT = 30000 // 30 seconds

// Local Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'laravel_token',
  USER_TYPE: 'user_type',
  USER_DATA: 'user_data',
  THEME: 'theme'
}

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100
}

// Date Formats
export const DATE_FORMATS = {
  FULL: 'YYYY-MM-DD HH:mm:ss',
  DATE: 'YYYY-MM-DD',
  TIME: 'HH:mm',
  DISPLAY: 'MMM DD, YYYY'
}

// Currency
export const CURRENCY = {
  CODE: 'KES',
  SYMBOL: 'KES',
  DECIMAL_PLACES: 2
}