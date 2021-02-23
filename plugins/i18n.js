/**
 * Save new locale to store, when language will be switched
 *
 * @param app
 * @param commit
 */
export default function ({ app, store: {commit} }) {
    app.i18n.beforeLanguageSwitch = (oldLocale, newLocale) => {
        commit('setLocale', newLocale)
    };
}
