import {STATE_NOT_FULL} from "../constants/user";

export default async function ({$auth, redirect}) {
  let logged = $auth.loggedIn;
  let user = $auth.user;
  if (logged) {
    if (user.status === STATE_NOT_FULL) {
      redirect('/attributes')
    } else {
      redirect('/')
    }
  }
}