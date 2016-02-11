###global inform,android,clientMessage###

testCall = (ar) ->
  clientMessage "TEST: Success #{ar}"

newLevel = ->
  clientMessage 'all--> ' + inform.scripts().all()
  all = inform.scripts().all()
  for script in all
    clientMessage 'script: ' + script.name()
  informScript = inform.scripts().find('inform.develop.js')
  clientMessage '--> attempt inform: ' + informScript
  if informScript isnt null
    clientMessage '--> got informScript: ' + informScript
    clientMessage 'TEST: call methods (must say success!)'
    informScript.call 'testCall', [ 'yay' ]
    clientMessage 'TEST: set/get methods'
    informScript.set 'a', 1
    result = informScript.get('a')
    if result is 1
      clientMessage 'TEST: (STRICT) Success'
    else
      clientMessage 'TEST: (STRICT) Fail'
    if `result == 1`
      clientMessage 'TEST: (UNSTRICT) Success'
    else
      clientMessage 'TEST: (UNSTRICT) Fail'
    clientMessage 'TEST: value validation'
    if a is 1
      clientMessage 'TEST: Success'
    else
      clientMessage 'TEST: Fail'
    clientMessage 'TEST: defined works?'
    def = informScript.defined('newLevel')
    if def
      clientMessage 'TEST: Success'
    else
      clientMessage 'TEST: Fail'
    clientMessage 'TEST: Scope: ' + informScript.scope()
    clientMessage 'TEST: Name: ' + informScript.name()
    clientMessage 'Test: Real: ' + informScript.real()
  else
    clientMessage 'FATAL: Could not get this script, it was null'
