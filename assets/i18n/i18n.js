window.getLanguage = function () {
    return localStorage.getItem("language") || "en";
};

window.t = function (key, values = {}) {
    const language = getLanguage();
    const dictionary = window.translations[language] || window.translations.en;

    const value = key.split(".").reduce((result, part) => {
        return result && result[part];
    }, dictionary);

    if (typeof value !== "string") {
        return key;
    }

    return value.replace(/\{(\w+)\}/g, function (_, name) {
        return values[name] ?? `{${name}}`;
    });
};