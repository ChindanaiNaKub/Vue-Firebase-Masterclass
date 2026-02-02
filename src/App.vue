<script setup>
// Chapter 4-5: App with Router
// RouterView จะแสดง Component ตาม path ปัจจุบัน
</script>

<template>
  <div class="app">
    <nav class="navbar">
      <RouterLink to="/" class="nav-brand">📚 Vue Workshop</RouterLink>
      <div class="nav-links">
        <RouterLink to="/" class="nav-link">Todo List</RouterLink>
        <RouterLink to="/books" class="nav-link">Book Store</RouterLink>
      </div>
    </nav>

    <main class="main-content">
      <!-- RouterView แสดง Component ตาม path -->
      <RouterView />
    </main>

    <footer class="footer">
      <p>Vue Firebase Masterclass - Chapter 4: Router & Pinia | Chapter 5: API</p>
    </footer>
  </div>
</template>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  min-height: 100vh;
  color: #fff;
}

.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.navbar {
  background: rgba(0, 0, 0, 0.3);
  padding: 15px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.nav-brand {
  font-size: 1.3rem;
  font-weight: bold;
  color: #00cec9;
  text-decoration: none;
}

.nav-links {
  display: flex;
  gap: 20px;
}

.nav-link {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  padding: 8px 15px;
  border-radius: 6px;
  transition: background 0.3s, color 0.3s;
}

.nav-link:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
}

.nav-link.router-link-active {
  background: rgba(0, 206, 201, 0.2);
  color: #00cec9;
}

.main-content {
  flex: 1;
  padding: 30px;
}

.footer {
  background: rgba(0, 0, 0, 0.3);
  padding: 15px;
  text-align: center;
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.9rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}
</style>
