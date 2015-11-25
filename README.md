# IOO
Набор функций хелперов


## Валидаторы

### - Проверка email
````javascript
var isEmail = $.IOO.isEmail('test@mail.com');
````

### - Проверка URL
````javascript
var isUrl = $.IOO.isUrl('http://test.com');
````


## Работа с URL

### - Получить массив секций из URL
````javascript
var sections = $.IOO.getUrl();
````

### - Получить секцию из URL по индексу
````javascript
var section = $.IOO.getUrl(0);
````




## Работа с языками

### - Получить текуций язык из URL
````javascript
var lang = $.IOO.getLang();
````

### - Добавить языковые переменные
````javascript
$.IOO.addMessage({'pay_success':{
    'ru': 'Платеж успешно отправлен',
    'en': 'The payment has been sent successfully'
}});
````

### - Вывести языковые переменные
````javascript
alert($.IOO.getMessage('pay_success'));
````