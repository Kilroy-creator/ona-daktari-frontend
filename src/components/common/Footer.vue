<template>
  <footer class="bg-gray-900 text-gray-300 py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid md:grid-cols-4 gap-8 mb-8">
        <!-- About -->
        <div>
          <div class="flex items-center gap-2 mb-4">
            <span class="text-2xl">🏥</span>
            <h3 class="text-xl font-bold text-white">Ona Daktari</h3>
          </div>
          <p class="text-sm text-gray-400">
            Connecting patients with specialist doctors for quality healthcare at your fingertips.
          </p>
        </div>

        <!-- Quick Links -->
        <div>
          <h4 class="text-white font-semibold mb-4">Quick Links</h4>
          <ul class="space-y-2 text-sm">
            <li><a href="#" class="hover:text-white transition">Home</a></li>
            <li><a href="#" class="hover:text-white transition">Browse Doctors</a></li>
            <li><a href="#" class="hover:text-white transition">My Appointments</a></li>
            <li><a href="#" class="hover:text-white transition">Pharmacy</a></li>
          </ul>
        </div>

        <!-- For Doctors -->
        <div>
          <h4 class="text-white font-semibold mb-4">For Doctors</h4>
          <ul class="space-y-2 text-sm">
            <li><a href="#" class="hover:text-white transition">Join Us</a></li>
            <li><a href="#" class="hover:text-white transition">Dashboard</a></li>
            <li><a href="#" class="hover:text-white transition">Manage Profile</a></li>
            <li><a href="#" class="hover:text-white transition">Support</a></li>
          </ul>
        </div>

        <!-- Contact -->
        <div>
          <h4 class="text-white font-semibold mb-4">Contact</h4>
          <ul class="space-y-2 text-sm">
            <li class="flex items-center gap-2">
              <span>📧</span>
              <a href="mailto:info@onadaktari.com" class="hover:text-white transition">info@onadaktari.com</a>
            </li>
            <li class="flex items-center gap-2">
              <span>📱</span>
              <a href="tel:+254712345678" class="hover:text-white transition">+254 712 345 678</a>
            </li>
            <li class="flex items-center gap-2">
              <span>📍</span>
              <span>Nairobi, Kenya</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Divider -->
      <div class="border-t border-gray-700 my-8"></div>

      <!-- Bottom -->
      <div class="flex flex-col md:flex-row justify-between items-center">
        <p class="text-sm text-gray-400">
          &copy; 2025 Ona Daktari. All rights reserved.
        </p>
        
        <div class="flex gap-4 mt-4 md:mt-0">
          <a href="#" class="text-gray-400 hover:text-white transition">Privacy Policy</a>
          <a href="#" class="text-gray-400 hover:text-white transition">Terms of Service</a>
          <a href="#" class="text-gray-400 hover:text-white transition">Contact Us</a>
        </div>
      </div>

      <!-- Social Media -->
      <div class="flex gap-4 mt-6 justify-center">
        <a href="#" class="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition">f</a>
        <a href="#" class="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-400 transition">𝕏</a>
        <a href="#" class="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-pink-600 transition">📷</a>
        <a href="#" class="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition">▶️</a>
      </div>
    </div>
  </footer>
</template>

<script setup>
</script>

<style scoped>
footer {
  margin-top: 4rem;
}
</style>