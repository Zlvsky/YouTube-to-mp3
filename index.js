var YTMp3 = require("youtube-mp3-downloader");
// var ffmpeg = require('fluent-ffmpeg');
var path = require('path');
var ffmpegPath = path.basename("E:\\ffmpeg\\bin")
var express = require('express');
var app = express();

var YD = new YTMp3({
  "ffmpegPath": `ffmpeg`,        // FFmpeg binary location
    "outputPath": "mp3",    // Output file location (default: the home directory)
    "youtubeVideoQuality": "highestaudio",  // Desired video quality (default: highestaudio)
    "queueParallelism": 2,                  // Download parallelism (default: 1)
    "progressTimeout": 2000,                // Interval in ms for the progress reports (default: 1000)
    "allowWebm": false                      // Enable download from WebM sources
});

app.use(express.static(path.join(__dirname, "public")));

app.all('/', function(req, res) {
  res
    .status(200)
    .sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.listen(5000, function() {
  console.log('server up on localhost:5000');
});

app.get('/links/:linki', async (request, response) => {
  let parsedValues = [];
  parsedValues = request.params.linki.split(',');
  const arrlen = parsedValues.length;
    console.log(`Downloading ${arrlen} items...`);
  for(let i=0; i<arrlen; i++) {
    YD.download(parsedValues[i]);
  }
});
