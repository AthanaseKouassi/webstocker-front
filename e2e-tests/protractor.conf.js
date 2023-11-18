exports.config = {
  allScriptsTimeout: 11000,

  specs: [
    '*.js'
  ],

  capabilities: {
    'browserName': 'chrome'
  },

//  baseUrl: 'http://83.166.138.228:8000/app/',
//  baseUrl: 'http://localhost:8000/app/',
//  baseUrl: 'https://localhost:8443/app/',
  baseUrl: 'https://127.0.0.1:8443/app/',

  framework: 'jasmine',

  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  }
};
