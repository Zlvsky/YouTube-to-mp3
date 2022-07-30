import path from "path";
import express, { Express, Request, Response } from 'express';
import fetch from 'node-fetch'
import 'dotenv/config'
const app: Express = express();
const port = process.env.PORT;


import { checkIfVideoIdValid } from './tools/Validator.js';

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());

app.all('/', function(req: Request, res: Response) {
  res
    .status(200)
    .sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.listen(port, function() {
  console.log(`server up on localhost${port}`);
});

app.post("/convert-yt-mp3", async (req: Request, res: Response) => {
  const data = await req.body;
  console.log(data);
  
  
  // const multipleVideos: Array<string> = req.body.multipleVideos;

  // multipleVideos.forEach( async (videoId) => {
  //   const isVideoValid = checkIfVideoIdValid(videoId);
  //   if (!isVideoValid) {
  //     return res.render("index", {success: false, message: "Please copy valid youtube link"});
  //   } else {
  //     console.log(videoId);
      
  //     const fetchAPI = await fetch(`https://youtube-mp36.p.rapidapi.com/dl?id=${videoId}`, {
  //     "method": "GET",
  //     "headers": {
  //       "x-rapidapi-key": process.env.API_KEY,
  //       "x-rapidapi-host": process.env.API_HOST
  //       }
  //   });
  //   }
  // })
})
