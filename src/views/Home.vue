<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 via-pink-200 to-pink-300"
  >
    <div
      class="max-w-lg w-full text-center p-6 sm:p-10 bg-white/60 backdrop-blur-2xl rounded-3xl shadow-2xl relative overflow-hidden border border-pink-200"
    >
      <div class="flex justify-center mb-6">
        <img
          src="/logo.png"
          alt="Date Portal Logo"
          class="w-20 h-18 drop-shadow-lg animate-pulse-heart"
        />
      </div>
      <h1
        class="text-4xl sm:text-5xl font-extrabold text-pink-600 mb-4 animate-fade-in drop-shadow leading-tight"
      >
        Date Portal
      </h1>
      <p
        class="text-gray-800 mb-8 text-lg sm:text-xl animate-fade-in delay-100 font-medium"
      >
        Organize your romantic life, track your dates, manage your budget, and
        never forget a special moment again.
      </p>
      <div class="flex flex-col items-center gap-2 mb-2">
        <router-link to="/dashboard" class="w-full flex justify-center">
          <button
            class="w-full sm:w-auto bg-gradient-to-r from-pink-500 to-pink-400 hover:from-pink-600 hover:to-pink-500 text-white font-semibold px-8 py-3 rounded-full transition-all text-lg shadow-xl animate-pop focus:outline-none focus:ring-2 focus:ring-pink-400 border-2 border-pink-300"
          >
            Get Started
          </button>
        </router-link>
        <a
          href="https://github.com/leecheeyong/DatePortal"
          target="_blank"
          rel="noopener"
          class="w-full sm:w-auto inline-flex items-center justify-center px-6 py-2 rounded-full bg-white/80 hover:bg-pink-50 text-pink-600 font-semibold shadow border border-pink-200 transition-all text-lg"
        >
          <svg
            class="inline w-5 h-5 mr-2 align-middle"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M12 2C6.477 2 2 6.484 2 12.012c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.091-.646.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.254-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.338 1.909-1.295 2.747-1.025 2.747-1.025.546 1.378.202 2.396.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.337 4.695-4.566 4.944.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.749 0 .268.18.579.688.481C19.138 20.19 22 16.436 22 12.012 22 6.484 17.523 2 12 2z"
            />
          </svg>
          View on GitHub
        </a>
      </div>
      <div class="absolute -top-10 -right-10 opacity-20">
        <svg width="120" height="120" viewBox="0 0 100 100" fill="none">
          <path
            d="M50 80C50 80 10 55 10 35C10 20 30 10 50 30C70 10 90 20 90 35C90 55 50 80 50 80Z"
            fill="#f472b6"
          />
        </svg>
      </div>
      <div class="absolute -bottom-10 -left-10 opacity-10">
        <svg width="120" height="120" viewBox="0 0 100 100" fill="none">
          <path
            d="M50 80C50 80 10 55 10 35C10 20 30 10 50 30C70 10 90 20 90 35C90 55 50 80 50 80Z"
            fill="#be185d"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes fade-in {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-in {
  animation: fade-in 1s ease;
}
.animate-fade-in.delay-100 {
  animation-delay: 0.1s;
}
@keyframes pop {
  0% {
    transform: scale(0.9);
  }
  80% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}
.animate-pop {
  animation: pop 0.7s cubic-bezier(0.17, 0.67, 0.83, 0.67);
}
@keyframes pulse-heart {
  0%,
  100% {
    transform: scale(1);
    filter: drop-shadow(0 4px 12px rgba(236, 72, 153, 0.25));
  }
  50% {
    transform: scale(1.08);
    filter: drop-shadow(0 8px 24px rgba(236, 72, 153, 0.35));
  }
}
.animate-pulse-heart {
  animation: pulse-heart 1.2s infinite;
}
.drop-shadow-lg {
  filter: drop-shadow(0 4px 12px rgba(236, 72, 153, 0.25));
}
.drop-shadow {
  filter: drop-shadow(0 2px 6px rgba(236, 72, 153, 0.15));
}
</style>
