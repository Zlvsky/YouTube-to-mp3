const input = document.getElementById('link'),
      submit = document.getElementById('Convert'),
      add = document.getElementById('add'),
      count = document.getElementById('counts');

var multipleVideos = [];
var counting = 0;
var firstReg = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/gi;
var secondReg = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;

add.onclick = () => {
  let inputval = input.value;
  let preID = inputval.match(firstReg).toString();
  let finalID = preID.match(secondReg)[7];
  multipleVideos.push(finalID);
  input.value = ''
  counting++;
  count.innerHTML = counting;
}
submit.onclick = () => {
  counting = 0;
  count.innerHTML = counting;

  const xhr = new XMLHttpRequest();
  xhr.open("POST" ,"convert-yt-mp3", true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.send(multipleVideos);

  // fetch("/convert-yt-mp3", {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: multipleVideos,
  // }).then((res) => {
  //   console.log("Request complete! response:", res);
  // });

  // (async () => {
  //     const linki = `links/${tablica}`;
  //     const response = await fetch(linki);
  //     // console.log(json);
  // })();
  multipleVideos = [];
}
