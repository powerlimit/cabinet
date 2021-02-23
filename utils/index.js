/**
 * @param length
 * @returns {string}
 */
export const makeid = (length = 5) => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export const userMenu = [
  {
    title: 'edit_profile',
    label: 'menu.edit_profile',
    url: 'user-update',
    icon: 'icon-edit'
  },
  {
    title: 'verification',
    label: 'account.verify',
    url: 'verify',
    icon: 'icon-verify'
  },
  {
    title: 'customer-identification',
    label: 'identification.title_short',
    url: 'customer-identification',
    icon: 'icon-form'
  },
]

export const menu = [
  {
    title: 'home',
    label: 'index.title',
    url: 'index',
    icon: 'icon-home',
  },
  {
    title: 'fin_operations',
    label: 'menu.fin_operations',
    url: '#',
    icon: 'icon-operations',
    children: [
      {
        title: 'deposit',
        label: 'menu.deposit',
        url: 'finance-deposit'
      },
      {
        title: 'withdrawal',
        label: 'menu.withdrawal',
        url: 'finance-withdrawal'
      },
      {
        title: 'transfer',
        label: 'transfer.title',
        url: 'finance-transfer'
      },
      {
        title: 'history',
        label: 'history.title',
        url: 'finance'
      }
    ]
  },
  {
    title: 'funds',
    label: 'funds.title',
    icon: 'icon-fonds',
    url: '#',
    children: [
      {
        label: 'fond.us_j',
        url: 'fond-rating-category',
        category: 'US'
      },
      {
        label: 'fond.eu_j',
        url: 'fond-rating-category',
        category: 'EU'
      },
      {
        label: 'index_slave.title',
        url: 'fond-accounts',
      },
    ]
  },
  {
    title: 'trading',
    label: 'trading.title',
    icon: 'icon-trading',
    url: '#',
    children: [
      {
        title: 'stock',
        label: 'trading.stock',
        url: 'trading-category',
        category: 'stock'
      },
      {
        title: 'ru-stock',
        label: 'trading.stock_ru',
        url: 'trading-category',
        category: 'ru-stock'
      },
      {
        title: 'ipo',
        label: 'menu.ipo',
        url: 'trading-category',
        category: 'ipo'
      },
      {
        title: 'otc',
        label: 'menu.otc',
        url: 'trading-category',
        category: 'otc'
      },
      {
        title: 'etf',
        label: 'menu.etf',
        url: 'trading-category',
        category: 'etf'
      },
      {
        title: 'reits',
        label: 'menu.reits',
        url: 'trading-category',
        category: 'reits'
      },
      {
        title: 'cartList',
        label: 'menu.request_list',
        url: 'trading-list',
      }
    ]
  },
  {
    title: 'education',
    label: 'menu.training',
    url: '#',
    icon: 'icon-training',
    children: [
      {
        title: 'investors',
        label: 'investor.title',
        url: 'training-investors'
      },
      {
        title: 'books',
        label: 'menu.forex_books',
        url: 'training-books'
      },
      {
        title: 'videos',
        label: 'menu.educational_videos',
        url: 'training-videos'
      },
    ]
  },
  {
    title: 'broker',
    label: 'personal_broker.title',
    url: 'personal-broker',
    icon: 'icon-broker'
  },
  {
    title: 'partner_area',
    label: 'menu.partner_area',
    url: process.env.SCHEME + '://partner.' + process.env.MAIN_DOMAIN,
    icon: 'icon-partner',
    outside: true
  }
]
