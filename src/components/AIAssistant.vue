<template>
  <div class="fixed bottom-20 right-4 z-50">
    <button
      v-if="!showChat"
      @click="showChat = true"
      class="bg-pink-500 hover:bg-pink-600 text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-110"
    >
      <svg
        class="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
        ></path>
      </svg>
    </button>

    <div
      v-if="showChat"
      class="bg-white rounded-lg shadow-xl w-80 h-96 flex flex-col border border-gray-200"
    >
      <div
        class="flex items-center justify-between p-4 border-b border-gray-200 bg-pink-50 rounded-t-lg"
      >
        <h3 class="font-semibold text-gray-800 flex items-center">
          <svg
            class="w-5 h-5 mr-2 text-pink-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
            ></path>
          </svg>
          AI Assistant
        </h3>
        <button
          @click="showChat = false"
          class="text-gray-400 hover:text-gray-600 transition-colors"
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
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
      </div>

      <div class="flex-1 overflow-y-auto p-4 space-y-3">
        <div
          v-for="message in messages"
          :key="message.id"
          :class="[
            'max-w-xs rounded-lg p-3 text-sm',
            message.role === 'user'
              ? 'bg-pink-500 text-white ml-auto'
              : 'bg-gray-100 text-gray-800',
          ]"
          v-html="
            message.role === 'assistant'
              ? formatMarkdown(message.content)
              : message.content
          "
        ></div>

        <div
          v-if="isLoading"
          class="bg-gray-100 text-gray-800 max-w-xs rounded-lg p-3 text-sm"
        >
          <div class="flex items-center space-x-2">
            <div class="flex space-x-1">
              <div
                class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
              ></div>
              <div
                class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                style="animation-delay: 0.1s"
              ></div>
              <div
                class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                style="animation-delay: 0.2s"
              ></div>
            </div>
            <span>Thinking...</span>
          </div>
        </div>
      </div>

      <div class="border-t border-gray-200 p-4">
        <form @submit.prevent="sendMessage" class="flex space-x-2">
          <input
            v-model="newMessage"
            type="text"
            placeholder="Ask for date ideas, advice..."
            class="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            :disabled="isLoading"
          />
          <button
            type="submit"
            :disabled="!newMessage.trim() || isLoading"
            class="bg-pink-500 hover:bg-pink-600 disabled:bg-gray-300 text-white rounded-lg px-4 py-2 text-sm font-medium transition-colors"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const showChat = ref(false);
const messages = ref([
  {
    id: 1,
    role: "assistant",
    content:
      "Hi! I'm here to help with date ideas, relationship advice, and more. What can I help you with?",
  },
]);
const newMessage = ref("");
const isLoading = ref(false);

const sendMessage = async () => {
  if (!newMessage.value.trim()) return;

  const userMessage = {
    id: Date.now(),
    role: "user",
    content: newMessage.value,
  };

  messages.value.push(userMessage);
  const messageToSend = newMessage.value;
  newMessage.value = "";
  isLoading.value = true;

  try {
    const response = await fetch("https://ai.hackclub.com/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: [
          {
            role: "system",
            content:
              "You are a helpful relationship and dating assistant. Provide warm, thoughtful advice about dating, relationships, and romance. Keep responses concise and friendly.",
          },
          {
            role: "user",
            content: messageToSend,
          },
        ],
      }),
    });

    const data = await response.json();
    let aiContent =
      data.choices?.[0]?.message?.content ||
      "Sorry, I couldn't process that request.";
    if (aiContent.includes("</think>")) {
      aiContent = aiContent.split("</think>")[1].trim();
    }
    aiContent = aiContent.replace(/<think>[\s\S]*?<\/think>/, "").trim();
    const assistantMessage = {
      id: Date.now() + 1,
      role: "assistant",
      content: aiContent,
    };

    messages.value.push(assistantMessage);
  } catch (error) {
    console.error("AI request failed:", error);
    messages.value.push({
      id: Date.now() + 1,
      role: "assistant",
      content:
        "Sorry, I'm having trouble connecting right now. Please try again later.",
    });
  } finally {
    isLoading.value = false;
  }
};

function formatMarkdown(text) {
  text = text.replace(/### (.*?)(\n|$)/g, '<h3>$1</h3>');
  text = text.replace(/## (.*?)(\n|$)/g, '<h2>$1</h2>');
  text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');
  text = text.replace(/\n/g, '<br>');
  return text;
}
</script>
