<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
    <!-- Header -->
    <div class="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-8 px-6 rounded-b-2xl shadow-lg">
      <div class="max-w-7xl mx-auto">
        <div class="flex items-center justify-between mb-6">
          <div>
            <h1 class="text-4xl font-bold mb-2">💊 E-Pharmacy</h1>
            <p class="text-blue-100">Quality medicines delivered to your doorstep</p>
          </div>
          <div class="bg-white/20 backdrop-blur-lg rounded-lg px-4 py-2 border border-white/30">
            <p class="text-sm text-blue-100">Cart Items: <span class="font-bold text-lg">{{ cart.length }}</span></p>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-6 py-8">
      <!-- Search and Filter Section -->
      <div class="mb-8 space-y-4">
        <!-- Search Bar -->
        <div class="relative group">
          <svg class="absolute left-4 top-4 text-gray-400 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input 
            v-model="searchQuery" 
            type="text" 
            placeholder="Search medicines by name or category..." 
            class="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-white shadow-sm"
          />
        </div>

        <!-- Category Filter -->
        <div class="flex gap-2 overflow-x-auto pb-3 scrollbar-hide">
          <button 
            v-for="category in categories" 
            :key="category"
            @click="selectedCategory = category"
            :class="[
              'px-5 py-2 rounded-full whitespace-nowrap font-medium transition-all duration-300 transform hover:scale-105',
              selectedCategory === category 
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg' 
                : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-blue-300 hover:bg-blue-50'
            ]"
          >
            {{ category }}
          </button>
        </div>
      </div>

      <div class="grid lg:grid-cols-3 gap-8">
        <!-- Medicine Grid -->
        <div class="lg:col-span-2">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-2xl font-bold text-gray-900">Available Medicines</h2>
            <span class="text-gray-600">{{ filteredMedicines.length }} products</span>
          </div>

          <div v-if="filteredMedicines.length > 0" class="grid md:grid-cols-2 gap-5">
            <div 
              v-for="medicine in filteredMedicines" 
              :key="medicine.id"
              class="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group"
            >
              <!-- Medicine Image/Icon Area -->
              <div class="bg-gradient-to-br from-blue-100 to-blue-50 p-6 text-center relative overflow-hidden">
                <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 group-hover:translate-x-full transition-transform duration-500"></div>
                <div class="text-6xl group-hover:scale-110 transition-transform duration-300">💊</div>
                <div v-if="medicine.stock > 10" class="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  In Stock
                </div>
                <div v-else-if="medicine.stock > 0" class="absolute top-3 right-3 bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  Low Stock
                </div>
                <div v-else class="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  Out
                </div>
              </div>

              <!-- Medicine Details -->
              <div class="p-5">
                <h3 class="font-bold text-lg text-gray-900 mb-1 line-clamp-2">{{ medicine.name }}</h3>
                <p class="text-blue-600 text-sm font-medium mb-3">{{ medicine.category }}</p>
                
                <div class="flex items-baseline gap-2 mb-4">
                  <p class="text-green-600 font-bold text-2xl">KES {{ medicine.price }}</p>
                  <p class="text-gray-500 text-xs line-through">KES {{ Math.round(medicine.price * 1.2) }}</p>
                </div>

                <p class="text-gray-600 text-xs mb-4">
                  <span v-if="medicine.stock > 0" class="text-green-600 font-semibold">{{ medicine.stock }} units available</span>
                  <span v-else class="text-red-600 font-semibold">Out of stock</span>
                </p>

                <button 
                  @click="addToCart(medicine)"
                  :disabled="medicine.stock === 0"
                  class="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2.5 rounded-lg hover:shadow-lg hover:from-blue-700 hover:to-blue-800 text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none transition-all duration-300 transform hover:scale-105 active:scale-95"
                >
                  {{ medicine.stock > 0 ? 'Add to Cart' : 'Unavailable' }}
                </button>
              </div>
            </div>
          </div>

          <div v-else class="text-center py-16 bg-white rounded-xl border-2 border-dashed border-gray-300">
            <div class="text-5xl mb-4">🔍</div>
            <p class="text-gray-600 text-lg font-medium">No medicines found</p>
            <p class="text-gray-500 text-sm mt-2">Try adjusting your search or filters</p>
          </div>
        </div>

        <!-- Cart Sidebar -->
        <div class="lg:col-span-1">
          <div class="sticky top-8">
            <div class="bg-gradient-to-br from-white to-blue-50 rounded-xl shadow-lg border border-gray-200 p-6">
              <div class="flex items-center gap-2 mb-6">
                <div class="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-lg">🛒</div>
                <h3 class="text-xl font-bold text-gray-900">Shopping Cart</h3>
              </div>

              <div v-if="cart.length > 0" class="space-y-4">
                <!-- Cart Items -->
                <div class="max-h-80 overflow-y-auto space-y-3 pr-2">
                  <div 
                    v-for="item in cart" 
                    :key="item.id"
                    class="bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-300 transition"
                  >
                    <div class="flex justify-between items-start mb-2">
                      <div class="flex-1">
                        <p class="font-semibold text-gray-900 text-sm line-clamp-1">{{ item.name }}</p>
                        <p class="text-blue-600 font-bold text-sm mt-1">KES {{ item.price }}</p>
                      </div>
                      <button 
                        @click="removeFromCart(item.id)"
                        class="text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full w-7 h-7 flex items-center justify-center transition"
                      >
                        ✕
                      </button>
                    </div>
                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-2 bg-gray-100 rounded px-2 py-1">
                        <button @click="decreaseQuantity(item.id)" class="text-gray-600 hover:text-gray-900">−</button>
                        <span class="font-semibold text-gray-900 min-w-6 text-center">{{ item.quantity }}</span>
                        <button @click="increaseQuantity(item.id)" class="text-gray-600 hover:text-gray-900">+</button>
                      </div>
                      <span class="font-bold text-gray-900">KES {{ item.price * item.quantity }}</span>
                    </div>
                  </div>
                </div>

                <!-- Cart Summary -->
                <div class="border-t-2 border-gray-200 pt-4 space-y-3">
                  <div class="flex justify-between text-gray-600">
                    <span>Subtotal:</span>
                    <span>KES {{ cartTotal }}</span>
                  </div>
                  <div class="flex justify-between text-gray-600">
                    <span>Delivery:</span>
                    <span class="text-green-600 font-semibold">Free</span>
                  </div>
                  <div class="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-3 text-white">
                    <div class="flex justify-between items-center">
                      <span class="font-bold">Total Amount:</span>
                      <span class="text-2xl font-bold">KES {{ cartTotal }}</span>
                    </div>
                  </div>
                </div>

                <button 
                  @click="handleCheckout"
                  class="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-lg hover:shadow-lg hover:from-green-600 hover:to-green-700 font-bold transition-all duration-300 transform hover:scale-105 active:scale-95"
                >
                  Proceed to Checkout
                </button>

                <button 
                  @click="clearCart"
                  class="w-full bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 font-medium transition"
                >
                  Clear Cart
                </button>
              </div>

              <!-- Empty Cart State -->
              <div v-else class="text-center py-8">
                <div class="text-4xl mb-3">🛍️</div>
                <p class="text-gray-600 font-medium mb-2">Your cart is empty</p>
                <p class="text-gray-500 text-sm">Start adding medicines to your cart</p>
              </div>
            </div>
          </div>
        </div>
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

const increaseQuantity = (medicineId) => {
  const item = cart.value.find(i => i.id === medicineId)
  if (item && item.quantity < item.stock) {
    item.quantity++
  }
}

const decreaseQuantity = (medicineId) => {
  const item = cart.value.find(i => i.id === medicineId)
  if (item && item.quantity > 1) {
    item.quantity--
  } else if (item) {
    removeFromCart(medicineId)
  }
}

const clearCart = () => {
  cart.value = []
  appStore.notifyInfo('Cart cleared')
}

const handleCheckout = () => {
  appStore.notifySuccess('Proceeding to payment...')
  cart.value = []
  // Integrate with payment gateway here
}
</script>