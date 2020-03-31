const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

let dataArray = [{
    name: 'Aleksey',
    amount: '5000',
    date: '20-20-33'
  },
  {
    name: 'Semen',
    amount: '2000',
    date: '2-22-33'
  },
  {
    name: 'Oleg',
    amount: '1200',
    date: '3-3-33'
  }];
const user = {
  login: 'admin',
  password: 'admin'
};

app.use(cors());
const urlencodedParser = bodyParser.urlencoded({extended: false});
// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));
app.post('/api/auth', urlencodedParser, (req, res, next) => {


  if (req.body.login === user.login && req.body.password === user.password ) {
    res.send(true);
  } else {
    res.send(false);
  }
});
app.post('/api/debts', urlencodedParser, (req, res, next) => {
  dataArray.push(req.body);
  res.status(201).json(req.body);
});
app.get('/api/debts', function (req, res) {
  res.json(dataArray);
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
