<template>
  <div class="d-flex align-items-center">
    <img v-if="!back" class="mr-1" src="../../static/images/link.svg" alt="">
    <img v-else class="mr-1" src="../../static/images/back.svg" alt="">
    <a :href="href" v-if="href"><slot></slot></a>
    <nuxt-link :to="to" v-if="to"><slot></slot></nuxt-link>
  </div>
</template>

<script>
export default {
  name: 'Link',
  props: ['href', 'to', 'back'],
};
</script>

<style scoped>

</style>
