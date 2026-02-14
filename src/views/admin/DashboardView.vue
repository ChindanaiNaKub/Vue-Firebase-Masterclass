<script setup>
// Chapter 8: Dashboard - mock stats
</script>

<template>
  <div class="p-6 space-y-6">
    <h1 class="text-2xl font-bold">Dashboard</h1>

    <!-- Stats -->
    <div class="stats shadow w-full">
      <div class="stat">
        <div class="stat-title">Orders</div>
        <div class="stat-value text-primary">31K</div>
      </div>
      <div class="stat">
        <div class="stat-title">Products</div>
        <div class="stat-value text-secondary">324</div>
      </div>
      <div class="stat">
        <div class="stat-title">Users</div>
        <div class="stat-value">4,200</div>
      </div>
    </div>

    <!-- Mock charts placeholder -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <h2 class="card-title">ยอดขาย</h2>
          <div class="h-64 flex items-center justify-center bg-base-200 rounded-lg text-base-content/50">
            [ กราฟแท่ง - Mock ]
          </div>
        </div>
      </div>
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <h2 class="card-title">ประเภทการขาย</h2>
          <div class="h-64 flex items-center justify-center bg-base-200 rounded-lg text-base-content/50">
            [ กราฟ Donut - Mock ]
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
