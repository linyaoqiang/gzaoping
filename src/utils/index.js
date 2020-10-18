export function getRedirectPath(user) {
    let {type, header} = user
    let redirectTo = `/${type}`
    if (!header) {
        redirectTo += '-info'
    }
    return redirectTo
}