function getCookie(name) {
    const matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

function setCookie(name, value, props = {}) {
    let exp = props.expires;
    if (typeof exp == "number" && exp) {
        const d = new Date();
        d.setTime(d.getTime() + exp * 1000);
        exp = props.expires = d;
    }
    if (exp && exp.toUTCString) {
        props.expires = exp.toUTCString();
    }
    value = encodeURIComponent(value);
    let updatedCookie = name + "=" + value;
    for (const propName in props) {
        updatedCookie += "; " + propName;
        const propValue = props[propName];
        if (propValue !== true) {
            updatedCookie += "=" + propValue;
        }
    }
    document.cookie = updatedCookie;
}

const modal = document.getElementById('subscribe-modal');
const closeBtn = modal.querySelector('.modal__close');

if (!getCookie('popupClosed')) {
    modal.classList.add('modal_active');
}

closeBtn.onclick = function () {
    modal.classList.remove('modal_active');

    setCookie('popupClosed', 'true', { expires: 365 * 24 * 60 * 60 });
};