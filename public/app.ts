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
submit.onclick = async () => {
  counting = 0;
  count.innerHTML = `${counting}`;

  // const xhr = new XMLHttpRequest();
  // xhr.open("POST" ,"convert-yt-mp3", true);
  // xhr.setRequestHeader("Content-Type", "application/json");
  // const videosIdData = JSON.stringify(multipleVideos)
  // xhr.send(videosIdData);

  const fetchMp3Links = async () => {
    const res = await fetch("/convert-yt-mp3", {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(multipleVideos)
  });
  const body = await res.json();
  console.log(body);
  

  }

  const data = await fetchMp3Links();

  // fetch("/convert-yt-mp3", {
  //   method: 'POST',
  //   headers: {
  //     "Content-Type": "application/json"
  //   },
  //   body: JSON.stringify(multipleVideos)
  // })
  // .then(res => res.json())
  // .then((res) => {
  //   if(res.ok) {
  //     console.log(res.data);
  //   }
  // })
  multipleVideos = [];
}
