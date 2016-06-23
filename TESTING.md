## Karma Unit Testing

[http://karma-runner.github.io/0.13/index.html](http://karma-runner.github.io/0.13/index.html)

### Setup

Install the `karma-cli` globally.
```shell
$ npm install -g karma-cli
```

Also make sure that you've installed all the tools needed for the testing environment by running:
```shell
$ npm install
```

### Run
```shell
$ karma start
```

### Coverage
You can find the test coverage in `tests/coverage/` directory.

### Integrate with Jenkins CI
* Install [EnvInject](https://wiki.jenkins-ci.org/display/JENKINS/EnvInject+Plugin) plugin to Jenkins
* Start a new job in Jenkins with the basic settings (Name, description, parameters, source code repo to pull from, etc.)
* Configure the build environment. First go to the job page and click on configure. Then in the Build Environment sub-section, check the **Inject environment variables to the build process** checkbox. A few textboxes will appear and in the **Properties Content** box set the following:
```shell
$ PATH=/sbin:/usr/sbin:/bin:/usr/bin:/usr/local/bin
$ PHANTOMJS_BIN=/usr/local/bin/phantomjs #PhantomJS location
```
* In the **Post-build** Actions sub-section add a **Publish JUnit test result report**. When the textbox labeled **Test report XMLs** appears, enter the path to where the `test-results.xml` is relative to the root of your Jenkins job workspace.
