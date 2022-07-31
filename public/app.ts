const input = document.getElementById('link') as HTMLInputElement,
      submit = document.getElementById('Convert') as HTMLButtonElement,
      addButton = document.getElementById('add') as HTMLButtonElement,
      count = document.getElementById('counts') as HTMLSpanElement;

var multipleVideos: Array<string> = [];
var counting = 0;
var firstReg = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/gi;
var secondReg = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;

if (addButton != null) {
  addButton.onclick = () => {
    if (input != null) {
      const inputValue = input.value;
      const preID = inputValue.match(firstReg).toString();
      const finalID = preID.match(secondReg)[7];
      multipleVideos.push(finalID);
      input.value = ''
      counting++;
      count.innerHTML = `${counting}`;
    }
  }
}

const fetchMp3Links = async () => {
    const res = await fetch("/convert-yt-mp3", {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(multipleVideos)
  });
    const downloadLinks = await res.json();

    return downloadLinks;
  }

const autoDownloadMp3 = (links: Array<string>): void => {
  links.forEach((downloadLink) => {
    const downloadElement = document.createElement("a");
    downloadElement.href = downloadLink;
    document.body.appendChild(downloadElement);
    downloadElement.click();
    document.body.removeChild(downloadElement);
  })
} 

submit.onclick = async () => {
  counting = 0;
  count.innerHTML = `${counting}`;

  const generatedLinks = await fetchMp3Links();
  autoDownloadMp3(generatedLinks);
  
  multipleVideos = [];
}
