import { TYPE_RU_SHARE, TYPE_SHARE, TYPE_IPO, TYPE_ETF, TYPE_REITS, TYPE_OTC } from "../constants";

export const state = () => ({
  reits: [],
  otc: [],
  ipo: [],
  etf: [],
  stock: [],
  ruStock: [],
  selected: []
});

export const mutations = {
  addToCart(state, payload) {
    state.selected = [...state.selected, payload]
  },
  setSelected(state, payload) {
    state.selected = payload
  },
  clearCart(state) {
    state.selected = []
  },
  setReits(state, payload) {
    state.reits = payload
  },
  initShop(state, {ruStock, stock, etf, ipo, reits, otc}) {
    state.ruStock = ruStock;
    state.stock = stock;
    state.etf = etf;
    state.ipo = ipo.reverse();
    state.reits = reits;
    state.otc = otc;
  },
  setStock(state, payload) {
    state.stock = payload
  },
  setRuStock(state, payload) {
    state.ruStock = payload
  },
  setIpo(state, payload) {
    state.ipo = payload
  },
};

export const getters = {
  getReits: state => state.reits,
  getOtc: state => state.otc,
  getEtf: state => state.etf,
  getRuStock: state => state.ruStock,
  getStock: state => state.stock,
  getIpo: state => state.ipo,
  getSelected: state => state.selected,
};

export const actions = {
  addToCart({commit}, payload) {
    commit('addToCart', payload)
  },
  initShop({commit}, data) {
    const ruStock = data.filter(i => Number(i.category) === TYPE_RU_SHARE);
    const stock = data.filter(i => Number(i.category) === TYPE_SHARE);
    const etf = data.filter(i => Number(i.category) === TYPE_ETF);
    const ipo = data.filter(i => Number(i.category) === TYPE_IPO).sort((a, b) => (new Date(a.ipoDate).getTime()) - (new Date(b.ipoDate).getTime()));
    const reits = data.filter(i => Number(i.category) === TYPE_REITS);
    const otc = data.filter(i => Number(i.category) === TYPE_OTC);
    commit('initShop', {ruStock, stock, etf, ipo, reits, otc});
  }
};
