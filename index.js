const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
const socketIO = require('socket.io');
const app = express();
const jwtsecret = 'KOKO';

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
  password: 'admin',
  token: '1A2b3C4d5E6f7G8h9IAgBKClD'
};

app.use(cors());
const jwt = require('jsonwebtoken');
const urlencodedParser = bodyParser.urlencoded({extended: false});
// support parsing of application/json type post data
app.use(bodyParser.json());
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));
app.post('/api/auth', urlencodedParser, (req, res, next) => {

  if (req.body.login === user.login && req.body.password === user.password ) {
    jwt.sign( req.body.login, jwtsecret, (err, token)=> {
      res.json({
        status: true,
        token: token
      });
    });
  } else {
    res.json({
      status: false,
      message:'Login or password is invalid'
    });
  }
});
app.post('/api/debts', urlencodedParser, (req, res, next) => {
  dataArray.push(req.body);
  res.status(201).json(req.body);
});
app.get('/api/debts', function (req, res) {
  // jwt.verify(req.headers.authorization, jwtsecret, (err, decode) => {
  //   console.log(decode);
  // });
  if(req.headers.authorization === user.token) {
    res.json(dataArray);
  } else {
    res.end();
  }
});
app.delete('/api/debts/:id', urlencodedParser, (req, res, next) => {

  const newArr = dataArray.filter(( obj ) => {
    return obj !== req.body;
  });
  dataArray = newArr;
  res.status(204).end();
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});


