<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-lg-3">
          <div class="menu">
            <vue-custom-scrollbar class="scroll-area" :settings="settings">
              <img src="../static/images/single-logo.svg" class="mb-2" alt="">
              <p class="mb-5">+7 (495) 128-53-12</p>
              <button class="clean mb-5" @click="showUserMenu = !showUserMenu">
                {{ user.firstName }} {{ user.lastName }} <img class="ml-1" src="../static/images/triangle.svg" alt="">
              </button>
              <div v-if="showUserMenu">
                <ul class="menu-list">
                  <li
                    class="menu-item"
                    v-for="link in userMenu"
                    :key="link.title"
                  >
                    <nuxt-link
                      :style="'background-image:url('+require(`../static/images/${link.icon}.svg`)+')'"
                      class="menu-link" :to="localePath(link.url)"
                    >
                      {{$t(link.label)}}
                    </nuxt-link>
                  </li>
                  <li class="menu-item">
                    <span
                      :style="'background-image:url('+require(`../static/images/exit.svg`)+')'"
                      class="menu-link"
                      @click="handleLogout"
                    >
                      {{$t('menu.logout')}}
                    </span>
                  </li>
                </ul>
              </div>
              <ul v-else class="menu-list">
                <li class="menu-item"
                    v-for="(link, idx) in menu"
                    :key="link.title"
                >
                  <a
                    target="_blank"
                    class="menu-link"
                    :href="link.url"
                    :style="link.icon ? 'background-image:url(' + require(`../static/images/${link.icon}.svg`) + ')' : ''"
                    v-if="link.outside">
                    {{ $t(link.label) }}
                  </a>
                  <span
                    @click="handleToggleMenu(idx)"
                    class="menu-link"
                    :style="link.icon ? 'background-image:url(' + require(`../static/images/${link.icon}.svg`) + ')' : ''"
                    v-else-if="link.children">
                  {{ $t(link.label) }} <img src="../static/images/angle.svg" class="ml-1" alt="">
                </span>
                  <nuxt-link
                    v-else
                    class="menu-link"
                    :style="link.icon ? 'background-image:url(' + require(`../static/images/${link.icon}.svg`) + ')' : ''"
                    :to="localePath(link.url)">
                    {{ $t(link.label) }}
                  </nuxt-link>
                  <transition name="slide">
                    <ul class="menu-child" v-if="current === idx && link.children">
                      <li v-for="ch in link.children" :key="ch.title">
                        <nuxt-link class="menu-link" :to="ch.url">{{ $t(ch.label) }}</nuxt-link>
                      </li>
                    </ul>
                  </transition>
                </li>
                <li class="menu-item">
                  <a href="#" class="link-icon mt-3">
                    {{$t('general.online_chat')}}
                  </a>
                </li>
              </ul>
            </vue-custom-scrollbar>
          </div>
        </div>
        <div class="col-lg-9 content pt-4">
          <Nuxt/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import vueCustomScrollbar from 'vue-custom-scrollbar'
import 'vue-custom-scrollbar/dist/vueScrollbar.css'
import {menu, userMenu} from '@/utils';

export default {
  components: {
    vueCustomScrollbar
  },
  name: 'default',
  middleware: ['locale', 'authenticate'],
  data () {
    return {
      menu,
      userMenu,
      current: null,
      showUserMenu: false,
      settings: {
        suppressScrollY: false,
        suppressScrollX: false,
        wheelPropagation: false
      }
    }
  },
  computed: {
    user () {
      return this.$auth.user || {}
    }
  },
  methods: {
    async handleLogout() {
      await this.$auth.logout();
      await this.$router.push(this.localePath('login'))
    },
    handleToggleMenu(idx) {
      if (this.current === idx) {
        this.current = null
      } else {
        this.current = idx
      }
    }
  }
}
</script>

<style lang="scss">
@import "../assets/scss/menu";
</style>
