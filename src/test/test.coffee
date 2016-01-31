###global inform,android,clientMessage###

testCall = (ar) ->
  clientMessage '--> success ' + ar

newLevel = ->
  clientMessage 'all--> ' + inform.scripts().all()
  all = inform.scripts().all()
  for script in all
    clientMessage 'script: ' + script.name()
    i++
  informScript = inform.scripts().find('inform.js')
  clientMessage '--> attempt inform: ' + informScript
  if informScript isnt null
    clientMessage '--> got informScript: ' + informScript
    clientMessage '--> call testCall:'
    informScript.call 'testCall', [ 'yay' ]
    clientMessage '--> get set test:'
    informScript.set 'a', 1
    result = informScript.get('a')
    if result is 1
      clientMessage '--> succeed'
    else
      clientMessage '--> fail'
    clientMessage '--> should be true!!! ' + (a is 1)
    clientMessage '--> defined test:'
    def = informScript.defined('newLevel')
    if def
      clientMessage '--> succeed'
    else
      clientMessage '--> failed on defined'
    clientMessage '--> scope test: ' + informScript.scope()
    clientMessage '--> name test: ' + informScript.name()
    clientMessage '--> real test: ' + informScript.real()
  else
    clientMessage '--> failed: script was null!'
