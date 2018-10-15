# mocha-webdriver-runner

Run Mocha tests in browsers using Selenium WebDriver.

Inspired by [mocha-chrome](https://www.npmjs.com/package/mocha-chrome), but with following
features implemented from start:

* drives browser using Selenium WebDriver, so you can run tests on everything that selenium WebDriver supports. Hint: it supports everything (tm).
* runs reporters locally, in node environment so most of reporters (which are designed to work in node environment) should work out-of-box:
    * tested mocha builtins: spec, xunit, tap, etc ...
    * support for `mochawesome` (including usage of `addContext`)

That's it, have fun.

## Install

```
$ npm install /mocha-webdriver-runner
```

## Usage

Prepare your tests to run in browser as described on [Mocha website](https://mochajs.org/#running-mocha-in-the-browser).

Add `mocha-webdriver-runner` browser side client:

     <script src="../node_modules/mocha-webdriver-runner/dist/mocha-webdriver-client.js"></script>

and install `MochaWebdriverClient` in global `mocha` instance:

      mocha.setup({ui: "bdd"});
    + MochaWebdriverClient.install(mocha);

Run the test suite:

    SELENIUM_BROWSER=chrome npx mocha-webdriver-runner test/index.html

    SELENIUM_BROWSER=firefox npx mocha-webdriver-runner test/index.html --reporter=tap

(assuming your tests are in test/index.html).

See `package.json` scripts and `test/sample-suite/index-headless.html` for reference.

## Browser capabilities

Use `-C key[=value]` (or `--capability`) options to set requested browser capabilities.
Value may be plain string, or JSON value, examples:
```
-C browserName=firefox
-C moz:firefoxOptions.args='["-headless"]'
-C browserName=chrome
-C chromeOptions.args='["--headless", "--window-size=300,300"]'
```

Useful links:
* [Selenium Capabilities](https://github.com/SeleniumHQ/selenium/wiki/DesiredCapabilities)
* [Gecko driver capabilities](https://firefox-source-docs.mozilla.org/testing/geckodriver/geckodriver/Capabilities.html)
* [Chrome driver capabilities](https://sites.google.com/a/chromium.org/chromedriver/capabilities)

Selenium WebDriverJS accepts capabilities passed by environment variables as below:
```
SELENIUM_BROWSER=chrome
SELENIUM_BROWSER=firefox:52
SELENIUM_REMOTE_URL=http://my-selenium-grid:4444/wd/hub
```

See [WebDriverJS Builder](https://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/index_exports_Builder.html)

## API

```javascript
import { runMochaWebDriverTest } from 'mocha-webdriver-runner/lib/mocha-webdriver-runner';

const webDriverCapabilities = {
    browserName: 'firefox'
};

runMochaWebDriverTest(webDriverCapabilities, "https://localhost:8080/test/index.html")
    .then(result => {
        // result is boolean i.e ok or not ok
        console.log('test result', result ? ':)' : ':(');
    })
    .catch(error => {
        // something bad happened with runner itself i.e webdriver error or something
    })
```

## Contribute

PRs accepted.

## License

MIT © Zbigniew Zagórski