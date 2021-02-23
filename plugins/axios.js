export default ({$axios, store}) => {
  $axios.interceptors.request.use((config) => {
    store.commit('loading', true);
    return config;
  }, (error) => {
    store.commit('loading', false);
    let data = error.response.data;
    if (data.length) {
      data = data[0]
    }
    data.code = error.code
    return Promise.reject(data);
  });

  $axios.interceptors.response.use((response) => {
    store.commit('loading', false);
    return response;
  }, (error) => {
    store.commit('loading', false);
    let data = error.response.data;
    if (data.length) {
      data = data[0]
    }
    data.code = error.response.status
    return Promise.reject(data);
  });
}
