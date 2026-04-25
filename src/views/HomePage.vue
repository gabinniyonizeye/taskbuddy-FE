<script setup>
import { useRouter } from 'vue-router'
import NavBar from '../components/common/NavBar.vue'
import Footer from '../components/common/Footer.vue'
const router = useRouter()
</script>

<template>
  <div class="min-h-screen bg-white flex flex-col">
    <NavBar />

    <!-- Hero -->
    <section class="flex-1 flex items-center justify-center px-6 py-20 text-center">
      <div class="max-w-2xl">
        <span class="inline-block px-3 py-1 text-xs font-semibold bg-green-100 text-[#4a7c59] rounded-full mb-6">v1.0.0 Released</span>
        <h1 class="text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
          Stay on top of your <span class="text-[#3b5998]">tasks</span>
        </h1>
        <p class="text-lg text-gray-500 mb-10">A clean and simple task manager built for students. Organize, track, and get things done.</p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button @click="router.push('/register')" class="px-8 py-3 bg-[#4a7c59] text-white font-semibold rounded hover:bg-[#3d6b4a]">
            Get Started
          </button>
          <a href="#about" class="px-8 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded hover:border-gray-400">
            Learn More
          </a>
        </div>
      </div>
    </section>

    <!-- Features -->
    <section id="features" class="py-20 bg-gray-50 border-t border-gray-200">
      <div class="max-w-5xl mx-auto px-6">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 mb-3">What You Get</h2>
          <p class="text-gray-500">Everything you need to stay productive.</p>
        </div>
        <div class="grid md:grid-cols-3 gap-6">
          <div class="p-6 bg-white border border-gray-200 rounded-xl hover:border-[#4a7c59] transition-colors">
            <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-[#4a7c59] mb-4">✓</div>
            <h3 class="text-lg font-bold mb-2">Task Tracking</h3>
            <p class="text-gray-500 text-sm">Create and manage tasks with priorities and due dates.</p>
          </div>
          <div class="p-6 bg-white border border-gray-200 rounded-xl hover:border-[#3b5998] transition-colors">
            <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-[#3b5998] mb-4">📊</div>
            <h3 class="text-lg font-bold mb-2">Dashboard Stats</h3>
            <p class="text-gray-500 text-sm">See your progress at a glance with live stats.</p>
          </div>
          <div class="p-6 bg-white border border-gray-200 rounded-xl hover:border-yellow-400 transition-colors">
            <div class="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center text-yellow-600 mb-4">⚡</div>
            <h3 class="text-lg font-bold mb-2">Fast & Simple</h3>
            <p class="text-gray-500 text-sm">No clutter. Just tasks. Built with Vue 3 + Tailwind.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- About -->
    <section id="about" class="py-20 border-t border-gray-200">
      <div class="max-w-3xl mx-auto px-6 text-center">
        <h2 class="text-3xl font-bold text-gray-900 mb-4">About TaskBuddy</h2>
        <p class="text-gray-500 text-lg leading-relaxed">
          TaskBuddy is a student-focused task management app built with Vue 3 and Tailwind CSS. It helps you organize your day, track deadlines, and stay productive without the noise.
        </p>
      </div>
    </section>

    <Footer />
  </div>
</template>
