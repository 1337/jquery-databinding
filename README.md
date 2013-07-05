jquery-databinding
==================

Because I ain't switchin' to backbone just for this small feature

How to use
==================
1. Call `databinding` on any element you wish, i.e.: `$('input').databinding();`

Database support
==================
* Any key-value database. (It doesn't matter)


Options
==================
* `endpoint` (default: ''): data source: either the location of the REST API, or an element's ID.
* `username` (default: ''): if your remote endpoint needs a user name
* `password` (default: ''): if your remote endpoint needs a password
* `successCallback` (default: `function () {}`): the function that gets called if your remote get/set succeeds.
* `errorCallback` (default: `function () {}`): the function that gets called if your remote get/set fails.

You can specify options for the plugin as an object, like so:
```
$('input').databinding({
    'endpoint': 'http://ohai.ca/api/v1/assets',
    'username': '1337',
    'password': 'hunter2'
});
```

Alternatively, any bound element on the page can also override this by having
 their own `data-` attributes.
```
    <input data-endpoint="http://ohai.ca/alternative_endpoint/updates" type="text"/>
```