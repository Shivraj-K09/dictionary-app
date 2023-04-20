const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const query = document.querySelector(".searchWord");
const result = document.getElementById("result");
const sound = document.getElementById("sound");
const btn = document.getElementById("search-btn");

btn.addEventListener("click", () => {
    let inputWord = document.getElementById("input-word").value;
    fetch(`${url}${inputWord}`).then((response) => response.json()).then((data) => {
        console.log(data);
        result.innerHTML = `
        <div class="word">
            <h2>${inputWord}</h2>
            <button onclick="playSound()"><i class="uis uis-volume"></i></button>
        </div>
        <div class="details">
            <p>${data[0].meanings[0].partOfSpeech}</p>
            <p>/${data[0].phonetic}/</p>
        </div>
        <p class="word-meaning">
              ${data[0].meanings[0].definitions[0].definition}
        </p>
      <p class="word-example">
             ${data[0].meanings[0].definitions[0].example || ""}
      </p>`;
        // sound.setAttribute("src", `${data[0].phonetics[0].audio}`) || sound.setAttribute("src", `${data[0].phonetics[2].audio}`)
        if (data[0].phonetics[0].audio) {
            sound.setAttribute("src", data[0].phonetics[0].audio);
        } else if (data[0].phonetics[2].audio) {
            sound.setAttribute("src", data[0].phonetics[2].audio);
        }

    })
        .catch(() => {
            result.innerHTML = `
            <video  loop autoplay = "autoplay" class="gif" src = "img/sad-emoji.mp4" ></video >
                <h3 class="error">Well, it looks like our dictionary took the day off and forgot to tell us! Better luck next time, word searchers!.</h3>`;
        });

});

query.addEventListener("keyup", (event) => {
    if (event.keyCode === 13) {
        btn.click();
    }
});

function playSound() {
    sound.play();
}