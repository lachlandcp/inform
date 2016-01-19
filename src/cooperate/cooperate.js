/*global net,inform,org*/

function InformScriptWrapper(script) {
    this.script = script;
}

/**
 * Checks whether something is defined in this script.
 * @param  {String} name The name of the thing.
 * @return {Boolean} isDefined Is it defined?
 */
InformScriptWrapper.prototype.defined = function(name) {
    var scope = this.script.scope;
    return org.mozilla.javascript.ScriptableObject.hasProperty(scope, name);
};

/**
 * Returns the real thing, a.k.a ScriptState
 * @return {ScriptState} The ScriptState
 */
InformScriptWrapper.prototype.real = function() {
    return this.script;
};

/**
 * Sets something on the scope.
 * @param {String} name  The name of the value
 * @param {Object} value The new value
 */
InformScriptWrapper.prototype.set = function(name, value) {
    org.mozilla.javascript.ScriptableObject.putProperty(
        this.scope(), name, value
    );
};

/**
 * Returns the name of this script.
 * @return {String} Name of this script.
 */
InformScriptWrapper.prototype.name = function() {
    return this.script.name;
};

/**
 * Calls a function in this script's scope.
 * @param  {String} name The name of the function
 * @param  {Object[]} args The arguments to be passed
 * @return {Object} objects What is returned by that function.
 */
InformScriptWrapper.prototype.call = function(name, args) {
    return org.mozilla.javascript.ScriptableObject.callMethod(
        this.scope(), name, args
    );
};

/**
 * Returns something from the scope of the script.
 * @param  {String} name The name of the thing to get.
 * @return {Object}      The value
 */
InformScriptWrapper.prototype.get = function(name) {
    return org.mozilla.javascript.ScriptableObject.getProperty(
        this.scope(), name);
};

/**
 * Returns the scope of the script.
 * @return {ScriptableObject} The scope of the script
 */
InformScriptWrapper.prototype.scope = function() {
    return this.script.scope;
};

/**
 * Returns all ScriptState(s) converted to InformScriptWrappers as an array.
 * Note that in BL, all ScriptStates are in an ArrayList,
 * but here we convert them to an array.
 * @return {[type]} [description]
 */
inform.cooperateAll = function() {
    var scriptsArrayList = net.zhuoweizhang.mcpelauncher.ScriptManager.scripts;
    var scriptsArray = [];
    for (var i = 0; i < scriptsArrayList.size(); i++) {
        scriptsArray.push(new InformScriptWrapper(scriptsArrayList.get(i)));
    }
    return scriptsArray;
};

/**
 * Finds a script by it's name and returns
 * a InformScriptWrapper of it. 
 * @param  {String} name The name of the script.
 * @return {InformScriptWrapper} wrapper The wrapper.      
 */
inform.cooperateFind = function(name) {
    var all = inform.scripts().all();
    for (var i = 0; i != all.length; i++) {
        if (all[i].name() == name) {
            return all[i];
        }
    }

    return null;
};

/**
 * Main entrance.
 *
 * Example:
 * inform.scripts.find("somescript.js")
 *     .defined("someVariable");
 * @return {[type]} [description]
 */
inform.scripts = function() {
    return {
        all: inform.cooperateAll,
        find: inform.cooperateFind
    };
};
