const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const jwt = require('jsonwebtoken');
const urlencodedParser = bodyParser.urlencoded({extended: false});

app.use(cors());
// support parsing of application/json type post data
app.use(bodyParser.json());
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/api/auth', urlencodedParser, (req, res, next) => {
  const user = {
    login: 'admin',
    password: 'admin',
    token: ''
  };

  if (req.body.login === user.login && req.body.password === user.password ) {
    jwt.sign( req.body.login, 'KOKO', (err, token)=> {
      this.user.token = token;
      console.dir(this.user.token);
      res.send(token);
    });
  } else {
    res.send(null);
  }
});
app.get('/api/data', (req, res) => {
  res.send('Hello');
})

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
