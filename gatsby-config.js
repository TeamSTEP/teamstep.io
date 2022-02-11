'use strict';

/**
 * Run TypeScript code without compiling it
 * Source-map-support mimics node's stack trace making debugging easier
 * ts-node register helps compiling and importing TypeScript modules
 */
require('source-map-support').install();
require('ts-node').register();
require('dotenv').config({
    path: `.env.${process.env.NODE_ENV}`,
});

module.exports = require('./gatsby-config.ts');
//require('./gatsby-config.ts');

// module.exports = {
//   plugins: [
//   //'./gatsby-config.ts',
//      {
//    resolve: "gatsby-plugin-firebase",
//     options: {
//      features: {
//       auth: false,
//       database: false,
//       firestore: false,
//       storage: false,
//       messaging: false,
//       functions: false,
//       performance: false,
//       analytics:true,
//      },
//      credentials: {
//        apiKey: "AIzaSyCs9s7DRzRUb1PeLQ0vT4CtSLCSXq5br6w",
//        authDomain: "team-step.firebaseapp.com",
//        projectId: "team-step",
//        storageBucket: "team-step.appspot.com",
//        messagingSenderId: "255665197009",
//        appId: "1:255665197009:web:a609ed85c4eeb8d4d01af0",
//        measurementId: "G-RFT6XHCSH1"
//     }
//    },
//   },
//  ],
// }
