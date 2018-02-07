Injection Fundamentals: What Is SSRF?
=====================================

## Help Me/Important StS Links
-   Video: <https://securingthestack.com/p/injection-fundamentals-2>
-   Prerequisites: <https://sts.tools/if2k>
-   Ask A Question: <https://sts.tools/injection-question>
-   Speak To Human: <https://sts.tools/live-support>
-   Overarching Playlist: <https://securingthestack.com/p/injection-playlist>

Table Of Contents
-----------------

-   [Injection Fundamentals: What Is
    SSRF?](#injection-fundamentals-what-is-ssrf)
    -   [Intro](#intro)
    -   [Inject The Curl Context (Assignment
        Prep)](#inject-the-curl-context-assignment-prep)
    -   [Inject The Curl Context
        (Assignment)](#inject-the-curl-context-assignment)
    -   [Inject The Curl Context
        (Answer)](#inject-the-curl-context-answer)
    -   [Server Side Request Forgery
        (SSRF)](#server-side-request-forgery-ssrf)
    -   [Semantic Injection](#semantic-injection)
    -   [AWS EC2 Metadata SSRF](#aws-ec2-metadata-ssrf)
    -   [AWS EC2 Metadata SSRF
        (Takeaways)](#aws-ec2-metadata-ssrf-takeaways)
    -   [New Relic Webhook Blind SSRF](#new-relic-webhook-blind-ssrf)
    -   [Blind Injection](#blind-injection)
    -   [Course Takeaways](#course-takeaways)
    -   [Next Steps](#next-steps)
    -   [Error Log](#error-log)
    -   [Additional Resources](#additional-resources)
        -   [Referenced In Tutorial](#referenced-in-tutorial)
        -   [General](#general)
        -   [Java](#java)
        -   [Javascript](#javascript)
        -   [Ruby](#ruby)
        -   [PHP](#php)
        -   [Python](#python)
    -   [Knowledge Dependency Tree](#knowledge-dependency-tree)

Intro
-----

-   Who is this episode for?
    -   Developers who have novice injection/security knowledge
-   Prerequisites: [sts.tools/if2k](https://sts.tools/if2k)
-   At the end of this episode, you'll be able to
    1.  See how Server Side Request Forgery (SSRF) works through a live
        example
    2.  Understand how your code (coupled with the deployment
        environment) can create Semantic Injection risks
    3.  Review Blind Injection through a real vulnerability within New
        Relic
    4.  Through Blind Injection, we learn why we focus on input
        validation (as opposed to output validation)
    5.  Start reviewing mitigation strategies (whitelisting) that we'll
        focus on during upcoming tutorials
-   Ready? Come join me in the next lecture!

Inject The Curl Context (Assignment Prep)
-----------------------------------------

-   A host with 2 processes
    1.  File server
        -   Houses internal-only documents
        -   Accepts traffic from the corporate network on port `8081`
        -   Is accessible over `http://localhost:8081` on the main host
        -   DevOps created this server without your knowledge
            -   Aside: DevOps believes this file server is secure
                because
                -   It's restricted to the corporate network
                -   `localhost` is restricted to local processes
                -   Anything wrong with this thinking?
                    1.  The *unknown unknowns* are always the most
                        dangerous
                    2.  Always assume there are items that you dont know
    2.  Node server
        1.  Is publicly accessible over port 80
        2.  Houses your code

Inject The Curl Context (Assignment)
------------------------------------

``` javascript
// Assignment: Access the file server (port 8081) by injecting `userDefinedUrl`
// Please leverage the curl execution context
// Bonus: View the contents of `sensitive-file.txt` within the file server's
// current working directory

var userDefinedUrl = 'example.com/route';
// Allow shell access
var exec = require('child_process').exec;
var curl = exec('curl ' + userDefinedUrl);
curl.stdout.on('data', function(data) {
  // Mock response
  console.log(data);
});
// Run: "EX_NUM=1 docker-compose up"
// File: "injection-fundamentals-2/src/1/app.js"
```

-   Hints
    -   What network interface is used for "local access"

Inject The Curl Context (Answer)
--------------------------------

``` javascript
// Make a PR and contribute your answers here!
// var userDefinedUrl = "localhost:8081/sensitive-file.txt";

var userDefinedUrl = 'example.com/route';
// Allow shell access
var exec = require('child_process').exec;
var curl = exec('curl ' + userDefinedUrl);
curl.stdout.on('data', function(data) {
  // Mock response
  console.log(data);
});
// Run: "EX_NUM=2 docker-compose up"
// File: "injection-fundamentals-2/src/2/app.js"
```

-   This is an example of Server Side Request Forgery (SSRF)

Server Side Request Forgery (SSRF)
----------------------------------

-   The attacker makes the server initiate a request
    -   It's often to a domain that the developer isn't expecting

        ``` javascript
        var userDefinedUrl = "localhost:8081/sensitive-file.txt";
        ```

    -   Doesn't have to be invoked with `curl`

-   Categorizing SSRF
    -   Is the attacker exploiting `curl`'s *syntax*?
        -   Is this syntactic injection?
        -   No, this is semantic injection

Semantic Injection
------------------

-   Injection that exploits a unique *meaning* (or situation) in the
    environment
    -   Semantics == Meaning
    -   What constitutes an environment?
        -   Your code, the server *and* the environment that surrounds
            the server (AWS, DBs, etc.)
            -   Your code is the door to these contexts
        -   Can you think of a cloud service that exposes an
            introspection API on every server?
            -   AWS EC2 Metadata

AWS EC2 Metadata SSRF
---------------------

-   AWS IAM (Identity Access Management) Background
    -   Permissions functionality
    -   We attach permissions to IAM roles
    -   Roles are then attached to an EC2 server
-   SSRF Risk
    -   On the server, IAM roles can be queried through the EC2 Metadata
        Service

        ``` javascript
        var userDefinedUrl = "http://169.254.169.254/latest/meta-data/iam/security-credentials/ROLE_NAME";
        ```

    -   Truncated Output

        ``` json
        {
          "AccessKeyId" : "ASIAIOSFODNN7EXAMPLE",
          "SecretAccessKey" : "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY",
        }
        ```

AWS EC2 Metadata SSRF (Takeaways)
---------------------------------

-   SSRF *can* be leveraged to extract sensitive information
-   APIs in our surrounding environment pose injection risks
-   Don't be overwhelmed by the items that you must know :)
    -   By *knowing* that there are things you *don't know*, we can
        create granular whitelisting strategies
        -   Whitelist: A list of items that we'll allow, and reject
            everything else
-   For additional EC2 Metadata information, reference the
    `Additional Resources` section in the notes
-   Potential Takeaway
    -   In each of our SSRF examples, the output is clearly different
        from our expectations
        -   "Since we know what the output should be, we could easily
            create a whitelist for our responses"
        -   Would we be safe?

New Relic Webhook Blind SSRF
----------------------------

-   Reported by Tung Pun
    -   See link in `Additional Resources`
-   Form `POST` that Tung leveraged

    ``` http
    POST /accounts/1723471/notification_channels?type=WebhookIntegration HTTP/1.1

    utf8=%E2%9C%93&
    authenticity_token=i%2FxIU01NWUoCx92w1%2FmilEwulU1SjUGSKsJR8ARB4CQ%3D&
    webhook_integration%5Bname%5D=%22%3E%3Csvg%2Fonload%3Dalert(3)%3B%3E&
    webhook_integration%5Bwebhook_url%5D=http://127.0.0.1:4352/&
    webhook_integration%5Bdescription%5D=%22%3E%3Csvg%2Fonload%3Dalert(3)%3B%3E&
    webhook_integration%5Bverbosity%5D=default&
    webhook_integration%5Benabled%5D=true
    ```

-   Response
    -   `200` if the port was open, `422` if closed

Blind Injection
---------------

-   Don't have the full response available
    -   Error messages are also turned off
-   Submit "true/false" queries to the application and observe how the
    application reacts
    -   Ex: Is this port open? `200` if yes, `422` if no
    -   Items to observe
        -   Response codes, computation times, etc.
-   Whitelisting output would be incredibly difficult
    -   Focus energy on whitelisting input

Course Takeaways
----------------

-   Given limited time, whitelisting input is more valuable than
    whitelisting output
-   Recap: Execution contexts of `userDefinedUrl`
    -   shell context
        -   Ex: Syntactic injection risk
    -   curl context
        -   Ex: Semantic injection risk
            -   SSRF
    -   javascript context
        -   Coming soon :)
-   For every unique execution context, we must
    -   Evaluate syntactic and semantic injection risks
    -   Evaluate injection risks within the overarching environment

Next Steps
----------

-   Additional assignments:
    -   Look for SSRF within a codebase's
        -   Webhook functionality
        -   File upload functionality
            -   Does the API accept a URL instead of a file?
            -   View `Additional Resources` for hackerone vulnerability
                -   Make sure to review photo attachments for context
-   Review links below video
    -   Additional resources
        -   Specific to other languages
        -   Ability to explore more in-depth

Error Log
---------

-   None so far :)

Additional Resources
--------------------

-   Please submit a PR with any additional resources

### Referenced In Tutorial

-   <https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-metadata.html>
-   <https://hackerone.com/reports/263169>
    -   New Relic Webhook Blind SSRF
-   <https://hackerone.com/reports/713>
    -   Image upload SSRF

### General

-   [SSRF Bible.
    Cheatsheet](https://docs.google.com/document/d/1v1TkWZtrhzRLy0bYXBcdLUedXGb9njTNIJXa3u9akHM)
-   <https://github.com/cujanovic/SSRF-Testing>
-   <https://github.com/swisskyrepo/PayloadsAllTheThings/tree/master/SSRF%20injection>
-   <https://www.hackerone.com/blog-How-To-Server-Side-Request-Forgery-SSRF>
-   [Shopify SSRF Example](https://hackerone.com/reports/223203)

### Java

-   <https://shiftordie.de/blog/2017/02/18/smtp-over-xxe/>

### Javascript

-   <https://www.blackhat.com/docs/us-17/thursday/us-17-Tsai-A-New-Era-Of-SSRF-Exploiting-URL-Parser-In-Trending-Programming-Languages.pdf>
    -   Slides 39 - 47

### Ruby

-   <https://github.com/bcoles/ssrf_proxy>

### PHP

-   <https://www.blackhat.com/docs/us-17/thursday/us-17-Tsai-A-New-Era-Of-SSRF-Exploiting-URL-Parser-In-Trending-Programming-Languages.pdf>
    -   Slides 25 - 31

### Python

-   <http://blog.orange.tw/2017/07/how-i-chained-4-vulnerabilities-on.html>

Knowledge Dependency Tree
-------------------------

-   [Injection Fundamentals: What Is
    Injection?](https://github.com/SecuringTheStack/tutorials/blob/master/injection-fundamentals-1/readme.md#injection-fundamentals-what-is-injectionv)
    -   [Intro](https://github.com/SecuringTheStack/tutorials/blob/master/injection-fundamentals-1/readme.md#intro)
    -   [What Is
        Injection?](https://github.com/SecuringTheStack/tutorials/blob/master/injection-fundamentals-1/readme.md#what-is-injection)
    -   [Inject The Shell Context
        (Assignment)](https://github.com/SecuringTheStack/tutorials/blob/master/injection-fundamentals-1/readme.md#inject-the-shell-context-assignment)
    -   [Inject The Shell Context
        (Answer)](https://github.com/SecuringTheStack/tutorials/blob/master/injection-fundamentals-1/readme.md#inject-the-shell-context-answer)
    -   [Inject The Shell Context
        (Takeaways)](https://github.com/SecuringTheStack/tutorials/blob/master/injection-fundamentals-1/readme.md#inject-the-shell-context-takeaways)
    -   [Syntactic
        Injection](https://github.com/SecuringTheStack/tutorials/blob/master/injection-fundamentals-1/readme.md#syntactic-injection)
    -   [Evaluating Execution
        Contexts](https://github.com/SecuringTheStack/tutorials/blob/master/injection-fundamentals-1/readme.md#evaluating-execution-contexts)
    -   [Next
        Steps](https://github.com/SecuringTheStack/tutorials/blob/master/injection-fundamentals-1/readme.md#next-steps)
