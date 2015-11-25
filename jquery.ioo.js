/* ===========================================================
 * jquery.ioo.js v1
 * ===========================================================
 * Copyright 2015 Iljin Oleg.
 * http://www.iljin-oleg.ru
 *
 * A small jQuery plugin with helper functions
 * https://github.com/oiljin/IOO
 *
 * ========================================================== */


/*global jQuery, document, window*/


(function ($) {
    "use strict";

    var langs = ['ru', 'en'],

        messages = {
            ajax_fail: {
                ru: 'Возникла ошибка, перезагрузите страницу и попробуйте снова',
                en: 'Something went wrong, reload the page and try again'
            }
        };

    $.IOO = {

        /**
         * Возвращает секцию из текущего пути,
         * или если position не задан, то массив содержащий все секции.
         * В случае если position не существует вернется undefined.
         * @param position
         * @returns {string}
         */
        getUrl: function (position) {
            var arr = location.pathname.split('/');
            arr.shift();

            return (position !== undefined) ? arr[position] : arr;
        },


        /**
         * Определяет текущий язык сайта по первой секции url,
         * если ничего не найдено возвращается 'ru'
         *
         * @return {string} - возвращает текущий язык сайта (ru, en)
         */
        getLang: function () {
            var lang = this.getUrl(0);

            if ($.inArray(lang, langs) !== -1) {
                return lang;
            }

            return langs[0];
        },

        /**
         * Добавляет языковую переменную в массив lang
         *
         * @param {Object} object - литерал языковой
         */
        addMessage: function (object) {
            var index;

            for (index in object) {
                messages[index] = object[index];
            }
        },

        /**
         * Возвращает языковую переменную из массива lang,
         * в зависимости от текущего языка сайта
         *
         * @param {string} name - идентификатор языковой переменной
         * @return {string} - возвращает языкову переменную
         */
        getMessage: function (name) {
            if (!name) {
                return '';
            }

            var lang = this.getLang(),
                msg = messages[name][lang];

            return (msg !== undefined) ? msg : '';
        },


        /**
         * Выполняет проверку email адреса
         *
         * @param email - емайл адрес
         * @returns {boolean}
         */
        isEmail: function (email) {
            if (!email.length) {
                return false;
            }

            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        },

        /**
         * Выполняет проверку на валидность url-адреса
         * original regexp source: https://gist.github.com/dperini/729294
         *
         * @param url
         * @param protocol - если true, то наличие протокола является обязательным
         * @returns {boolean}
         */
        isUrl: function (url, protocol) {
            "use strict";

            var checkProtocol = protocol || false,

                re_weburl = new RegExp(
                    "^" +
                        // protocol identifier
                    "(?:(?:https?|ftp)://)" + (checkProtocol ? '' : '?') +
                        // user:pass authentication
                    "(?:\\S+(?::\\S*)?@)?" +
                    "(?:" +
                        // IP address exclusion
                        // private & local networks
                    "(?!(?:10|127)(?:\\.\\d{1,3}){3})" +
                    "(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})" +
                    "(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})" +
                        // IP address dotted notation octets
                        // excludes loopback network 0.0.0.0
                        // excludes reserved space >= 224.0.0.0
                        // excludes network & broacast addresses
                        // (first & last IP address of each class)
                    "(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])" +
                    "(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}" +
                    "(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))" +
                    "|" +
                        // host name
                    "(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)" +
                        // domain name
                    "(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*" +
                        // TLD identifier
                    "(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))" +
                        // TLD may end with dot
                    "\\.?" +
                    ")" +
                        // port number
                    "(?::\\d{2,5})?" +
                        // resource path
                    "(?:[/?#]\\S*)?" +
                    "$", "i"
                );

            return re_weburl.test(url.trim());
        },

        /**
         * Возвращает позицию прокрутки окна
         * @returns {Number|*}
         */
        scrollY: function() {
            return window.scrollY || document.documentElement.scrollTop;
        },

        /**
         * Функция форматитрования числа, аналог php функции
         * original source: http://phpjs.org/functions/number_format/
         *
         * @param {number} number - исходное число
         * @param {number} decimals - устанавливает число знаков после запятой
         * @param {number} dec_point - устанавливает разделитель дробной части
         * @param {number} thousands_sep - устанавливает разделитель тысяч
         * @return {string} - возвращает отформатированное число
         */
        numberFormat: function(number, decimals, dec_point, thousands_sep) {
            number = (number + '')
                .replace(/[^0-9+\-Ee.]/g, '');
            var n = !isFinite(+number) ? 0 : +number,
                prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
                sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
                dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
                s = '',
                toFixedFix = function(n, prec) {
                    var k = Math.pow(10, prec);
                    return '' + (Math.round(n * k) / k)
                            .toFixed(prec);
                };
            // Fix for IE parseFloat(0.55).toFixed(0) = 0;
            s = (prec ? toFixedFix(n, prec) : '' + Math.round(n))
                .split('.');
            if (s[0].length > 3) {
                s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
            }
            if ((s[1] || '')
                    .length < prec) {
                s[1] = s[1] || '';
                s[1] += new Array(prec - s[1].length + 1)
                    .join('0');
            }
            return s.join(dec);
        }
    };

}(jQuery));