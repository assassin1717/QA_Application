const { defineConfig } = require("cypress");
require('dotenv').config();

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://apex.oracle.com/pls/apex/r/danmende/qa-application/home",
    "env": {
      "USERNAME": process.env.USER,
      "PASSWORD": process.env.PASSWORD
    },
    "envFile": "dotenv-setup.js",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
