const giffy_apikey = 'wWx92OcSBAFLsLr3fE3paSblOf2i39yn';
const emoji_apikey = 'ddfde9339e25e1592e20e3e8fdc393f6d6388a5e';
const gifurl = 'api.giphy.com/v1/gifs/search';
const stickerurl = 'api.giphy.com/v1/stickers/search';

const trendingGifsUrl = 'api.giphy.com/v1/gifs/trending';
const trendingStickersUrl = 'api.giphy.com/v1/stickers/trending';

const form = document.getElementById('messageForm');

const currentViewContainer = document.querySelector('.current-view-container');
const mediaSearch = document.getElementById('mediaSearch');

const chatInteractionsMenu = document.getElementById('chatInteractionsMenu');

const menuTogglers = document.querySelectorAll('.menu-toggler');

const gifTogglers = document.querySelectorAll('.gif-toggler');
const stickerTogglers = document.querySelectorAll('.sticker-toggler');
const emojiTogglers = document.querySelectorAll('.emoji-toggler');

async function getTrendingGifs() {
    const response = await fetch(`https://${trendingGifsUrl}?api_key=${giffy_apikey}&limit=15`);
    const data = await response.json();
    let images = [...data.data.map(gif => gif.images.downsized.url)];
    images.forEach(img => {
        let image = document.createElement('img');
        image.src = `${img}.gif`;
        currentViewContainer.appendChild(image);
    });
}

async function getGif(query) {
    const response = await fetch(`https://${gifurl}?api_key=${giffy_apikey}&q=${query}&limit=15`);
    const data = await response.json();
    let images = [...data.data.map(gif => gif.images.downsized.url)];
    images.forEach(img => {
        let image = document.createElement('img');
        image.src = `${img}.gif`;
        currentViewContainer.appendChild(image);
    });
}

async function getTrendingStickers() {
    const response = await fetch(`https://${trendingStickersUrl}?api_key=${giffy_apikey}&limit=15`);
    const data = await response.json();
    let images = [...data.data.map(gif => gif.images.downsized.url)];
    images.forEach(img => {
        let image = document.createElement('img');
        image.src = `${img}.gif`;
        currentViewContainer.appendChild(image);
    });
}

async function getSticker(query) {
    const response = await fetch(`https://${stickerurl}?api_key=${giffy_apikey}&q=${query}&limit=15`);
    const data = await response.json();
    let images = [...data.data.map(gif => gif.images.downsized.url)];
    images.forEach(img => {
        let image = document.createElement('img');
        image.src = `${img}.gif`;
        currentViewContainer.appendChild(image);
    });
}

async function getEmoji() {
    const response = await fetch(`https://emoji-api.com/emojis?access_key=${emoji_apikey}`, {
        mode: 'no-cors'
    });
    const emojis = await response.json();
    console.log(emojis);
    let limit = 150;
    currentViewContainer.innerHTML = '';
    for (let i = 0; i < limit; i++) {
        // currentViewContainer.innerHTML += `<span data-emoji-name="" class="emoji">${emojis[i].character}</span>`
    }
}

function filterEmoji(query) {
    const emojis = document.querySelectorAll('.emoji');
    emojis.forEach(emoji => {
        if (emoji.getAttribute('emoji-name').includes(query)) {
            emoji.style.display = 'inline-block';
        } else {
            emoji.style.display = 'none';
        }
    });
}

getEmoji();


menuTogglers.forEach(toggler => {
    toggler.addEventListener('click', () => {
        toggleChatInteractionsMenu();
    })
});

gifTogglers.forEach(toggler => {
    toggler.addEventListener('click', () => {
        getTrendingGifs();
        handleActiveBtnClass();
        mediaSearch.setAttribute('data-media-type', 'gif');
        mediaSearch.placeholder = 'Search GIFs...';
        gifTogglers[1].classList.add('active');
        currentViewContainer.classList = 'current-view-container gif-view';
    });
});

stickerTogglers.forEach(toggler => {
    toggler.addEventListener('click', () => {
        getTrendingStickers();
        handleActiveBtnClass();
        mediaSearch.setAttribute('data-media-type', 'sticker');
        mediaSearch.placeholder = 'Search Stickers...';
        stickerTogglers[1].classList.add('active');
        currentViewContainer.classList = 'current-view-container sticker-view';
    });
});

emojiTogglers.forEach(toggler => {
    
    toggler.addEventListener('click', () => {
        for (let i = 0; i < 100; i++) {
            currentViewContainer.innerHTML += '<span class="filler"></span>';
        }
        handleActiveBtnClass();
        getEmoji();
        mediaSearch.setAttribute('data-media-type', 'emoji');
        mediaSearch.placeholder = 'Search Emojis...';
        emojiTogglers[1].classList.add('active');
        currentViewContainer.classList = 'current-view-container emoji-view';
    });
});

function handleActiveBtnClass() {
    menuTogglers.forEach(toggler => {
        toggler.classList.remove('active');
    });
}

function toggleChatInteractionsMenu() {
    mediaSearch.value = '';
    currentViewContainer.innerHTML = '';
    chatInteractionsMenu.classList.add('active');
}

form.addEventListener('submit', e => {
    e.preventDefault();
});


mediaSearch.addEventListener('keyup', e => {
    currentViewContainer.innerHTML = '';
    let type = mediaSearch.getAttribute('data-media-type');
    if (type === 'gif') {
        getGif(mediaSearch.value);
    } else if (type === 'sticker') {
        getSticker(mediaSearch.value);
    } else if (type === 'emoji') {
        filterEmoji(mediaSearch.value);
    }
});



