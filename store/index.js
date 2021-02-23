export const state = () => ({
  banner: {
    type: "verify"
  },
  locale: "ru",
  loading: false,
  loadCount: 0,
});

export const mutations = {
  setLocale(state, locale) {
    state.locale = locale;
  },
  loading(state, isLoading) {
    if (isLoading) {
      state.loadCount++;
      state.loading = true;
    } else if (state.loadCount > 0) {
      state.loadCount--;
      state.loading = (state.loadCount > 0);
    }
  },
};

export const getters = {
  locale(state) {
    return state.locale;
  },
};

export const actions = {
  async nuxtServerInit({ commit, dispatch }, {$auth}) {
    if ($auth.$state.loggedIn) {
      // await dispatch('accounts/fetchAccounts');
    }
  },
  nuxtClientInit({ commit, dispatch, state }, {$axios, query, $toast}) {
    $axios.get('/stock').then(({data}) => {
      dispatch('shop/initShop', data);
    }).catch(e => {
      console.log(e)
    });

    const cart = localStorage.getItem('cart');
    if (cart) {
      commit('shop/setSelected', JSON.parse(cart))
    }

    if (query['tags[]']) {
      $axios.post('/user/add/tags', {tags: query['tags[]'].join()})
    }

    if (query.subscribe_token) {
      if (!!state.auth.user) {
        if (state.auth.user.emailToken === query.subscribe_token) {
          $axios.$get('/mail/subscribe/' + query.subscribe_token).then(() => {
            $toast.success('Вы успешно подписаны')
          });
        }
      }
    }
  }
};
