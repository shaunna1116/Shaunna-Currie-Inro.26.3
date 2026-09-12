const artworkURL = "https://api.artic.edu/api/v1/artworks?limit=36&fields=id,title,image_id";

const artworkTitles = document.getElementById('artwork-titles');
const artworkDetails = document.getElementById('artwork-details');
const artworkFrame = document.getElementById('artwork-frame');

const selectedArtworkTitle = document.getElementById('selected-artwork-title');
const detailsButton = document.getElementById('details-button');

const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');

let currentPage = 0;
let artworks = [];
let selectedArtworkId = null;


// ---------- DISPLAY 6 TITLES AT A TIME ----------

function displayTitles() {

    artworkTitles.innerHTML = '';

    const start = currentPage * 6;
    const end = start + 6;

    for (let i = start; i < end && i < artworks.length; i++) {

        const title = document.createElement('a');

        title.href = '#';
        title.dataset.id = artworks[i].id;
        title.textContent = artworks[i].title;

       title.addEventListener('click', function(event) {
        event.preventDefault();
        selectedArtworkId = artworks[i].id;

    selectedArtworkTitle.textContent = artworks[i].title;

    artworkDetails.classList.remove('show');
    detailsButton.textContent = 'Details';

    artworkFrame.innerHTML = '';

    if (artworks[i].image_id) {

        const imageUrl =
            `https://www.artic.edu/iiif/2/${artworks[i].image_id}/full/843,/0/default.jpg`;

        const image = document.createElement('img');

        image.src = imageUrl;
        image.alt = artworks[i].title;

        artworkFrame.appendChild(image);
    }
});

        artworkTitles.appendChild(title);
    }
}


// ---------- GET #1: GET 36 ARTWORKS ----------

fetch(artworkURL)
    .then(response => {

        if (!response.ok) {
            throw new Error('Could not load artwork list.');
        }

        return response.json();
    })
    .then(data => {

        artworks = data.data;

        displayTitles();
    })
    .catch(error => {

        console.error(error);
    });


// ---------- GET #2: GET SELECTED ARTWORK ----------

function showArtwork(artworkId) {

    const artworkDetailsURL =
        `https://api.artic.edu/api/v1/artworks/${artworkId}?fields=title,artist_display,date_display,medium_display,dimensions,description,image_id`;

    fetch(artworkDetailsURL)
        .then(response => {

            if (!response.ok) {
                throw new Error('Could not load artwork details.');
            }

            return response.json();
        })
        .then(data => {

            artworkDetails.innerHTML = '';

            selectedArtworkTitle.textContent = data.data.title;

            const artist = document.createElement('p');
            artist.textContent = 'Artist: ' + data.data.artist_display;

            const date = document.createElement('p');
            date.textContent = 'Date: ' + data.data.date_display;

            const medium = document.createElement('p');
            medium.textContent = 'Medium: ' + data.data.medium_display;

            const dimensions = document.createElement('p');
            dimensions.textContent = 'Dimensions: ' + data.data.dimensions;

            const description = document.createElement('p');
            description.textContent = data.data.description;

            artworkDetails.appendChild(artist);
            artworkDetails.appendChild(date);
            artworkDetails.appendChild(medium);
            artworkDetails.appendChild(dimensions);
            artworkDetails.appendChild(description);

            artworkDetails.classList.add('show');
            detailsButton.textContent = 'Hide Details';


            artworkFrame.innerHTML = '';


            if (data.data.image_id) {

                const imageUrl =
                    `${data.config.iiif_url}/${data.data.image_id}/full/843,/0/default.jpg`;

                const image = document.createElement('img');

                image.referrerPolicy = 'no-referrer';
                image.src = imageUrl;
                image.alt = data.data.title;

                artworkFrame.appendChild(image);
            }
        })
        .catch(error => {

            console.error(error);
        });
}


// ---------- NEXT: SHOW NEXT 6 TITLES ----------

nextButton.addEventListener('click', function() {

    if ((currentPage + 1) * 6 < artworks.length) {

        currentPage++;

        displayTitles();
    }
});


// ---------- PREVIOUS: SHOW PREVIOUS 6 TITLES ----------

prevButton.addEventListener('click', function() {

    if (currentPage > 0) {

        currentPage--;

        displayTitles();
    }
});

// ---------- DETAILS ----------

detailsButton.addEventListener('click', function() {

    if (selectedArtworkId === null) {
        return;
    }

    if (artworkDetails.classList.contains('show')) {

        artworkDetails.classList.remove('show');
        detailsButton.textContent = 'Details';

    } else {

        showArtwork(selectedArtworkId);
    }
});


