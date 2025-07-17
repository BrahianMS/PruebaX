export function guardian() {
    let auth = sessionStorage.getItem('Auth');
    if (!auth || auth !== 'true') {
        window.location = '../views/login.html'
    }
}