export default function ({store, route, params}) {
   if (route.fullPath.indexOf('/en') !== -1) {
      store.commit('setLocale', 'en')
   }
}

