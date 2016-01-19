/*global inform,android,clientMessage*/

function testCall(ar) {
    clientMessage('--> success ' + ar);
}

function newLevel() {
    clientMessage('all--> ' + inform.scripts().all());
    var all = inform.scripts().all();
    for (var i = 0; i != all.length; i++) {
        clientMessage('script: ' + all[i].name());
    }

    var informScript = inform.scripts().find('inform.js');
    clientMessage('--> attempt inform: ' + informScript);
    if (informScript != null) {
        clientMessage('--> got informScript: ' + informScript);
        clientMessage('--> call testCall:');
        informScript.call('testCall', ['yay']);
        clientMessage('--> get set test:');
        informScript.set('a', 1);
        var result = informScript.get('a');
        if (result == 1) {
            clientMessage('--> succeed');
        } else { clientMessage('--> fail'); }
        clientMessage('--> defined test:');
        var def = informScript.defined('newLevel');
        if (def) {
            clientMessage('--> succeed');
        } else { clientMessage('--> failed on defined'); }
        clientMessage('--> scope test: ' + informScript.scope());
        clientMessage('--> name test: ' + informScript.name());
        clientMessage('--> real test: ' + informScript.real());
    } else { clientMessage('--> failed: script was null!'); }
}
