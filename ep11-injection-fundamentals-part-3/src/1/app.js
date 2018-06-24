// Warning: Be very careful while doing this assignment, it can stall your computer!
// Assignment 1: Set `userDefinedEmail` to `A` and note the time. Then, repeat with 3
// `A`s.  What pattern do you notice with the time?

// Assignment 2: Set `userDefinedEmail` to 18 `A`s and note the time. Then, repeat with 20
// `A`s.  What pattern do you notice with the time?

// Assignment 3: Approximately how many characters should we allow in `userDefinedEmail`?
// --------------------------------------------------------------------------------------
var userDefinedEmail= 'AAAAAAAAAAAAAAAAAA';
var whitelistRegex = /^([a-zA-Z0-9])(([\-.]|[_]+)?([a-zA-Z0-9]+))*(@){1}[a-z0-9]+[.]{1}(([a-z]{2,3})|([a-z]{2,3}[.]{1}[a-z]{2,3}))$/;
console.time('Email Regex Took');
var isValid = whitelistRegex.test(userDefinedEmail);
console.timeEnd('Email Regex Took');
// If isValid is false, halt execution of input

// Run: "EX_NUM=1 docker-compose up"
// File: "ep11-injection-fundamentals-part-3/src/1/app.js"
