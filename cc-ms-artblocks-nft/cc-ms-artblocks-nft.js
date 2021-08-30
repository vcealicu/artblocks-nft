const scriptArgs = require('./lib/cc-config.js');
const apiCoreMs = require('./lib/cc-api-core-ms.js');
const fidenza = require('./lib/fidenza.js');
const crypto = require('crypto');
const nodeP5 = require('node-p5');

let scriptParams = scriptArgs.parse({
    PORT: 8080,
    IP: '0.0.0.0',
});

apiCoreMs.addEndpoint({
    CacheLength: 0,
    HttpVerb: 'GET',
    Key: 'fidenza',
    Url: '/fidenza',
    Description: '',
    Examples: [],
    execute: function(callParams, hitTimestamp, executeCallback) {
        let seed = callParams.seed || '0x' + crypto.randomBytes(20).toString("hex");
        let resourcesToPreload = {
            seed: () => {
                return seed;
            },
            windowHeight: () => {
                return callParams.height !== undefined ? parseInt(callParams.height, 10) : 1200;
            },
            windowWidth: () => {
                return callParams.width !== undefined ? parseInt(callParams.width, 10) : 1200;
            },
            canvasBuffer: () => {
                return function(dataBuffer) {
                    executeCallback(null, dataBuffer, seed + '.png');
                };
            }
        };
        nodeP5.createSketch(fidenza.sketch, resourcesToPreload);
    }
});

apiCoreMs.start(scriptParams);
