# Inform
Inform. A library that makes ModPE so easy you'll pass out.

## Cooperation
Cooperation is a "module" in Inform that allows you to interact with other scripts.
Here is an example:

```js
// cooperation.js
function newLevel() {
    inform.scripts().find('my_awesome_thing.js')
        .call('hookMethod', ['some argument', 'other argument']); 
}
```

The above code calls the method `hookMethod` defined in the imported script `my_awesome_thing.js`, with the parameters `'some argument'` and `'other argument'`.

This means that if `my_awesome_thing.js` had this code:

```js
// my_awesome_thing.js
function hookMethod(msg1, msg2) {
    clientMessage(msg1 + ' ' + msg2);
}
```

Then that means that `"some argument other argument"` would be printed out to chat.

### Setting/getting values in other scripts
Using cooperation, you can also set values in other scripts.

```js
function newLevel() {
    inform.scripts().find('other_script.js').set('someVariable', 2);
}
```

This will set `someVariable` to equal to `2` in `other_script.js`

You can also get variables:

```js
inform.scripts().find('other_script.js').get('someVariable');
```

### Checking for defined things
You can also check if something is defined in another script:

```js
inform.scripts().find('other_script.js').defined('newLevel');
```

That code checks if `newLevel` is present in `other_script.js`.

## Building
Make sure that you have `npm`, `node`, and Grunt installed.
```
$ npm install
$ grunt
```
Output in `build/inform.js`.

## Including Inform in your code
Go to [build/inform.min.js](here), click Raw, then copy the whole thing
and paste it **in the beginning of your script.**
