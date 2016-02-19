var InformScriptWrapper, inform;

inform = {
  VERSION: '0.0.1'

  /*global net,inform,org */
};

InformScriptWrapper = (function() {
  function InformScriptWrapper(script1) {
    this.script = script1;
  }

  InformScriptWrapper.prototype.defined = function(name) {
    var scope;
    scope = this.script.scope;
    return org.mozilla.javascript.ScriptableObject.hasProperty(scope, name);
  };

  InformScriptWrapper.prototype.real = function() {
    return this.script;
  };

  InformScriptWrapper.prototype.set = function(name, value) {
    return org.mozilla.javascript.ScriptableObject.putProperty(this.scope(), name, value);
  };

  InformScriptWrapper.prototype.name = function() {
    return this.script.name;
  };

  InformScriptWrapper.prototype.call = function(name, args) {
    if (args == null) {
      args = [];
    }
    return org.mozilla.javascript.ScriptableObject.callMethod(this.scope(), name, args);
  };

  InformScriptWrapper.prototype.get = function(name) {
    return org.mozilla.javascript.ScriptableObject.getProperty(this.scope(), name);
  };

  InformScriptWrapper.prototype.scope = function() {
    return this.script.scope;
  };

  return InformScriptWrapper;

})();


/**
 * Returns all ScriptState(s) converted to InformScriptWrappers as an array.
 * Note that in BL, all ScriptStates are in an ArrayList,
 * but here we convert them to an array.
 * @return {[type]} [description]
 */

inform.cooperateAll = function() {
  var i, scriptsArray, scriptsArrayList;
  scriptsArrayList = net.zhuoweizhang.mcpelauncher.ScriptManager.scripts;
  scriptsArray = [];
  i = 0;
  while (i < scriptsArrayList.size()) {
    scriptsArray.push(new InformScriptWrapper(scriptsArrayList.get(i)));
    i++;
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
  var j, len, ref, script;
  ref = inform.scripts().all();
  for (j = 0, len = ref.length; j < len; j++) {
    script = ref[j];
    clientMessage("FIND: Looking @ " + script + " (" + (script.name()) + ")");
    clientMessage("FIND: " + (script.name()) + " is " + name + "???");
    if (script.name() == name) {
      return script;
    }
  }
  return null;
};


/**
 * Expects a script to be found, throws an error if it isn't found.
 * @param {String} name The name of the script
 */

inform.cooperateExpect = function(name) {
  var j, len, ref, script;
  ref = inform.scripts().all();
  for (j = 0, len = ref.length; j < len; j++) {
    script = ref[j];
    if (script.name() === name) {
      return true;
    }
  }
  throw new Error("Expected to find " + name + ", but it wasn't present");
};


/**
 * Returns whether a script could be found.
 * @param  {String} name The filename of the script
 * @return {Boolean}      Is the script present?
 */

inform.cooperateHas = function(name) {
  var j, len, ref, script;
  ref = inform.scripts().all();
  for (j = 0, len = ref.length; j < len; j++) {
    script = ref[j];
    if (script.name() === name) {
      return true;
    }
  }
  return false;
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
    find: inform.cooperateFind,
    expect: inform.cooperateExpect,
    has: inform.cooperateHas
  };
};
