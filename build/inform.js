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
  var all, j, len, script;
  all = inform.scripts().all();
  for (j = 0, len = all.length; j < len; j++) {
    script = all[j];
    if (script.name() === name) {
      return all[i];
    }
    i++;
  }
  return null;
};


/**
 * Expects a script to be found.
 * Returns `true` if it is found.
 * @param {String} name The name of the script
 * @return {Boolean} exists Is the script present?
 */

inform.cooperateExpect = function(name) {
  var all, j, len, script;
  all = inform.scripts().all();
  for (j = 0, len = all.length; j < len; j++) {
    script = all[j];
    if (all[i].name() === name()) {
      return true;
    }
    i++;
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
    expect: inform.cooperateExpect
  };
};
