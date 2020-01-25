
export const cookie = {
    get(name) {  // получить cookie
        let matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    },
    set(name, value, days) {  // установить cookie
        let tomorrow = new Date();
        tomorrow.setDate(new Date().getDate()+days);
        document.cookie = "" + name + "=" + value + "; path=/; expires=" + tomorrow.toUTCString();
    },
    delete(name) {  // удалить cookie
        this.set(name, "", 0)
    }
};
