const express = require('express');
const path = require('path');

const app = express();
//// TODO:
// make a form to input the data
  // make a layout that has a sidepane with the form, a preview of the slate
  // and a download button.
// make a few image/layout templates
// think about charging and pricing
  // excel upload, batch download (zipped) and ability to update old slates
  // are premium features
// daily limit? probably not.



// serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/public')));
app.use(express.static(path.join(__dirname, 'slates')));
app.use(express.static(path.join(__dirname, 'style')));

console.log(path.join(__dirname, 'style'));

// an api endpoint that returns a short list of items
app.get('/api/getList', (req,res) => {
  var list = ["item1", "item2", "item3"];
  res.json(list);
  console.log('sent list of items');
});

app.get('/form',(req,res) => {
  res.sendFile(path.join(__dirname+'/form.html'));
})

app.get('/draw*', (req,res) => {
// http://localhost:5000/draw?client=hill%20of%20beans&agency=none&isci=fna200009182&runtime=3:00&title=No%20Bad%20Days&date=20181212
  // draw(req.query)
  console.log(req.query);
  // res.send(req.query);
  let filepath=draw(req.query);
  setTimeout( () => {res.sendFile(filepath)},1000);
});

// handles any requests that don't match the ones above
app.get('*', (req,res) => {
  res.sendFile(path.join(__dirname+'/client/src/index.js'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);


var fs = require('fs')
  , gm = require('gm');

console.log('hello')

let draw = (query) => {

  let client = query.client || ""
  let agency = query.agency || ""
  let title = query.title || ""
  let isci = query.isci || ""
  let runtime = query.runtime || ""
  let date = query.date || ""
  let filename = (__dirname + `/slates/${isci}.png`)
  gm( __dirname + '/test/Black.png')
    // .blur(8, 4)
    .fontSize(30)
    .fill("#FFF")
    // .gravity('SouthEast')
    .drawText(983, 325, client)
    .drawText(983, 375, agency)
    .drawText(983, 445, title)
    .drawText(983, 646, runtime)
    .drawText(983, 700, isci)
    .drawText(1683, 100, date)
    // labels
    // .stroke("#efe", 2)
    // .region(0,0,200,1080)
    .gravity('NorthEast')
    // .drawRectangle(0,0,500)
    .drawText(1002, 325, "client:")
    .drawText(1002, 375, "agency:")
    .drawText(1002, 445, "title:")
    .drawText(1002, 646, "runtime:")
    .drawText(1002, 700, "isci:")
    .noProfile()
    // check for previous versions of slate here.
    // what to do if they exist?
    .write(filename, function text (err) {
      if (err) console.log(err);
    })
    return filename
}

//
