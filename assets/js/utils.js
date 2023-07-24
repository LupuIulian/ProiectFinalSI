export function setCookie(cName, cValue, expDays) {
    let date = new Date();
    date.setTime(date.getTime() + (expDays * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = cName + "=" + JSON.stringify(cValue) + "; " + expires + "; path=/";
}

export function getCookie(cName) {
    const name = cName + "=";
    const cDecoded = decodeURIComponent(document.cookie); //to be careful
    const cArr = cDecoded.split('; ');
    let res;
    cArr.forEach(val => {
        if (val.indexOf(name) === 0) res = val.substring(name.length);
    })

    return res ? JSON.parse(res) : null;
}

export function deleteCookie(cookieName) {
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

export function saveToLocalStorage(name, value) {
    localStorage.setItem(name, JSON.stringify(value));
}

export function getFromLocalStorage(name) {
    let data = localStorage.getItem(name);
    if (data) {
        data = JSON.parse(data);

        if (!Array.isArray(data)) {
            data = [data];
        }
    }

    return data;
}

export function updateCartBadge(number) {
    let cartBadge = document.getElementById('cart-badge');
    cartBadge.innerHTML = number;
    if (number > 0)
        cartBadge.classList.remove("hidden");
    else
        cartBadge.classList.add("hidden");
}