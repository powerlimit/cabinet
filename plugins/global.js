import {makeid} from '@/utils';

export default (ctx, inject) => {
  inject('makeid', makeid)
}
