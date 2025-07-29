<template>
  <div id="app" class="min-h-screen bg-gray-50">
    <div v-if="loading" class="min-h-screen flex items-center justify-center">
      <div class="text-center">
        <div
          class="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"
        ></div>
        <p class="text-gray-600">Loading Date Portal...</p>
      </div>
    </div>

    <div
      v-else-if="!user"
      class="min-h-screen flex items-center justify-center p-2 sm:p-4"
    >
      <div class="max-w-md w-full">
        <div
          v-if="currentView === 'login'"
          class="bg-white rounded-lg shadow-lg p-4 sm:p-8"
        >
          <div class="text-center mb-8">
            <img
              src="/logo.png"
              alt="Date Portal Logo"
              class="w-16 h-16 mx-auto mb-4 drop-shadow-lg animate-pulse-heart"
            />
            <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Date Portal
            </h1>
            <p class="text-gray-600 text-base sm:text-lg">
              Manage your romantic life with style
            </p>
          </div>

          <form @submit.prevent="handleLogin" class="space-y-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Email</label
              >
              <input
                v-model="email"
                type="email"
                required
                class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Password</label
              >
              <input
                v-model="password"
                type="password"
                required
                class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              class="w-full bg-pink-500 hover:bg-pink-600 text-white font-medium py-3 rounded-lg transition-colors"
            >
              Sign In
            </button>
          </form>

          <div class="mt-6 text-center">
            <p class="text-gray-600">
              Don't have an account?
              <button
                @click="currentView = 'register'"
                class="text-pink-500 hover:text-pink-600 font-medium"
              >
                Sign up
              </button>
            </p>
          </div>
        </div>

        <div
          v-else-if="currentView === 'register'"
          class="bg-white rounded-lg shadow-lg p-4 sm:p-8"
        >
          <div class="text-center mb-8">
            <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Join Date Portal
            </h1>
            <p class="text-gray-600 text-base sm:text-lg">
              Start organizing your romantic life
            </p>
          </div>

          <form @submit.prevent="handleRegister" class="space-y-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Email</label
              >
              <input
                v-model="email"
                type="email"
                required
                class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Password</label
              >
              <input
                v-model="password"
                type="password"
                required
                minlength="6"
                class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              class="w-full bg-pink-500 hover:bg-pink-600 text-white font-medium py-3 rounded-lg transition-colors"
            >
              Create Account
            </button>
          </form>

          <div class="mt-6 text-center">
            <p class="text-gray-600">
              Already have an account?
              <button
                @click="currentView = 'login'"
                class="text-pink-500 hover:text-pink-600 font-medium"
              >
                Sign in
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="min-h-screen pb-24 sm:pb-20">
      <header class="bg-white shadow-sm border-b border-gray-200">
        <div class="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
          <div class="flex justify-between items-center h-16">
            <div class="flex items-center space-x-2">
              <img src="/logo.png" alt="Logo" class="w-11 h-10" />
              <h1 class="text-lg sm:text-xl font-bold text-gray-900">
                Date Portal
              </h1>
            </div>
            <div class="flex items-center space-x-2">
              <span class="text-xs sm:text-sm text-gray-600">{{
                user.email
              }}</span>
              <button
                @click="handleLogout"
                class="p-2 rounded-full hover:bg-pink-100 text-pink-500 transition-colors focus:outline-none"
                title="Sign Out"
              >
                <svg
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main class="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-4 sm:py-8">
        <Transition name="fade" mode="out-in">
          <div
            v-if="currentView === 'dashboard'"
            class="space-y-6 sm:space-y-8"
          >
            <div class="text-center">
              <h2 class="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                Welcome back!
              </h2>
              <p class="text-gray-600 text-base sm:text-lg">
                Here's your romantic life overview
              </p>
            </div>

            <div
              class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
            >
              <div
                class="bg-white rounded-lg shadow-sm p-4 sm:p-6 border border-gray-200"
              >
                <div class="flex items-center justify-between mb-4">
                  <h3 class="font-semibold text-gray-900">
                    This Month's Spending
                  </h3>
                  <div class="text-2xl">💝</div>
                </div>
                <div class="text-3xl font-bold text-pink-500 mb-2">
                  ${{ monthlySpent }}
                </div>
                <div class="text-sm text-gray-600">
                  Budget: ${{ userSettings?.monthlyBudget || 500 }}
                  <span
                    v-if="monthlySpent > (userSettings?.monthlyBudget || 500)"
                    class="text-red-500 ml-2"
                  >
                    Over budget!
                  </span>
                </div>
              </div>

              <div
                class="bg-white rounded-lg shadow-sm p-4 sm:p-6 border border-gray-200"
              >
                <div class="flex items-center justify-between mb-4">
                  <h3 class="font-semibold text-gray-900">Total Dates</h3>
                  <div class="text-2xl">💕</div>
                </div>
                <div class="text-3xl font-bold text-pink-500 mb-2">
                  {{ totalDates }}
                </div>
                <div class="text-sm text-gray-600">Memories created</div>
              </div>

              <div
                class="bg-white rounded-lg shadow-sm p-4 sm:p-6 border border-gray-200"
              >
                <div class="flex items-center justify-between mb-4">
                  <h3 class="font-semibold text-gray-900">
                    Upcoming Reminders
                  </h3>
                  <div class="text-2xl">⏰</div>
                </div>
                <div class="text-3xl font-bold text-pink-500 mb-2">
                  {{ upcomingReminders }}
                </div>
                <div class="text-sm text-gray-600">Don't forget!</div>
              </div>
            </div>

            <div
              class="bg-white rounded-lg shadow-sm p-4 sm:p-6 border border-gray-200"
            >
              <h3 class="font-semibold text-gray-900 mb-4">Recent Dates</h3>
              <div
                v-if="recentDates.length === 0"
                class="text-center py-8 text-gray-500"
              >
                <div class="text-4xl mb-4">📝</div>
                <p>No dates logged yet. Start by adding your first date!</p>
                <button
                  @click="currentView = 'dates'"
                  class="mt-4 bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  Add Date
                </button>
              </div>
              <div v-else class="space-y-3">
                <div
                  v-for="dateEntry in recentDates.slice(0, 3)"
                  :key="dateEntry.id"
                  class="flex justify-between items-center p-4 bg-gray-50 rounded-lg"
                >
                  <div>
                    <h4 class="font-medium text-gray-900">
                      {{ dateEntry.title }}
                    </h4>
                    <p class="text-sm text-gray-600">
                      {{ dateEntry.category }} • ${{ dateEntry.cost }}
                    </p>
                  </div>
                  <div class="text-sm text-gray-500">
                    {{ formatDate(dateEntry.createdAt) }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            v-else-if="currentView === 'dates'"
            class="space-y-4 sm:space-y-6"
          >
            <div
              class="flex flex-col sm:flex-row justify-between items-start sm:items-center"
            >
              <h2
                class="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-0"
              >
                My Dates
              </h2>
              <button
                @click="showDateForm = true"
                class="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center mt-2 sm:mt-0"
              >
                <svg
                  class="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 4v16m8-8H4"
                  ></path>
                </svg>
                Add Date
              </button>
            </div>

            <div
              v-if="showDateForm"
              class="bg-white rounded-lg shadow-sm p-4 sm:p-6 border border-gray-200"
            >
              <h3 class="font-semibold text-gray-900 mb-4">Add New Date</h3>
              <form @submit.prevent="handleAddDate" class="space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2"
                      >Title</label
                    >
                    <input
                      v-model="newDate.title"
                      type="text"
                      required
                      class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      placeholder="Movie night at home"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2"
                      >Category</label
                    >
                    <select
                      v-model="newDate.category"
                      class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    >
                      <option value="dinner">Dinner</option>
                      <option value="movie">Movie</option>
                      <option value="activity">Activity</option>
                      <option value="travel">Travel</option>
                      <option value="gift">Gift</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2"
                    >Cost ($)</label
                  >
                  <input
                    v-model.number="newDate.cost"
                    type="number"
                    min="0"
                    step="0.01"
                    class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2"
                    >Notes</label
                  >
                  <textarea
                    v-model="newDate.notes"
                    rows="3"
                    class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="How was it? What made it special?"
                  ></textarea>
                </div>
                <div class="flex justify-end space-x-3">
                  <button
                    type="button"
                    @click="showDateForm = false"
                    class="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    class="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                  >
                    Add Date
                  </button>
                </div>
              </form>
            </div>

            <div
              class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
            >
              <div
                v-for="dateEntry in dates"
                :key="dateEntry.id"
                class="bg-white rounded-lg shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div class="flex justify-between items-start mb-4">
                  <h3 class="font-semibold text-gray-900">
                    {{ dateEntry.title }}
                  </h3>
                  <span class="text-2xl">{{
                    getCategoryEmoji(dateEntry.category)
                  }}</span>
                </div>
                <div v-if="editingDateId === dateEntry.id" class="space-y-2">
                  <input
                    v-model="editingDate.title"
                    type="text"
                    class="w-full border rounded-lg px-3 py-2 mb-2"
                  />
                  <select
                    v-model="editingDate.category"
                    class="w-full border rounded-lg px-3 py-2 mb-2"
                  >
                    <option value="dinner">Dinner</option>
                    <option value="movie">Movie</option>
                    <option value="activity">Activity</option>
                    <option value="travel">Travel</option>
                    <option value="gift">Gift</option>
                    <option value="other">Other</option>
                  </select>
                  <input
                    v-model.number="editingDate.cost"
                    type="number"
                    min="0"
                    step="0.01"
                    class="w-full border rounded-lg px-3 py-2 mb-2"
                  />
                  <textarea
                    v-model="editingDate.notes"
                    rows="2"
                    class="w-full border rounded-lg px-3 py-2 mb-2"
                  ></textarea>
                  <div class="flex justify-end space-x-2">
                    <button
                      @click="cancelEditDate"
                      class="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
                    >
                      Cancel
                    </button>
                    <button
                      @click="handleUpdateDate"
                      :disabled="dateActionLoading"
                      class="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-lg font-medium"
                    >
                      Save
                    </button>
                  </div>
                </div>
                <div v-else class="space-y-2">
                  <div class="flex justify-between text-sm">
                    <span class="text-gray-600">Category:</span>
                    <span class="font-medium text-gray-900 capitalize">{{
                      dateEntry.category
                    }}</span>
                  </div>
                  <div class="flex justify-between text-sm">
                    <span class="text-gray-600">Cost:</span>
                    <span class="font-medium text-pink-500"
                      >${{ dateEntry.cost }}</span
                    >
                  </div>
                  <div class="flex justify-between text-sm">
                    <span class="text-gray-600">Date:</span>
                    <span class="font-medium text-gray-900">{{
                      formatDate(dateEntry.createdAt)
                    }}</span>
                  </div>
                  <div
                    v-if="dateEntry.notes"
                    class="mt-4 text-sm text-gray-600 bg-gray-50 rounded-lg p-3"
                  >
                    {{ dateEntry.notes }}
                  </div>
                  <div class="flex justify-end mt-2 space-x-2">
                    <button
                      @click="startEditDate(dateEntry)"
                      class="text-pink-500 hover:text-pink-600 font-medium text-sm"
                    >
                      Edit
                    </button>
                    <button
                      @click="handleDeleteDate(dateEntry.id)"
                      :disabled="dateActionLoading"
                      class="text-red-500 hover:text-red-600 font-medium text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            v-else-if="currentView === 'budget'"
            class="space-y-4 sm:space-y-6"
          >
            <h2 class="text-xl sm:text-2xl font-bold text-gray-900">
              Budget Tracking
            </h2>

            <div
              class="bg-white rounded-lg shadow-sm p-4 sm:p-6 border border-gray-200"
            >
              <div class="flex justify-between items-center mb-6">
                <h3 class="font-semibold text-gray-900">Monthly Budget</h3>
                <button
                  @click="showBudgetForm = !showBudgetForm"
                  class="text-pink-500 hover:text-pink-600 font-medium"
                >
                  Edit Budget
                </button>
              </div>

              <div v-if="showBudgetForm" class="mb-6">
                <form @submit.prevent="updateBudget" class="flex space-x-4">
                  <input
                    v-model.number="newBudget"
                    type="number"
                    min="0"
                    step="1"
                    required
                    class="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="500"
                  />
                  <button
                    type="submit"
                    class="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                  >
                    Update
                  </button>
                </form>
              </div>

              <div class="text-center">
                <div class="text-4xl font-bold text-pink-500 mb-2">
                  ${{ monthlySpent }}
                </div>
                <div class="text-lg text-gray-600 mb-4">
                  of ${{ userSettings?.monthlyBudget || 500 }} spent
                </div>

                <div class="w-full bg-gray-200 rounded-full h-4 mb-4">
                  <div
                    class="h-4 rounded-full transition-all duration-500"
                    :class="
                      budgetPercentage > 100
                        ? 'bg-red-500'
                        : budgetPercentage > 80
                          ? 'bg-yellow-500'
                          : 'bg-green-500'
                    "
                    :style="{ width: Math.min(budgetPercentage, 100) + '%' }"
                  ></div>
                </div>

                <div
                  v-if="budgetPercentage > 100"
                  class="text-red-600 font-medium"
                >
                  ⚠️ Over budget by ${{
                    (
                      monthlySpent - (userSettings?.monthlyBudget || 500)
                    ).toFixed(2)
                  }}
                </div>
                <div v-else class="text-gray-600">
                  ${{
                    (
                      (userSettings?.monthlyBudget || 500) - monthlySpent
                    ).toFixed(2)
                  }}
                  remaining
                </div>
              </div>
            </div>

            <div
              class="bg-white rounded-lg shadow-sm p-4 sm:p-6 border border-gray-200"
            >
              <h3 class="font-semibold text-gray-900 mb-4">
                Spending by Category
              </h3>
              <div class="space-y-3">
                <div
                  v-for="category in spendingByCategory"
                  :key="category.name"
                  class="flex justify-between items-center"
                >
                  <div class="flex items-center">
                    <span class="text-lg mr-2">{{
                      getCategoryEmoji(category.name)
                    }}</span>
                    <span class="font-medium text-gray-900 capitalize">{{
                      category.name
                    }}</span>
                  </div>
                  <span class="text-pink-500 font-medium"
                    >${{ category.total.toFixed(2) }}</span
                  >
                </div>
              </div>
            </div>
          </div>

          <div
            v-else-if="currentView === 'reminders'"
            class="space-y-4 sm:space-y-6"
          >
            <div
              class="flex flex-col sm:flex-row justify-between items-start sm:items-center"
            >
              <h2
                class="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-0"
              >
                Reminders
              </h2>
              <button
                @click="showReminderForm = true"
                class="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center mt-2 sm:mt-0"
              >
                <svg
                  class="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 4v16m8-8H4"
                  ></path>
                </svg>
                Add Reminder
              </button>
            </div>

            <div
              v-if="showReminderForm"
              class="bg-white rounded-lg shadow-sm p-4 sm:p-6 border border-gray-200"
            >
              <h3 class="font-semibold text-gray-900 mb-4">Add New Reminder</h3>
              <form @submit.prevent="handleAddReminder" class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2"
                    >Title</label
                  >
                  <input
                    v-model="newReminder.title"
                    type="text"
                    required
                    class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="Anniversary dinner"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2"
                    >Date</label
                  >
                  <input
                    v-model="newReminder.date"
                    type="date"
                    required
                    class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2"
                    >Notes</label
                  >
                  <textarea
                    v-model="newReminder.notes"
                    rows="3"
                    class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="What should you remember?"
                  ></textarea>
                </div>
                <div class="flex justify-end space-x-3">
                  <button
                    type="button"
                    @click="showReminderForm = false"
                    class="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    class="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                  >
                    Add Reminder
                  </button>
                </div>
              </form>
            </div>

            <div class="space-y-4">
              <div
                v-for="reminder in reminders"
                :key="reminder.id"
                class="bg-white rounded-lg shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div v-if="editingReminderId === reminder.id">
                  <input
                    v-model="editingReminder.title"
                    type="text"
                    class="w-full border rounded-lg px-3 py-2 mb-2"
                  />
                  <input
                    v-model="editingReminder.date"
                    type="date"
                    class="w-full border rounded-lg px-3 py-2 mb-2"
                  />
                  <textarea
                    v-model="editingReminder.notes"
                    rows="2"
                    class="w-full border rounded-lg px-3 py-2 mb-2"
                  ></textarea>
                  <div class="flex justify-end space-x-2">
                    <button
                      @click="cancelEditReminder"
                      class="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
                    >
                      Cancel
                    </button>
                    <button
                      @click="handleUpdateReminder"
                      :disabled="reminderActionLoading"
                      class="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-lg font-medium"
                    >
                      Save
                    </button>
                  </div>
                </div>
                <div v-else>
                  <div class="flex justify-between items-start">
                    <div class="flex-1">
                      <h3 class="font-semibold text-gray-900 mb-2">
                        {{ reminder.title }}
                      </h3>
                      <div class="flex items-center text-sm text-gray-600 mb-2">
                        <svg
                          class="w-4 h-4 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        {{ formatDate(reminder.date) }}
                      </div>
                      <p v-if="reminder.notes" class="text-sm text-gray-600">
                        {{ reminder.notes }}
                      </p>
                    </div>
                    <div class="ml-4 flex flex-col space-y-2">
                      <span
                        :class="[
                          'px-3 py-1 rounded-full text-xs font-medium',
                          isUpcoming(reminder.date)
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-gray-100 text-gray-800',
                        ]"
                      >
                        {{ isUpcoming(reminder.date) ? "Upcoming" : "Past" }}
                      </span>
                      <button
                        @click="startEditReminder(reminder)"
                        class="text-pink-500 hover:text-pink-600 font-medium text-xs"
                      >
                        Edit
                      </button>
                      <button
                        @click="handleDeleteReminder(reminder.id)"
                        :disabled="reminderActionLoading"
                        class="text-red-500 hover:text-red-600 font-medium text-xs"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            v-else-if="currentView === 'promises'"
            class="space-y-4 sm:space-y-6"
          >
            <div
              class="flex flex-col sm:flex-row justify-between items-start sm:items-center"
            >
              <h2
                class="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-0"
              >
                Promises
              </h2>
              <button
                @click="showPromiseForm = true"
                class="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center mt-2 sm:mt-0"
              >
                <svg
                  class="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 4v16m8-8H4"
                  ></path>
                </svg>
                Add Promise
              </button>
            </div>

            <div
              v-if="showPromiseForm"
              class="bg-white rounded-lg shadow-sm p-4 sm:p-6 border border-gray-200"
            >
              <h3 class="font-semibold text-gray-900 mb-4">Add New Promise</h3>
              <form @submit.prevent="handleAddPromise" class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2"
                    >Promise</label
                  >
                  <input
                    v-model="newPromise.title"
                    type="text"
                    required
                    class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="I promise to..."
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2"
                    >Details</label
                  >
                  <textarea
                    v-model="newPromise.description"
                    rows="3"
                    class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="Additional details about this promise..."
                  ></textarea>
                </div>
                <div class="flex justify-end space-x-3">
                  <button
                    type="button"
                    @click="showPromiseForm = false"
                    class="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    class="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                  >
                    Add Promise
                  </button>
                </div>
              </form>
            </div>

            <div class="space-y-4">
              <div
                v-for="promise in promises"
                :key="promise.id"
                class="bg-white rounded-lg shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div class="flex items-start space-x-4">
                  <button
                    @click="togglePromise(promise)"
                    :disabled="promiseActionLoading"
                    class="mt-1 flex-shrink-0"
                  >
                    <div
                      :class="[
                        'w-6 h-6 rounded border-2 flex items-center justify-center transition-colors',
                        promise.completed
                          ? 'bg-pink-500 border-pink-500 text-white'
                          : 'border-gray-300 hover:border-pink-500',
                      ]"
                    >
                      <svg
                        v-if="promise.completed"
                        class="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                    </div>
                  </button>
                  <div class="flex-1">
                    <h3
                      :class="[
                        'font-semibold mb-2',
                        promise.completed
                          ? 'text-gray-500 line-through'
                          : 'text-gray-900',
                      ]"
                    >
                      {{ promise.title }}
                    </h3>
                    <p
                      v-if="promise.description"
                      :class="[
                        'text-sm mb-2',
                        promise.completed ? 'text-gray-400' : 'text-gray-600',
                      ]"
                    >
                      {{ promise.description }}
                    </p>
                    <div class="text-xs text-gray-500">
                      Created {{ formatDate(promise.createdAt) }}
                    </div>
                  </div>
                </div>
                <div class="flex justify-end mt-2 space-x-2">
                  <button
                    @click="handleDeletePromise(promise.id)"
                    :disabled="promiseActionLoading"
                    class="text-red-500 hover:text-red-600 font-medium text-xs"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div
            v-else-if="currentView === 'settings'"
            class="space-y-4 sm:space-y-6"
          >
            <h2 class="text-xl sm:text-2xl font-bold text-gray-900">
              Settings
            </h2>

            <div
              class="bg-white rounded-lg shadow-sm p-4 sm:p-6 border border-gray-200"
            >
              <h3 class="font-semibold text-gray-900 mb-4">AI Assistant</h3>
              <div class="flex items-center justify-between">
                <div>
                  <p class="font-medium text-gray-900">Enable AI Assistant</p>
                  <p class="text-sm text-gray-600">
                    Get help with date ideas, relationship advice, and more
                  </p>
                </div>
                <button
                  @click="toggleAI"
                  :class="[
                    'relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2',
                    userSettings?.aiEnabled ? 'bg-pink-500' : 'bg-gray-200',
                  ]"
                >
                  <span
                    :class="[
                      'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
                      userSettings?.aiEnabled
                        ? 'translate-x-6'
                        : 'translate-x-1',
                    ]"
                  />
                </button>
              </div>
            </div>

            <div
              class="bg-white rounded-lg shadow-sm p-4 sm:p-6 border border-gray-200"
            >
              <h3 class="font-semibold text-gray-900 mb-4">Account</h3>
              <div class="space-y-4">
                <div>
                  <p class="font-medium text-gray-900">Email</p>
                  <p class="text-sm text-gray-600">{{ user.email }}</p>
                </div>
                <button
                  @click="handleLogout"
                  class="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  Sign Out
                </button>
              </div>
            </div>
            <footer
              class="w-full py-8 text-center text-gray-400 text-xs sm:text-sm mt-8"
            >
              <p>
                Made with <span class="text-red-500">❤️</span> by
                <a
                  href="https://github.com/leecheeyong"
                  target="_blank"
                  class="text-pink-600 hover:underline font-semibold"
                >
                  Chee Yong Lee
                </a>
              </p>
              <p class="mt-1">
                Project available as open source under the terms of
                <a
                  href="https://github.com/leecheeyong/DatePortal/blob/main/LICENSE"
                  target="_blank"
                  class="text-pink-600 hover:underline font-semibold"
                  >MIT License</a
                >
              </p>
            </footer>
          </div>
        </Transition>
      </main>

      <nav
        class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200"
      >
        <div class="max-w-7xl mx-auto px-2 sm:px-4">
          <div class="flex justify-around">
            <button
              v-for="tab in tabs"
              :key="tab.id"
              @click="currentView = tab.id"
              :class="[
                'flex flex-col items-center py-2 px-2 sm:px-4 text-xs sm:text-sm font-medium transition-colors',
                currentView === tab.id
                  ? 'text-pink-500'
                  : 'text-gray-500 hover:text-gray-700',
              ]"
            >
              <div class="text-lg mb-1">{{ tab.icon }}</div>
              {{ tab.label }}
            </button>
          </div>
        </div>
      </nav>

      <AIAssistant v-if="userSettings?.aiEnabled" />
    </div>

    <div
      v-if="error"
      class="fixed top-4 right-2 sm:right-4 bg-red-500 text-white px-4 sm:px-6 py-3 rounded-lg shadow-lg z-50 animate-bounce"
    >
      {{ error }}
      <button
        @click="error = null"
        class="ml-2 sm:ml-4 text-white hover:text-gray-200"
      >
        ×
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useFirebase } from "../composables/useFirebase.js";
import AIAssistant from "../components/AIAssistant.vue";

const dateActionLoading = ref(false);
const reminderActionLoading = ref(false);
const promiseActionLoading = ref(false);

const {
  user,
  loading,
  error,
  login,
  register,
  logout,
  addDate,
  getDates,
  addReminder,
  getReminders,
  addPromise,
  getPromises,
  updatePromise,
  getUserSettings,
  updateUserSettings,
  updateDate,
  updateReminder,
  deleteReminder,
  deleteDate,
  deletePromise,
} = useFirebase();

const currentView = ref("login");
const email = ref("");
const password = ref("");

const dates = ref([]);
const reminders = ref([]);
const promises = ref([]);
const userSettings = ref(null);

const showDateForm = ref(false);
const showReminderForm = ref(false);
const showPromiseForm = ref(false);
const showBudgetForm = ref(false);

const newDate = ref({
  title: "",
  category: "dinner",
  cost: 0,
  notes: "",
});

const newReminder = ref({
  title: "",
  date: "",
  notes: "",
});

const newPromise = ref({
  title: "",
  description: "",
});

const newBudget = ref(500);

const tabs = [
  { id: "dashboard", label: "Home", icon: "🏠" },
  { id: "dates", label: "Dates", icon: "💕" },
  { id: "budget", label: "Budget", icon: "💰" },
  { id: "reminders", label: "Reminders", icon: "⏰" },
  { id: "promises", label: "Promises", icon: "🤝" },
  { id: "settings", label: "Settings", icon: "⚙️" },
];

const monthlySpent = computed(() => {
  const now = new Date();
  const thisMonth = dates.value.filter((date) => {
    const dateCreated = new Date(date.createdAt.seconds * 1000);
    return (
      dateCreated.getMonth() === now.getMonth() &&
      dateCreated.getFullYear() === now.getFullYear()
    );
  });
  return thisMonth.reduce((sum, date) => sum + (date.cost || 0), 0);
});

const totalDates = computed(() => dates.value.length);

const upcomingReminders = computed(() => {
  const today = new Date();
  return reminders.value.filter((reminder) => {
    const reminderDate = new Date(reminder.date);
    return reminderDate >= today;
  }).length;
});

const recentDates = computed(() => dates.value.slice(0, 5));

const budgetPercentage = computed(() => {
  const budget = userSettings.value?.monthlyBudget || 500;
  return (monthlySpent.value / budget) * 100;
});

const spendingByCategory = computed(() => {
  const categories = {};
  dates.value.forEach((date) => {
    if (!categories[date.category]) {
      categories[date.category] = 0;
    }
    categories[date.category] += date.cost || 0;
  });

  return Object.entries(categories)
    .map(([name, total]) => ({ name, total }))
    .sort((a, b) => b.total - a.total);
});

const handleLogin = async () => {
  try {
    await login(email.value, password.value);
    await loadUserData();
  } catch (err) {
    console.error("Login failed:", err);
  }
};

const handleRegister = async () => {
  try {
    await register(email.value, password.value);
    await loadUserData();
  } catch (err) {
    console.error("Registration failed:", err);
  }
};

const handleLogout = async () => {
  try {
    await logout();
    dates.value = [];
    reminders.value = [];
    promises.value = [];
    userSettings.value = null;
    currentView.value = "login";
  } catch (err) {
    console.error("Logout failed:", err);
  }
};

const loadUserData = async () => {
  try {
    const [datesData, remindersData, promisesData, settings] =
      await Promise.all([
        getDates(),
        getReminders(),
        getPromises(),
        getUserSettings(),
      ]);

    dates.value = datesData;
    reminders.value = remindersData;
    promises.value = promisesData;
    userSettings.value = settings;
    newBudget.value = settings?.monthlyBudget || 500;
  } catch (err) {
    console.error("Failed to load user data:", err);
  }
};

const handleAddDate = async () => {
  try {
    await addDate(newDate.value);
    await loadUserData();

    newDate.value = {
      title: "",
      category: "dinner",
      cost: 0,
      notes: "",
    };
    showDateForm.value = false;
  } catch (err) {
    console.error("Failed to add date:", err);
  }
};

const handleAddReminder = async () => {
  try {
    await addReminder(newReminder.value);
    await loadUserData();

    newReminder.value = {
      title: "",
      date: "",
      notes: "",
    };
    showReminderForm.value = false;
  } catch (err) {
    console.error("Failed to add reminder:", err);
  }
};

const handleAddPromise = async () => {
  promiseActionLoading.value = true;
  try {
    await addPromise(newPromise.value);
    await loadUserData();
    newPromise.value = {
      title: "",
      description: "",
    };
    showPromiseForm.value = false;
  } catch (err) {
    console.error("Failed to add promise:", err);
  } finally {
    promiseActionLoading.value = false;
  }
};

const togglePromise = async (promise) => {
  promiseActionLoading.value = true;
  try {
    await updatePromise(promise.id, { completed: !promise.completed });
    await loadUserData();
  } catch (err) {
    console.error("Failed to update promise:", err);
  } finally {
    promiseActionLoading.value = false;
  }
};

const updateBudget = async () => {
  try {
    await updateUserSettings({ monthlyBudget: newBudget.value });
    await loadUserData();
    showBudgetForm.value = false;
  } catch (err) {
    console.error("Failed to update budget:", err);
  }
};

const toggleAI = async () => {
  try {
    const newValue = !userSettings.value?.aiEnabled;
    await updateUserSettings({ aiEnabled: newValue });
    await loadUserData();
  } catch (err) {
    console.error("Failed to toggle AI:", err);
  }
};

const formatDate = (timestamp) => {
  if (!timestamp) return "";

  let date;
  if (timestamp.seconds) {
    date = new Date(timestamp.seconds * 1000);
  } else {
    date = new Date(timestamp);
  }

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const getCategoryEmoji = (category) => {
  const emojis = {
    dinner: "🍽️",
    movie: "🎬",
    activity: "🎨",
    travel: "✈️",
    gift: "🎁",
    other: "💝",
  };
  return emojis[category] || "💝";
};

const isUpcoming = (date) => {
  const today = new Date();
  const reminderDate = new Date(date);
  return reminderDate >= today;
};

const editingDateId = ref(null);
const editingDate = ref({ title: "", category: "", cost: 0, notes: "" });

const startEditDate = (dateEntry) => {
  editingDateId.value = dateEntry.id;
  editingDate.value = { ...dateEntry };
};

const cancelEditDate = () => {
  editingDateId.value = null;
  editingDate.value = { title: "", category: "", cost: 0, notes: "" };
};

const handleUpdateDate = async () => {
  dateActionLoading.value = true;
  try {
    await updateDate(editingDateId.value, editingDate.value);
    await loadUserData();
    cancelEditDate();
  } catch (err) {
    console.error("Failed to update date:", err);
  } finally {
    dateActionLoading.value = false;
  }
};

// State for editing reminders
const editingReminderId = ref(null);
const editingReminder = ref({ title: "", date: "", notes: "" });

const startEditReminder = (reminder) => {
  editingReminderId.value = reminder.id;
  editingReminder.value = { ...reminder };
};

const cancelEditReminder = () => {
  editingReminderId.value = null;
  editingReminder.value = { title: "", date: "", notes: "" };
};

const handleUpdateReminder = async () => {
  reminderActionLoading.value = true;
  try {
    await updateReminder(editingReminderId.value, editingReminder.value);
    await loadUserData();
    cancelEditReminder();
  } catch (err) {
    console.error("Failed to update reminder:", err);
  } finally {
    reminderActionLoading.value = false;
  }
};

const handleDeleteReminder = async (reminderId) => {
  reminderActionLoading.value = true;
  try {
    await deleteReminder(reminderId);
    await loadUserData();
  } catch (err) {
    console.error("Failed to delete reminder:", err);
  } finally {
    reminderActionLoading.value = false;
  }
};

const handleDeleteDate = async (dateId) => {
  dateActionLoading.value = true;
  try {
    await deleteDate(dateId);
    await loadUserData();
  } catch (err) {
    console.error("Failed to delete date:", err);
  } finally {
    dateActionLoading.value = false;
  }
};

const handleDeletePromise = async (promiseId) => {
  promiseActionLoading.value = true;
  try {
    await deletePromise(promiseId);
    await loadUserData();
  } catch (err) {
    console.error("Failed to delete promise:", err);
  } finally {
    promiseActionLoading.value = false;
  }
};

onMounted(async () => {
  if (user.value) {
    await loadUserData();
  }
});

watch(user, (val) => {
  if (val) {
    currentView.value = "dashboard";
    loadUserData();
  } else {
    currentView.value = "login";
    dates.value = [];
    reminders.value = [];
    promises.value = [];
    userSettings.value = null;
  }
});
</script>
