const input = document.getElementById('link') as HTMLInputElement,
      submit = document.getElementById('Convert') as HTMLButtonElement,
      addButton = document.getElementById('add') as HTMLButtonElement,
      songName = document.getElementById('songName') as HTMLSpanElement,
      loading = document.getElementById("loadingScreen") as HTMLDivElement;

import { checkIfVideoIdValid, convertLinkToId, checkIfDownloadDataIsEmpty } from "./tools/Validator.js";
var downloadData = {link: '', title: ''};

const updateDownloadButton = (ableToDownload: boolean) => {
  if(ableToDownload === true) {
    submit.classList.remove("disactive");
  } else {
    submit.classList.add("disactive");
  }
}

const toggleLoading = () => {
  if(loading.classList.contains("loadingDisactive")) {
    loading.classList.remove("loadingDisactive");
    loading.classList.add("loadingActive");
  } else {
    loading.classList.remove("loadingActive");
    loading.classList.add("loadingDisactive");
  }
}

const fetchMp3Links = async (videoId: string) => {
    toggleLoading();
    const dataToParse = {videoId: videoId};
    const res = await fetch("/convert-yt-mp3", {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(dataToParse)
  });
    const downloadData = await res.json();
    toggleLoading();
    return downloadData;
  }

const handleAddLink = async () => {
  const youtubeLink = input.value;
  const videoIdData = convertLinkToId(youtubeLink);
  if (videoIdData.status === "success") {
    input.classList.remove("failed");
    const videoId = videoIdData.videoId;
    downloadData = await fetchMp3Links(videoId);
    updateDownloadButton(true);
    songName.textContent = downloadData.title;
  }
  if (videoIdData.status === "fail") {
    input.classList.add("failed");
  }
}


if (addButton != null) {
  addButton.onclick = () => {
    if (input != null) {
      handleAddLink();
      input.value = ''
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
  const isDataEmpty = checkIfDownloadDataIsEmpty(downloadData);
  if(!isDataEmpty) {
    autoDownloadMp3();
    downloadData = {link: '', title: ''};
    updateDownloadButton(false);
  }
}
