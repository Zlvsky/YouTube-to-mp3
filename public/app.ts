const input = document.getElementById('link') as HTMLInputElement,
      submit = document.getElementById('Convert') as HTMLButtonElement,
      addButton = document.getElementById('add') as HTMLButtonElement,
      count = document.getElementById('counts') as HTMLSpanElement;

import { checkIfVideoIdValid, convertLinkToId } from "./tools/Validator.js";
var downloadData: any;
var counting = 0;

const fetchMp3Links = async (videoId: string) => {
    const dataToParse = {videoId: videoId};
    const res = await fetch("/convert-yt-mp3", {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(dataToParse)
  });
    const downloadData = await res.json();

    return downloadData;
  }

const handleAddLink = async () => {
  const youtubeLink = input.value;
  const videoIdData = convertLinkToId(youtubeLink);
  if (videoIdData.status === "success") {
    const videoId = videoIdData.videoId;
    console.log(videoId);
    
    downloadData = await fetchMp3Links(videoId);
  }
}

if (addButton != null) {
  addButton.onclick = () => {
    if (input != null) {
      handleAddLink();
      input.value = ''
      counting++;
      count.innerHTML = `${counting}`;
    }
  }
}



const autoDownloadMp3 = (): void => {
  const downloadElement = document.createElement("a");
  downloadElement.href = downloadData.link;
  document.body.appendChild(downloadElement);
  downloadElement.click();
  document.body.removeChild(downloadElement);
} 

submit.onclick = async () => {
  counting = 0;
  count.innerHTML = `${counting}`;

  console.log("1.", downloadData);
  
  autoDownloadMp3();
  
  downloadData = {};
}
