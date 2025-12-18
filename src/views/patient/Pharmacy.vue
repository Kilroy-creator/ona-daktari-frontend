<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
    <!-- Header -->
    <div class="sticky top-0 z-30 bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700 text-white py-6 px-6 shadow-xl">
      <div class="max-w-7xl mx-auto">
        <div class="flex items-center justify-between mb-6">
          <div>
            <div class="flex items-center gap-3 mb-2">
              <div class="text-4xl">💊</div>
              <div>
                <h1 class="text-4xl font-bold">E-Pharmacy</h1>
                <p class="text-blue-100 text-sm">Fast delivery • Quality assured</p>
              </div>
            </div>
          </div>
          <div class="bg-white/20 backdrop-blur-xl rounded-2xl px-6 py-3 border border-white/30 hover:bg-white/30 transition">
            <div class="text-center">
              <p class="text-blue-100 text-xs uppercase tracking-wide">Cart Items</p>
              <p class="text-3xl font-bold text-white">{{ cart.length }}</p>
            </div>
          </div>
        </div>

        <!-- Search Bar in Header -->
        <div class="relative group">
          <svg class="absolute left-4 top-4 text-blue-200 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input 
            v-model="searchQuery" 
            type="text" 
            placeholder="Search medicines by name..." 
            class="w-full pl-12 pr-4 py-3 border-2 border-blue-200 rounded-xl focus:ring-2 focus:ring-white focus:border-transparent outline-none transition bg-white/95 shadow-md text-gray-900 placeholder-gray-500"
          />
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-6 py-8">
      <!-- Category Filter -->
      <div class="mb-8">
        <h3 class="text-sm font-bold text-gray-600 uppercase tracking-wide mb-4 flex items-center gap-2">
          <span>📂</span> Categories
        </h3>
        <div class="flex gap-3 overflow-x-auto pb-3 scrollbar-hide">
          <button 
            v-for="category in categories" 
            :key="category"
            @click="selectedCategory = category"
            :class="[
              'px-6 py-2.5 rounded-full whitespace-nowrap font-semibold transition-all duration-300 transform hover:scale-105 text-sm',
              selectedCategory === category 
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105' 
                : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-blue-400 hover:bg-blue-50'
            ]"
          >
            {{ category }}
          </button>
        </div>
      </div>

      <div class="grid lg:grid-cols-4 gap-8">
        <!-- Medicine Grid -->
        <div class="lg:col-span-3">
          <div class="flex items-center justify-between mb-8">
            <div>
              <h2 class="text-3xl font-bold text-gray-900">Available Medicines</h2>
              <p class="text-gray-600 mt-1">{{ filteredMedicines.length }} products</p>
            </div>
          </div>

          <!-- No Results -->
          <div v-if="filteredMedicines.length === 0" class="text-center py-16 bg-white rounded-2xl border-2 border-dashed border-gray-300 shadow-sm">
            <div class="text-6xl mb-4 animate-bounce">🔍</div>
            <p class="text-gray-600 text-lg font-bold mb-2">No medicines found</p>
            <p class="text-gray-500">Try adjusting your search or filters</p>
          </div>

          <!-- Medicine Grid -->
          <div v-else class="grid md:grid-cols-2 gap-6">
            <div 
              v-for="medicine in filteredMedicines" 
              :key="medicine.id"
              class="group relative bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 transform hover:scale-105"
            >
              <!-- Gradient overlay on hover -->
              <div class="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 transition duration-300"></div>

              <!-- Medicine Image Area -->
              <div class="bg-gradient-to-br from-blue-100 via-blue-50 to-purple-100 p-8 text-center relative overflow-hidden h-40 flex items-center justify-center">
                <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 group-hover:translate-x-full transition-transform duration-500"></div>
                <div class="text-7xl group-hover:scale-125 transition-transform duration-300 relative z-10">💊</div>
                
                <!-- Stock Badge -->
                <div class="absolute top-4 right-4 z-20">
                  <div v-if="medicine.stock > 10" class="bg-gradient-to-r from-green-400 to-green-500 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
                    <span>✓</span> In Stock
                  </div>
                  <div v-else-if="medicine.stock > 0" class="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
                    <span>⚠</span> Low Stock
                  </div>
                  <div v-else class="bg-gradient-to-r from-red-400 to-red-500 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg">
                    Out of Stock
                  </div>
                </div>
              </div>

              <!-- Medicine Details -->
              <div class="p-6 relative z-10">
                <h3 class="font-bold text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition">{{ medicine.name }}</h3>
                <p class="text-blue-600 text-sm font-semibold mb-4 bg-blue-50 inline-block px-3 py-1 rounded-full">{{ medicine.category }}</p>
                
                <!-- Pricing -->
                <div class="flex items-baseline gap-3 mb-4">
                  <p class="text-green-600 font-bold text-3xl">KES {{ medicine.price.toLocaleString() }}</p>
                  <p class="text-gray-400 text-sm line-through">KES {{ Math.round(medicine.price * 1.2).toLocaleString() }}</p>
                  <span class="text-orange-600 font-bold text-xs bg-orange-50 px-2 py-1 rounded">-17%</span>
                </div>

                <!-- Stock Info -->
                <p class="text-gray-600 text-xs mb-6 font-medium">
                  <span v-if="medicine.stock > 0" class="text-green-600">✓ {{ medicine.stock }} units available</span>
                  <span v-else class="text-red-600">✕ Out of stock</span>
                </p>

                <!-- Add to Cart Button -->
                <button 
                  @click="addToCart(medicine)"
                  :disabled="medicine.stock === 0"
                  class="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-xl hover:shadow-lg hover:from-blue-700 hover:to-blue-800 text-sm font-bold disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:shadow-none transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
                >
                  <span>🛒</span>
                  {{ medicine.stock > 0 ? 'Add to Cart' : 'Unavailable' }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Cart Sidebar -->
        <div class="lg:col-span-1">
          <div class="sticky top-24">
            <!-- Cart Header -->
            <div class="bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-2xl shadow-xl p-6 mb-6">
              <div class="flex items-center gap-3 mb-4">
                <div class="bg-white/30 backdrop-blur-lg rounded-full w-12 h-12 flex items-center justify-center text-2xl">🛒</div>
                <div>
                  <h3 class="text-xl font-bold">Shopping Cart</h3>
                  <p class="text-blue-100 text-xs">{{ cart.length }} item{{ cart.length !== 1 ? 's' : '' }}</p>
                </div>
              </div>
            </div>

            <!-- Cart Content -->
            <div v-if="cart.length > 0" class="space-y-4">
              <!-- Cart Items -->
              <div class="max-h-96 overflow-y-auto space-y-3 pr-2">
                <div 
                  v-for="item in cart" 
                  :key="item.id"
                  class="bg-white p-4 rounded-xl border-2 border-gray-200 hover:border-blue-400 hover:shadow-lg transition-all duration-200 group"
                >
                  <div class="flex justify-between items-start mb-3">
                    <div class="flex-1">
                      <p class="font-bold text-gray-900 text-sm line-clamp-2">{{ item.name }}</p>
                      <p class="text-blue-600 font-bold text-sm mt-1">KES {{ item.price.toLocaleString() }}</p>
                    </div>
                    <button 
                      @click="removeFromCart(item.id)"
                      class="text-red-500 hover:text-white hover:bg-red-500 rounded-lg w-7 h-7 flex items-center justify-center transition-all text-sm font-bold"
                    >
                      ✕
                    </button>
                  </div>
                  
                  <!-- Quantity Controls -->
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-1 bg-gray-100 rounded-lg px-2 py-1">
                      <button @click="decreaseQuantity(item.id)" class="text-gray-700 hover:text-gray-900 font-bold text-lg w-6 h-6 flex items-center justify-center">−</button>
                      <span class="font-bold text-gray-900 min-w-8 text-center">{{ item.quantity }}</span>
                      <button @click="increaseQuantity(item.id)" class="text-gray-700 hover:text-gray-900 font-bold text-lg w-6 h-6 flex items-center justify-center">+</button>
                    </div>
                    <span class="font-bold text-gray-900">KES {{ (item.price * item.quantity).toLocaleString() }}</span>
                  </div>
                </div>
              </div>

              <!-- Cart Summary -->
              <div class="bg-white rounded-xl shadow-lg p-6 border border-gray-200 space-y-4">
                <div class="space-y-3 pb-4 border-b border-gray-200">
                  <div class="flex justify-between text-gray-600">
                    <span class="font-medium">Subtotal:</span>
                    <span class="font-bold text-gray-900">KES {{ cartTotal.toLocaleString() }}</span>
                  </div>
                  <div class="flex justify-between text-gray-600">
                    <span class="font-medium">Delivery:</span>
                    <span class="text-green-600 font-bold">FREE</span>
                  </div>
                  <div class="flex justify-between text-gray-600">
                    <span class="font-medium">Tax (16%):</span>
                    <span class="font-bold text-gray-900">KES {{ Math.round(cartTotal * 0.16).toLocaleString() }}</span>
                  </div>
                </div>

                <div class="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-4 text-white shadow-lg">
                  <p class="text-blue-100 text-xs uppercase tracking-wide mb-1">Total Amount</p>
                  <p class="text-4xl font-bold">KES {{ (cartTotal + Math.round(cartTotal * 0.16)).toLocaleString() }}</p>
                </div>

                <button 
                  @click="handleCheckout"
                  class="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3.5 rounded-xl hover:shadow-xl hover:from-green-600 hover:to-emerald-700 font-bold transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
                >
                  <span>✓</span> Proceed to Checkout
                </button>

                <button 
                  @click="clearCart"
                  class="w-full bg-gray-200 text-gray-700 py-2.5 rounded-xl hover:bg-gray-300 font-semibold transition-all duration-200"
                >
                  Clear Cart
                </button>
              </div>
            </div>

            <!-- Empty Cart State -->
            <div v-else class="bg-white rounded-2xl shadow-lg p-8 text-center border border-gray-200">
              <div class="text-6xl mb-4 animate-bounce">🛍️</div>
              <p class="text-gray-700 font-bold mb-2 text-lg">Cart is Empty</p>
              <p class="text-gray-500 text-sm mb-6">Start adding medicines to get started</p>
              <button 
                @click="$emit('back')"
                class="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2.5 rounded-xl hover:shadow-lg font-semibold transition-all"
              >
                Continue Shopping
              </button>
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
    if (existingItem.quantity < medicine.stock) {
      existingItem.quantity++
    }
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
  setTimeout(() => {
    cart.value = []
  }, 1500)
}
</script>

<style scoped>
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.animate-bounce {
  animation: bounce 2s infinite;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>