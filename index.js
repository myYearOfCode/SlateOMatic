const express = require('express');
const path = require('path');

const app = express();

// serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// an api endpoint that returns a short list of items
app.get('/api/getList', (req,res) => {
  var list = ["item1", "item2", "item3"];
  res.json(list);
  console.log('sent list of items');
});

// handles any requests that don't match the ones above
app.get('*', (req,res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);


var fs = require('fs')
  , gm = require('gm');

console.log('hello')



gm( __dirname + '/test/Black.png')

  // .blur(8, 4)
  .fontSize(30)
  .fill("#FFF")
  // .drawRectangle(0,0,1920, 1080)
  // .gravity('SouthEast')
  // .drawText(983, 325, "client")
  // .drawText(983, 375, "agency")
  // .drawText(983, 445, "title")
  // .drawText(983, 646, "runtime")
  // .drawText(983, 645, "isci")
  // .drawText(183, 100, "date")
  // labels
  // .stroke("#efe", 2)
  .region(900,1080,800,0)
  .gravity('East')
  .drawText(802, 325, "client")
  .drawText(802, 375, "agency")
  .drawText(802, 445, "title")
  .drawText(802, 646, "runtime")
  .drawText(802, 700, "isci")
  .noProfile()
  .write(__dirname + '/test/text.png', function text (err) {
    if (err) console.log(err);
  });

console.log('hello')
//
