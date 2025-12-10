<template>
  <div>
    <h2 class="text-2xl font-bold text-gray-900 mb-6">E-Pharmacy</h2>

    <!-- Search and Filter -->
    <div class="mb-8 space-y-4">
      <div class="flex flex-col md:flex-row gap-4">
        <div class="flex-1 relative">
          <svg class="absolute left-3 top-3 text-gray-400 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input 
            v-model="searchQuery" 
            type="text" 
            placeholder="Search medicines..." 
            class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
      </div>

      <!-- Category Filter -->
      <div class="flex gap-2 overflow-x-auto pb-2">
        <button 
          v-for="category in categories" 
          :key="category"
          @click="selectedCategory = category"
          :class="[
            'px-4 py-2 rounded-full whitespace-nowrap transition',
            selectedCategory === category 
              ? 'bg-orange-600 text-white' 
              : 'bg-white border border-gray-300 hover:bg-gray-50'
          ]"
        >
          {{ category }}
        </button>
      </div>
    </div>

    <!-- Medicine Cards -->
    <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div 
        v-for="medicine in filteredMedicines" 
        :key="medicine.id"
        class="bg-white p-4 rounded-lg shadow hover:shadow-lg transition"
      >
        <div class="text-4xl mb-3">💊</div>
        <h3 class="font-semibold mb-2 text-gray-900">{{ medicine.name }}</h3>
        <p class="text-gray-600 text-sm mb-2">{{ medicine.category }}</p>
        <p class="text-green-600 font-bold text-lg mb-3">KES {{ medicine.price }}</p>
        <p class="text-gray-600 text-xs mb-3">
          <span v-if="medicine.stock > 0" class="text-green-600">{{ medicine.stock }} in stock</span>
          <span v-else class="text-red-600">Out of stock</span>
        </p>
        <button 
          @click="addToCart(medicine)"
          :disabled="medicine.stock === 0"
          class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 text-sm disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          Add to Cart
        </button>
      </div>
    </div>

    <div v-if="filteredMedicines.length === 0" class="text-center py-12">
      <p class="text-gray-600">No medicines found</p>
    </div>

    <!-- Cart Summary -->
    <div v-if="cart.length > 0" class="mt-8 bg-white p-6 rounded-lg shadow">
      <h3 class="text-lg font-bold text-gray-900 mb-4">Shopping Cart ({{ cart.length }} items)</h3>
      
      <div class="space-y-3 mb-6">
        <div 
          v-for="item in cart" 
          :key="item.id"
          class="flex justify-between items-center p-3 border border-gray-200 rounded"
        >
          <div>
            <p class="font-semibold text-gray-900">{{ item.name }}</p>
            <p class="text-gray-600 text-sm">KES {{ item.price }} x {{ item.quantity }}</p>
          </div>
          <div class="flex items-center gap-3">
            <span class="font-bold">KES {{ item.price * item.quantity }}</span>
            <button 
              @click="removeFromCart(item.id)"
              class="text-red-600 hover:text-red-700"
            >
              ✕
            </button>
          </div>
        </div>
      </div>

      <div class="border-t pt-4">
        <div class="flex justify-between items-center mb-4">
          <span class="text-lg font-bold text-gray-900">Total:</span>
          <span class="text-2xl font-bold text-green-600">KES {{ cartTotal }}</span>
        </div>
        <button 
          @click="handleCheckout"
          class="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 font-semibold transition"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAppStore } from '@/stores/app'

const appStore = useAppStore()

const searchQuery = ref('')
const selectedCategory = ref('All')
const cart = ref([])

const categories = computed(() => {
  return ['All', ...appStore.getMedicineCategories]
})

const filteredMedicines = computed(() => {
  let medicines = appStore.medicines

  if (selectedCategory.value !== 'All') {
    medicines = medicines.filter(med => med.category === selectedCategory.value)
  }

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    medicines = medicines.filter(med =>
      med.name.toLowerCase().includes(query) ||
      med.category.toLowerCase().includes(query)
    )
  }

  return medicines
})

const cartTotal = computed(() => {
  return cart.value.reduce((total, item) => total + (item.price * item.quantity), 0)
})

const addToCart = (medicine) => {
  const existingItem = cart.value.find(item => item.id === medicine.id)
  
  if (existingItem) {
    existingItem.quantity++
  } else {
    cart.value.push({
      ...medicine,
      quantity: 1
    })
  }

  appStore.notifySuccess(`${medicine.name} added to cart`)
}

const removeFromCart = (medicineId) => {
  cart.value = cart.value.filter(item => item.id !== medicineId)
  appStore.notifyInfo('Item removed from cart')
}

const handleCheckout = () => {
  appStore.notifySuccess('Proceeding to payment...')
  cart.value = []
  // Integrate with payment gateway here
}
</script>