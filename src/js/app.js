console.log("Hellow");

const preview = document.querySelector(".buy");
const app = document.querySelector(".app");
const closeBtn = document.querySelector(".btn__close");

function openPreview(e) {
  if (e.target.closest(".book")) {
    preview.style.transform = "translateX(0)";
    app.removeEventListener("click", openPreview);
  }
}

function closePreview(e) {
  if (e.target.closest(".btn__close")) {
    preview.style.transform = "translateX(50rem)";
    app.addEventListener("click", openPreview);
  }
}

app.addEventListener("click", openPreview);
preview.addEventListener("click", closePreview);

////////////////////////////////////
// https://api.aniapi.com/v1/anime/11

// Load Anime
async function loadAnime() {
  try {
    // 1) Load Anime API
    const res = await fetch("https://api.aniapi.com/v1/anime/11");
    const data = await res.json();

    if (!res.ok) {
      throw new Error(`from API ${data.message} (${res.status})`);
    }

    let anime = {
      id: data.data.id,
      description:
        data.data.descriptions.en !== ""
          ? data.data.descriptions.en
          : data.data.descriptions.it,
      title:
        data.data.titles.en !== "" ? data.data.titles.en : data.data.titles.it,
      score: data.data.score,
      imageLink: data.data.cover_image,
      genres: data.data.genres,
      seasonYear: data.data.season_year,
      episodesCout: data.data.episodes_count,
    };

    // 2) Render anime
    const markup = `
      <div class="preview__book p-m">
        <div class="preview__book-top">
          <div class="preview__heading">
            <h1 class="heading heading__1 preview__book-title">${anime.title}</h1>
          </div>
          <svg class="btn btn__close icon">
            <use xlink:href="./src/img/sprite.svg#icon-plus"></use>
          </svg>
        </div>
        <div class="preview__book-mid m-t-m">
          <div class="preview__book-left m-r-s">
            <img src="${anime.imageLink}" alt="${anime.title}" class="preview__book-img">
          </div>
          <ul class="preview__book-right">
            <li class="preview__book-info price">
              price: <span class="light">42,500 </span>
            </li>
            <li class="preview__book-info category">
              category: <span class="light">educational </span>
            </li>
            <li class="preview__book-info year">
              year: <span class="light">${anime.seasonYear} </span>
            </li>
            <li class="preview__book-info pages">
              episodes: <span class="light">${anime.episodesCout} </span>
            </li>
            <li class="preview__book-info isbn">
              ISBN: <span class="light">9876545678987654 </span>
            </li>
            <li class="preview__book-info rate">
              rate: <span class="light">${anime.score}</span>
            </li>
          </ul>
        </div>
        <div class="preview__book-bottom m-t-m">
          <h5 class="preview__book-info prologue">Prologue:</h5>
          <p class="paragraph light">
          ${anime.description}
          </p>
        </div>
        <div class="preview__book-button m-t-b m-b-m">
          <button class="btn btn__download">Download / Buy</button>
        </div>
      </div>

    `;

    preview.insertAdjacentHTML("afterbegin", markup);
    console.log(anime);
  } catch (error) {
    console.log(error);
  }
}

loadAnime();
