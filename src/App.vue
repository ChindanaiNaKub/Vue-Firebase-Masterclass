<script setup>
// Chapter 4-6: App with Router + Tailwind
</script>

<template>
  <div class="min-h-screen bg-base-200" data-theme="night">
    <!-- Navbar -->
    <nav class="navbar bg-base-100 shadow-lg">
      <div class="flex-1">
        <RouterLink to="/" class="btn btn-ghost text-xl">📚 Vue Workshop</RouterLink>
      </div>
      <div class="flex-none">
        <ul class="menu menu-horizontal px-1">
          <li><RouterLink to="/" class="btn btn-ghost">Todo List</RouterLink></li>
          <li><RouterLink to="/books" class="btn btn-ghost">Book Store</RouterLink></li>
        </ul>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="container mx-auto max-w-3xl p-4">
      <RouterView />
    </main>

    <!-- Footer -->
    <footer class="footer footer-center p-4 bg-base-100 text-base-content mt-auto">
      <p>Vue Firebase Masterclass - Chapter 6: Tailwind + DaisyUI</p>
    </footer>
  </div>
</template>

<style>
/* ใช้ Tailwind แทน CSS ปกติ */
</style>
