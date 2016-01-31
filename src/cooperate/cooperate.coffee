###global net,inform,org###

class InformScriptWrapper
  constructor: (@script) ->

  # Returns whether something exists in this script.
  defined: (name) ->
    scope = @script.scope
    org.mozilla.javascript.ScriptableObject.hasProperty scope, name

  # Returns the real ScriptState.
  real: ->
    @script

  # Sets something in this script's state.
  set: (name, value) ->
    org.mozilla.javascript.ScriptableObject.putProperty @scope(), name, value

  # Returns this script's name (script.js)
  name: ->
    @script.name

  # Calls a function in this script's scope.
  call: (name, args) ->
    org.mozilla.javascript.ScriptableObject.callMethod @scope(), name, args

  # Returns something in this script's state.
  get: (name) ->
    org.mozilla.javascript.ScriptableObject.getProperty @scope(), name

  # Returns the scope (ScriptableObject) of this script.
  scope: ->
    @script.scope

###*
# Returns all ScriptState(s) converted to InformScriptWrappers as an array.
# Note that in BL, all ScriptStates are in an ArrayList,
# but here we convert them to an array.
# @return {[type]} [description]
###

inform.cooperateAll = ->
  scriptsArrayList = net.zhuoweizhang.mcpelauncher.ScriptManager.scripts
  scriptsArray = []
  i = 0
  while i < scriptsArrayList.size()
    scriptsArray.push new InformScriptWrapper(scriptsArrayList.get(i))
    i++
  scriptsArray

###*
# Finds a script by it's name and returns
# a InformScriptWrapper of it.
# @param  {String} name The name of the script.
# @return {InformScriptWrapper} wrapper The wrapper.
###

inform.cooperateFind = (name) ->
  all = inform.scripts().all()
  for script in all
    if script.name() is name
      return all[i]
    i++
  null

###*
# Expects a script to be found.
# Returns `true` if it is found.
# @param {String} name The name of the script
# @return {Boolean} exists Is the script present?
###

inform.cooperateExpect = (name) ->
  all = inform.scripts().all()
  for script in all
    if all[i].name() is name()
      return true
    i++
  false

###*
# Main entrance.
#
# Example:
# inform.scripts.find("somescript.js")
#     .defined("someVariable");
# @return {[type]} [description]
###

inform.scripts = ->
  {
    all: inform.cooperateAll
    find: inform.cooperateFind
    expect: inform.cooperateExpect
  }
