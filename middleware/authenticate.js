import { STATE_NOT_FULL } from '~/constants/user';

export default async function({ $auth, redirect, query }) {
  let logged = $auth.loggedIn;
  let user = $auth.user;

  if (!logged) {
    let q = '';
    if (query.subscribe_token) {
      q = '?subscribe_token=' + query.subscribe_token;
    }
    redirect('/login' + q);
  } else {
    if (user.status === STATE_NOT_FULL) {
      redirect('/attributes');
    }
  }
}
