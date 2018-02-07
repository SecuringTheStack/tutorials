Injection Fundamentals: What Is Injection?
==========================================

## Help Me/Important StS Links

-   Video: <https://securingthestack.com/p/injection-fundamentals-1>
-   Ask A Question: <https://sts.tools/injection-question>
-   Speak To Human: <https://sts.tools/live-support>
-   Overarching Playlist: <https://securingthestack.com/courses/category/Injection>

Table Of Contents
-----------------

-   [Injection Fundamentals: What Is
    Injection?](#injection-fundamentals-what-is-injection)
    -   [Intro](#intro)
    -   [What Is Injection?](#what-is-injection)
    -   [Inject The Shell Context
        (Assignment)](#inject-the-shell-context-assignment)
    -   [Inject The Shell Context
        (Answer)](#inject-the-shell-context-answer)
    -   [Inject The Shell Context
        (Takeaways)](#inject-the-shell-context-takeaways)
    -   [Syntactic Injection](#syntactic-injection)
    -   [Evaluating Execution Contexts](#evaluating-execution-contexts)
    -   [Next Steps](#next-steps)
    -   [Error Log](#error-log)
    -   [Additional Resources](#additional-resources)
        -   [General](#general)
        -   [Java](#java)
        -   [Javascript](#javascript)
        -   [Ruby](#ruby)
        -   [PHP](#php)
        -   [Python](#python)
    -   [Knowledge Dependency Tree](#knowledge-dependency-tree)

Intro
-----

-   OWASP Top 10 2017
    -   Top 10 security threats to web applications
        -   Injection is \#1 risk
-   Who is this course for?
    -   Developers who have novice injection/security knowledge
-   Prerequisites: None
-   At the end of this episode, you'll be able to
    1.  Understand what injection is
    2.  Understand how execution contexts are linked to injection risks
    3.  Evaluate code to decipher all execution contexts
    4.  Inject a live node.js server within a safe containerized
        environment
        -   Offense is the best defense!
-   Ready? Come join me in the next lecture!

What Is Injection?
------------------

-   Webhook functionality within node application
    -   Leveraging `GET` for simplicity

        ``` javascript
        var userDefinedUrl = 'example.com/route';
        // Allow shell access
        var exec = require('child_process').exec;
        var curl = exec('curl ' + userDefinedUrl);
        curl.stdout.on('data', function(data) {
          // Mock response
          console.log(data);
        });
        ```

-   Injection is introducing data with malicious intent
    -   This data could include unexpected commands that the program
        executes
-   What malicious data could be *injected* into `userDefinedUrl`?

Inject The Shell Context (Assignment)
-------------------------------------

``` javascript
// Assignment: Kill the node process by entering data into `userDefinedUrl`
// Assume that the commands are being executed within a bash shell
var userDefinedUrl = 'example.com/route';
// Allow shell access
var exec = require('child_process').exec;
var curl = exec('curl ' + userDefinedUrl);
curl.stdout.on('data', function(data) {
  // Mock response
  console.log(data);
});
// Run: "EX_NUM=1 docker-compose up"
// File: "injection-fundamentals-1/src/1/app.js"
// Env Setup/Error Reporting: https://sts.tools/readme
// Questions: https://sts.tools/injection-question
```

-   Hint:
    1.  Think about the execution context that we're focusing on (i.e.,
        linux shell) and what delimits shell commands
    2.  `pkill`

Inject The Shell Context (Answer)
---------------------------------

``` javascript
// Make a PR and contribute your answers here!
// var userDefinedUrl = "example.com/route; pkill node";

var userDefinedUrl = 'example.com/route';
// Allow shell access
var exec = require('child_process').exec;
var curl = exec('curl ' + userDefinedUrl);
curl.stdout.on('data', function(data) {
  // Mock response
  console.log(data);
});
// Run: "EX_NUM=2 docker-compose up"
// File: "injection-fundamentals-1/src/2/app.js"
// Env Setup/Error Reporting: https://sts.tools/readme
// Questions: https://sts.tools/injection-question
```

Inject The Shell Context (Takeaways)
------------------------------------

``` javascript
var userDefinedUrl = 'example.com/route; pkill node';
var curl = exec('curl ' + userDefinedUrl);
```

-   Input is fed into an execution context (e.g., /bin/sh) which has a
    unique syntax (e.g., `;`)
    -   If delimiters are allowed, injection can be very easy
-   If the input has come from an outside entity, don't trust it
    -   Ex: User supplied data that's coming from a database
-   What other ways can the shell context be exploited?

    ``` javascript
    var userDefinedUrl = "example.com/route; echo $ENV_SECRET";
    ```

Syntactic Injection
-------------------

``` javascript
var userDefinedUrl = 'example.com/route; pkill node';
var curl = exec('curl ' + userDefinedUrl);
```

-   Syntactic Injection
    -   Exploiting the *syntax* of a given execution context

Evaluating Execution Contexts
-----------------------------

``` javascript
var userDefinedUrl = 'example.com/route; pkill node';
var curl = exec('curl ' + userDefinedUrl);
```

-   `var curl = exec("curl " + userDefinedUrl);`
    -   What execution contexts are being leveraged?
        1.  shell
        2.  curl
        3.  javascript
            1.  Always true

Next Steps
----------

-   Additional assignment: Look for file manipulation within a codebase
    and identify potential injection issues
    -   Sometimes file manipulations occur within a shell context
-   Review video notes for links to
    -   Other/future episodes
    -   Additional resources
        -   Specific to other languages
        -   Ability to explore more in-depth
-   Future episodes will cover additional execution contexts
-   Thanks! :D

Error Log
---------

-   None so far :)

Additional Resources
--------------------

-   Please submit a PR with any additional resources.

### General

-   <https://en.wikipedia.org/wiki/Code_injection#Shell_injection>

### Java

-   <http://codewhitesec.blogspot.com/2016/02/java-and-command-line-injections-in-windows.html>

### Javascript

-   <https://s1gnalcha0s.github.io/node/2015/01/31/SSJS-webshell-injection.html>

### Ruby

-   <https://medium.com/zendesk-engineering/running-a-child-process-in-ruby-properly-febd0a2b6ec8>

### PHP

-   <https://github.com/PortSwigger/command-injection-attacker>

### Python

-   <https://sethsec.blogspot.com/2016/11/exploiting-python-code-injection-in-web.html>

Knowledge Dependency Tree
-------------------------

-   None. This is the first episode
