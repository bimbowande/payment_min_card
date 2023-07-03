<template>
  <header class="header">
    <div class="header__nav">
      <ul>
        <li><nuxt-link to="/">Trips</nuxt-link></li>
        <li><nuxt-link to="/">Recently Viewed</nuxt-link></li>
        <li><nuxt-link to="/">Bookings</nuxt-link></li>
      </ul>
    </div>
    <div class="header__profile">
      <img src="../../assets/images/Female-Avatar-2.png" alt="PI" />
    </div>
  </header>
</template>

<script>
export default {
  name: "AppHeader",
  props: {},
  data() {
    return {};
  },
};
</script>
