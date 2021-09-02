const scriptArgs = require('./lib/cc-config.js');
const apiCoreMs = require('./lib/cc-api-core-ms.js');
const fidenza = require('./lib/fidenza.js');
const crypto = require('crypto');
const nodeP5 = require('node-p5');

let scriptParams = scriptArgs.parse({
    PORT: 8080,
    IP: '0.0.0.0',
});

function isValidHex(inputString) {
  return inputString.match(/^0x[0-9a-f]+$/i) !== null;
}

apiCoreMs.addEndpoint({
    CacheLength: 0,
    HttpVerb: 'GET',
    Key: 'fidenza',
    Url: '/fidenza',
    Description: '',
    Examples: [],
    execute: function(callParams, hitTimestamp, executeCallback) {
        let seed = '0x' + crypto.randomBytes(20).toString("hex");
        if(callParams.seed !== undefined && callParams.seed.length>10){
            if ( isValidHex(callParams.seed) ){
                seed = callParams.seed;
            } else {
                callParams.seed = undefined;
            }
        }
        let resourcesToPreload = {
            seed: () => {
                return seed;
            },
            windowHeight: () => {
                let height = callParams.height !== undefined ? parseInt(callParams.height, 10) : 1200;
                if( height<600  || height>1200){
                    height = 1200;
                }
                return height;
            },
            windowWidth: () => {
                let width = callParams.width !== undefined ? parseInt(callParams.height, 10) : 1200;
                if( width<600  || width>1200){
                    width = 1200;
                }
                return width;
            },
            canvasBuffer: () => {
                return function(dataBuffer) {
                    executeCallback(null, dataBuffer, seed + '.png', callParams.seed !== undefined);
                };
            }
        };
        nodeP5.createSketch(fidenza.sketch, resourcesToPreload);
    }
});

apiCoreMs.start(scriptParams);
