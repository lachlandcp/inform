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

### Expect another script to exist
Using cooperation, you can **expect** another script to exist.
This can be handy if your script is supposed to work with other scripts that
are supposed to exist, or else your script will not function correctly.

```js
function newLevel() {
  inform.scripts().expect('lib.js'); // returns true if found, else returns false
```

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
Make sure that you have `npm`, `node`, and Grunt installed. If you just want to use Inform, you don't have to do this. Instead, look at the section below.
```
$ npm install
$ grunt
```
Output in `build/inform.min.js`. Unminified in `build/inform.js`.

## Including Inform in your code
Go to [here](https://raw.githubusercontent.com/sliceofcode/inform/master/build/inform.min.js), then copy the whole thing
and paste it **in the beginning of your script.**
