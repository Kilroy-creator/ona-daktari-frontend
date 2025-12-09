# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about IDE Support for Vue in the [Vue Docs Scaling up Guide](https://vuejs.org/guide/scaling-up/tooling.html#ide-support).
# 🏥 Ona Daktari - Healthcare Platform

A modern, responsive healthcare platform built with Vue 3, enabling patients to connect with specialist doctors, book appointments, and manage their health online.

## ✨ Features

### For Patients
- 👤 **User Registration & Authentication** - Secure signup and login
- 🔍 **Browse Doctors** - Search and filter doctors by specialty
- 📅 **Book Appointments** - Schedule consultations with ease
- 💬 **Real-time Chat** - Communicate with healthcare providers
- 💊 **E-Pharmacy** - Browse and order medicines
- 📊 **Dashboard** - Track appointments and health records

### For Doctors
- 👨‍⚕️ **Professional Profile** - Showcase expertise and credentials
- 📋 **Appointment Management** - Accept/decline appointment requests
- 💬 **Patient Communication** - Chat with patients
- 📊 **Analytics Dashboard** - View statistics and metrics
- ⏰ **Schedule Management** - Set availability and working hours

## 🚀 Tech Stack

- **Frontend Framework:** Vue 3 (Composition API)
- **State Management:** Pinia
- **Routing:** Vue Router 4
- **Styling:** Tailwind CSS
- **Icons:** Lucide Vue Next
- **Build Tool:** Vite

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Steps

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/ona-daktari.git
cd ona-daktari
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. **Run development server**
```bash
npm run dev
```

5. **Open in browser**
```
http://localhost:5173
```

## 🏗️ Project Structure

```
src/
├── assets/          # Static assets and styles
├── components/      # Reusable Vue components
│   ├── chat/       # Chat-related components
│   ├── common/     # Shared components
│   ├── doctor/     # Doctor-specific components
│   └── patient/    # Patient-specific components
├── composables/     # Vue composables (reusable logic)
├── router/          # Vue Router configuration
├── stores/          # Pinia stores (state management)
├── utils/           # Helper functions and constants
├── views/           # Page components
│   ├── auth/       # Authentication pages
│   ├── doctor/     # Doctor pages
│   └── patient/    # Patient pages
├── App.vue          # Root component
└── main.js          # Application entry point
```

## 🎯 Available Scripts

```bash
# Development
npm run dev          # Start dev server

# Build
npm run build        # Build for production

# Preview
npm run preview      # Preview production build

# Lint
npm run lint         # Run ESLint
```

## 🔐 Authentication Flow

1. Users can register as either **Patient** or **Doctor**
2. Login with email and password
3. Authentication state persisted in localStorage
4. Protected routes with Vue Router guards
5. Automatic redirect based on user type

## 📱 Responsive Design

The application is fully responsive and optimized for:
- 📱 Mobile devices (320px+)
- 📱 Tablets (768px+)
- 💻 Desktop (1024px+)
- 🖥️ Large screens (1440px+)

## 🎨 UI/UX Features

- Clean, modern interface
- Smooth transitions and animations
- Intuitive navigation
- Loading states
- Error handling
- Toast notifications
- Modal dialogs
- Form validation

## 🔒 Security Features

- Password encryption (ready for backend)
- Protected routes
- Session management
- Input sanitization
- XSS protection

## 🧪 Testing

```bash
# Unit tests
npm run test:unit

# E2E tests
npm run test:e2e

# Coverage
npm run test:coverage
```

## 📈 Future Enhancements

- [ ] Backend API integration
- [ ] Video consultation feature
- [ ] Payment gateway integration (M-Pesa)
- [ ] Push notifications
- [ ] Medical records management
- [ ] Prescription management
- [ ] Multi-language support
- [ ] Dark mode
- [ ] PWA capabilities
- [ ] Email notifications
- [ ] SMS reminders

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 Code Style

- Use Vu# ona-daktari-frontend
