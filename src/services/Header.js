export default function header() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
        return {Authorization: 'Bearer ' + user.token,
            "Content-Type": "multipart/form-data"};
    } else {
        return {};
    }
}
