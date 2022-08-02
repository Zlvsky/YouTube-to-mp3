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


const videoIdToLink = async (videoId: string): Promise<string> => {
  const fetchAPI = await fetch(`https://youtube-mp36.p.rapidapi.com/dl?id=${videoId}`, {
      "method": "GET",
      "headers": {
        "x-rapidapi-key": process.env.API_KEY,
        "x-rapidapi-host": process.env.API_HOST
        }
    });

  const fetchResponse = await fetchAPI.json();

  if (fetchResponse.status === "ok") {
        return(fetchResponse.link);
  } else {
        console.log(fetchResponse.msg);
  }
}

const generateLinks = async (array: Array<string>) => {
  const generatedLinks: Array<string> = [];

  for (const videoId of array) {
    const videoLink: string = await videoIdToLink(videoId);
    generatedLinks.push(videoLink);
  }
  
  return generatedLinks;
}

app.post("/convert-yt-mp3", async (req: Request, res: Response) => {
  const multipleVideos = await req.body;
  
  const downloadLinks = await generateLinks(multipleVideos);
  
  res.send(JSON.stringify(downloadLinks));
  
})
