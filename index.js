const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

app.use(cors());
const urlencodedParser = bodyParser.urlencoded({extended: false});
// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));
app.post('/api/auth', urlencodedParser, (req, res, next) => {
  const user = {
    login: 'admin',
    password: 'admin'
  };
  if (req.body.login === user.login && req.body.password === user.password ) {
    res.send(true);
  } else {
    res.send(false);
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
