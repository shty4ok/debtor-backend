const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const jwt = require('jsonwebtoken');

const jwtsecret = 'KOKO';
const urlencodedParser = bodyParser.urlencoded({extended: false});

let dataArray = [{
    id: 1,
    name: 'Aleksey',
    amount: '5000',
    date: '20-20-33'
  },
  {
    id: 2,
    name: 'Semen',
    amount: '2000',
    date: '2-22-33'
  },
  {
    id: 3,
    name: 'Oleg',
    amount: '1200',
    date: '3-3-33'
  }];

const user = {
  login: 'admin',
  password: 'admin'
};
app.use(cors());
// support parsing of application/json type post data
app.use(bodyParser.json());
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/api/auth', urlencodedParser, (req, res, next) => {
  if (req.body.login === user.login && req.body.password === user.password ) {
    jwt.sign( {login: req.body.login}, jwtsecret, (err, token)=> {
      res.status(200).json({
        status: true,
        token: token
      });
    });
  } else {
    res.status(401).json({
      status: false,
      message:'Login or password is invalid'
    });
  }
});

app.post('/api/debts', urlencodedParser, (req, res, next) => {
  jwt.verify(req.headers.authorization, jwtsecret, (err, decode) => {
    if (decode.login === user.login) {
      dataArray.push(req.body);
      res.status(200).json(req.body);
    } else {
      res.status(401).end();
    }
  });
});
app.get('/api/debts', function (req, res) {
  jwt.verify(req.headers.authorization, jwtsecret, (err, decode) => {
    if (decode.login === user.login) {
      res.status(200).json(dataArray);
    } else {
      res.status(401).end();
    }
  });
});

app.delete('/api/debts/:id', urlencodedParser, (req, res, next) => {
  jwt.verify(req.headers.authorization, jwtsecret, (err, decode) => {
    if (decode.login === user.login) {
      const newArr = dataArray.filter(( obj ) => {
        return (obj.id !== JSON.parse(req.params.id));
      });
      dataArray = newArr;
      res.status(204).json(dataArray);
    } else {
      res.status(401).end();
    }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');

