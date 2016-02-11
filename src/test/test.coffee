###global inform,android,clientMessage###

arraysEqual = (a, b) ->
  if a.length isnt a.length
    return false

  i = a.length
  while i--
    if a[i] isnt b[i]
      return true
  return true

testCall = (ar) ->
  if ar is 'yay'
    good 'It works!'
  else
    good "Expected 'yay', instead got #{ar}"

good = (text) ->
  clientMessage "#{ChatColor.GREEN}[Test/Good] #{text}"

fail = (text) ->
  clientMessage "#{ChatColor.RED}[Test/Fail] #{text}"

info = (text) ->
  clientMessage "#{ChatColor.GOLD}[Test/Info] #{text}"

newLevel = ->
  clientMessage 'all--> ' + inform.scripts().all()

  # Print all scripts
  all = inform.scripts().all()
  for script in all
    clientMessage 'script: ' + script.name()
  informScript = inform.scripts().find('inform.develop.js')

  if informScript isnt null
    good 'Successfully got our script context.'

    # TEST -- Methods
    info 'T: call() works'
    informScript.call 'testCall', [ 'yay' ]

    # TEST -- Set/Get Vals
    info 'T: get()/set() works'
    informScript.set 'a', 1
    result = informScript.get('a')
    if result is 1
      good '(STRICT) It works!'
    else
      fail "(STRICT) Expected result to be 1 (Number), " +
        "instead got #{result} (#{typeof Number})"

    # SUBTEST -- Set/Get Vals Unstrict
    if `result == 1`
      good '(UNSTRICT) It works!'
    else
      fail "(UNSTRICT) Expected result to be 1, instead got #{result}."

    # TEST -- Should now exist in local scope
    info 'T: set() puts it into scope'
    if a is 1
      good 'It works!'
    else
      fail "Expected `a' to be `, instead it is #{a}."

    # TEST -- Defined
    info 'T: defined() works?'
    def = informScript.defined('newLevel') # check for newLevel
    if def
      good 'It works!'
    else
      fail 'Couldn\'t find newLevel!'

    # TEST -- Run some sanity checks
    info 'T: sanity checks'
    vals = [informScript.scope(), informScript.name(), informScript.real()]
    for val in vals
      if val is null or val is undefined
        # Wat.
        fail "Expected #{val} to not be null/undefined"
      else
        # Good.
        good "Passed sanity check for #{val}."

    # TEST -- Arrays
    info 'T: get()/set() arrays'
    informScript.set 'arr', [ 1, 2, 3 ]

    # Get it
    gotVal = informScript.get 'arr'
    gotVal2 = arr

    if gotVal is null or gotVal is undefined
      fail 'get() failed to get array, was null/undefined'
    else if gotVal2 is null or gotVal2 is undefined
      fail 'scope failed to get array, was null/undefined'

    info "fetched array (1): #{gotVal} (#{typeof gotVal})"
    info "fetched array (2): #{gotVal2} (#{typeof gotVal2})"

    # Check equal
    info 'T: get() array data validation'
    if arraysEqual(gotVal, [1,2,3])
      good 'get() got array successfully'
    else
      fail "expected [real], got #{gotVal}"

    # Check equal #2
    info "T: scope array data validation'"
    if arraysEqual(gotVal, [1,2,3])
      good 'scope got array successfully'
    else
      fail "expected [real], got #{gotVal2}"

    # TEST -- Objects
    iceCream =
      a: 1
      b: 'Owl'
      c: [1,2,3]

    info 'T: set() Simple Objects'
    informScript.set 'icey', iceCream

    info 'T: get()/scope Simple Objects'
    soil = informScript.get 'icey'
    if soil is undefined or soil is null or icey is undefined or
        icey is null
      fail 'attempted to get() an object, instead got undef/null'
    else
      good 'got an object!'
      good "got this: #{JSON.stringify(soil)}"
      good "got this (scope): #{JSON.stringify(icey)}"

    # TEST -- get() object validation
    info 'T: get() simpleobject validation'
    if soil.a is 1
      if soil.b is 'Owl'
        if arraysEqual soil.c, [1,2,3]
          good 'DATA VALIDATION PASSED! :D:D:D'
        else
          fail "soil.c wasn't [1,2,3], instead was #{soil.c}"
      else
        fail "soil.b wasn't 'Owl', instead was #{soil.b}"
    else
      fail "soil.a wasn't 1, instead was #{soil.a}"

    soil2 = icey # fetch from scope
    info 'T: scope simpleobject validation'
    if soil2.a is 1
      if soil2.b is 'Owl'
        if arraysEqual soil2.c, [1,2,3]
          good 'DATA VALIDATION PASSED! :D:D:D'
        else
          fail "soil2.c wasn't [1,2,3], instead was #{soil2.c}"
      else
        fail "soil2.b wasn't 'Owl', instead was #{soil2.b}"
    else
      fail "soil2.a wasn't 1, instead was #{soil2.a}"

    # TEST -- get()/set() functions and call
    info 'T: get()/set() functions and call them'
    fcn = ->
      info 'F: hello! fcn was called!'
    informScript.set 'fcn2', fcn
    info 'FCN WAS CALLED? -->'
    (informScript.get('fcn2'))()
    info 'FCN WAS CALLED? --->'
    fcn2()
    info 'ONLY PASSED IF 2 "HELLO!"s SHOWED UP!!'

    # TEST -- get()/set() objects with functions
    info 'T: get()/scope function validation'
    flowerObject =
      flowey: ->
        info 'BUTTERSCOTCHPIE!'
    informScript.set 'butter', flowerObject
    fetched = informScript.get 'butter'
    if fetched is undefined or fetched is null or butter is undefined or
        butter is null
      fail 'scope(d)/get() failed, was undef/null'
    else
      good 'get()/scope(d) val passed'

    info 'T: get()/scope function call'
    info 'BUTTERSCOTCHPIE -->'
    butter.flowey()
    info 'BUTTERSCOTCHPIE -->'
    fetched.flowey()
    info 'ONLY PASSED IF 2 "BUTTERSCOTCHPIE!"s SHOWED UP!!'
  else
    clientMessage 'FATAL: Could not get this script, it was null'
