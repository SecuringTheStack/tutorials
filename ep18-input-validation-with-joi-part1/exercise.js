const Joi = require('joi');

const schema = Joi.object()
  .keys({
    // Requires a given string value
    username: Joi.string()
      .alphanum()
      .min(3)
      .max(30)
      .required(),
    // Define password complexity requirements through regex (consider more complex regex)
    password: Joi.string()
      .regex(/^[a-zA-Z0-9]{3,30}$/)
      .required(),
    // Force passwords to match
    password_confirmation: Joi.any()
      .equal(Joi.ref('password'))
      .required(),
    // Accept different Joi types.  Optional, unconstrainted string or number
    access_token: [Joi.string(), Joi.number()],
    // Required birthyear to be an int between range
    birthyear: Joi.number()
      .integer()
      .min(1900)
      .max(2013)
      .required(),
    // Validate email address from example.com (remember spoofing considerations)
    email: Joi.string()
      .email()
      .regex(/example\.com$/),
    marketing_opt_out: Joi.boolean(),
    csrf_token: Joi.string()
      .guid({
        version: 'uuidv4',
      })
      .required(),
    sex: Joi.string()
      .equal(['M', 'F', 'MALE', 'FEMALE', 'DECLINE'])
      .required(),
    time: Joi.date()
      .timestamp('javascript'),
    roles: Joi.object()
      .keys(),
  })
  // email must be accompanied by marketing_opt_out
  .with('email', 'marketing_opt_out');

const result = Joi.validate({
  username: 'Ronald',
  password: 'McDonald',
  password_confirmation: 'McDonald',
  birthyear: 2010,
  email: 'bigron@example.com',
  marketing_opt_out: true,
  csrf_token: '6d4d8c14-ef12-45d9-ab3c-5dddf941fb76',
  sex: 'F',
  time: 1534942475121,
  roles: {},
}, schema);

// If result.error === null, payload is valid
console.log(`The validation error is: ${result.error}`);
