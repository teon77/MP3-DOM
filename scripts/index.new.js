/**
 * Plays a song from the player.
 * Playing a song means changing the visual indication of the currently playing song.
 *
 * @param {Number} songId - the ID of the song to play
 */
function playSong(songId) {
    let songsEleArr = getSongElementsArray();   // gets array with the songs elements
    let songDuration = getElementDurationById(songId);
    let indexPlaying = getIndex(songId);
    songsEleArr.map(songEl =>{songEl.style.background="";   // removing theyre background
    });
                  /* making the clicked song "play" */
    const playingSong = document.getElementById(songId);
      playingSong.style.background = "linear-gradient(0deg, #7c7ae7 10%, #ffcccc 100%)";
      
                /* going to the next song when the original is over */
  
    setTimeout(() => {
      
        if(indexPlaying + 1 ===songsEleArr.length) {playSong(songsEleArr[0].id)}
        playSong(songsEleArr[indexPlaying + 1].id);
      }, (songDuration * 1000));
}

/**
 * Removes a song from the player, and updates the DOM to match.
 *
 * @param {Number} songId - the ID of the song to remove
 */
function removeSong(songId) {
       /* Remove from DOM */
       let y = document.getElementById(songId);
       y.style.animation = "aniRemove 1s ease 0s 1 normal forwards;"
       y.animate([
        // keyframes
        { transform: 'translateX(0px) translateY(0px)' },
        { transform: 'translateX(300px) translateY(300px)' },
        { transform: 'translateX(600px) translateY(600px)' },
        { transform: 'translateX(900px) translateY(900px)' }
      ], {
        // timing options
        duration: 3000,
        iterations: 1
      });
       setTimeout(()=>{
    y.remove();
  }, 3000)
      /* Remove from player Object */
      const originId = Number(songId.substring(4));    // gets the id in player.songs
       
    if(getById(player.songs,originId)===undefined) throw "non-existent ID";

      player.songs.splice(getById(player.songs,originId),1);  // removes 1 cell from the index

         for(let i = 0; i < player.playlists.length; i++){   // iterate through different playlists
             let index = player.playlists[i].songs.indexOf(originId); // finiding the index inside the array
             if(index!==-1) {player.playlists[i].songs.splice(index,1);}
             
    }
}

/**
 * Adds a song to the player, and updates the DOM to match.
 */
function addSong({title, album, artist, duration, coverArt }) {
       const newSong = {            // generate the new song
        id: generateId(player.songs),
        title: title,
        album: album,
        artist: artist,
        duration: convertToSeconds(duration),
        coverArt: coverArt
    };
             /*  creating the element and appending */
             alert(`You just created ${title} check him out at the bottom`)
    document.getElementById('songs').append(createSongElement(newSong));
    player.songs.push(newSong);
}

/**
 * Acts on a click event on an element inside the songs list.
 * Should handle clicks on play buttons and remove buttons of songs.
 *
 * @param {MouseEvent} event - the click event
 */
function handleSongClickEvent(event) {
      let arr = player.songs;
      for(let btn of arr){   // btn is used to get the button elements id's example: removeButton7
        if(event.target.id == `playbutton${btn.id}`) { playSong(`song${btn.id}`); }
        if(event.target.id == `removeButton${btn.id}`){ removeSong(`song${btn.id}`) }
        }
      }
/**
 * Handles a click event on the button that adds songs.
 *
 * @param {MouseEvent} event - the click event
 */
function handleAddSongEvent(event) {
             /* getting the inputted values */
   const titleIn = document.getElementsByName("title")[0];
   const albumIn = document.getElementsByName("album")[0];
   const artistIn = document.getElementsByName("artist")[0];
   const durationIn = document.getElementsByName("duration")[0];
   const coverartIn = document.getElementsByName("cover-art")[0];
                
                  /* sending to addSong */
    addSong({title: titleIn.value, album: albumIn.value, artist: artistIn.value, duration: durationIn.value,
    coverArt: coverartIn.value});

              /* clearing the input fields  */ 
    titleIn.value ='';
    albumIn.value ='';
    artistIn.value ='';
    durationIn.value ='';
    coverartIn.value ='';

}

/**
 * Creates a song DOM element based on a song object.
 */
function createSongElement({ id, title, album, artist, duration, coverArt }) {
    const titleEl = createElement("span",[`Title: ${title}`],[],{id:`title${id}`});
    const albumEl = createElement("span",[`Album: ${album}`],[],{id:`album${id}`});
    const artistEl = createElement("span",[`Artist: ${artist}`],[],{id:`artist${id}`});
    const durationEl = createElement("span",[`${showDuration(duration)}`],[],{id:`duration${id}`}); 

    const playButton = document.createElement("button");
          playButton.setAttribute("id",`playbutton${id}`);
          playButton.classList.add("buttons");
          playButton.textContent = "Play";
          
    const removeButton = document.createElement("button");
          removeButton.setAttribute("id",`removeButton${id}`);
          removeButton.classList.add("buttons");
          removeButton.textContent = "Remove";
          
    const buttonContaniner = createElement("div",[playButton,removeButton],["btnContainer"],{id:`container${id}`});
    const children = [displayImg(coverArt), titleEl, albumEl, artistEl,buttonContaniner, durationEl]
    const classes = ['songs']
    const attrs = {id:`song${id}`}
    const eventListeners = {}
    return createElement("div", children, classes, attrs, eventListeners)
}

/**
 * Creates a playlist DOM element based on a playlist object.
 */
function createPlaylistElement({ id, name, songs }) {
    const nameEl = createElement("span",[`Name: ${name}`],[],{id:`name${id}`});
    const durationEl = createElement("span",[showDuration(playlistDuration(id))],[],{id:`duration${id}`});
    const numSongEl = createElement("span",[`Number Of Songs: ${songs.length}`],[],{id:`${songs.length}`});
    const children = [nameEl,durationEl,numSongEl];
    const classes = ['playlists'];
    const attrs = {id: id};
    const eventListeners = {}
    return createElement("div", children, classes, attrs, eventListeners)
}

/**
 * Creates a new DOM element.
 *
 * Example usage:
 * createElement("div", ["just text", createElement(...)], ["nana", "banana"], {id: "bla"}, {click: (...) => {...}})
 *
 * @param {String} tagName - the type of the element
 * @param {Array} children - the child elements for the new element.
 *                           Each child can be a DOM element, or a string (if you just want a text element).
 * @param {Array} classes - the class list of the new element
 * @param {Object} attributes - the attributes for the new element
 * @param {Object} eventListeners - the event listeners on the element
 */
function createElement(tagName, children = [], classes = [], attributes = {}, eventListeners = {}) {
    const element = document.createElement(tagName);
            /*For children */ 
    children.forEach(child => {         
        const listItem = document.createElement(`div`);
        if(typeof child ==="string"){
        listItem.textContent = child;
        }
         else { listItem.appendChild(child)}
         element.appendChild(listItem);
    });
                /*For classes */
    classes.forEach(cl => element.classList.add(cl));

                /*For attributes */     
    for(const att in attributes){
        element.setAttribute(att,attributes[att]);
    }
 return element;
}


/**
 * Inserts all songs in the player as DOM elements into the songs list.
 */
function generatePlaylists() {
    for(let i = 0; i < player.playlists.length; i++){
        document.getElementById('playlists').append(createPlaylistElement(player.playlists[i]));
    }
}

/**
 * Inserts all playlists in the player as DOM elements into the playlists list.
 */
function generateSongs() {
    for(let i = 0; i < player.songs.length; i++){
        const newSong = createSongElement(player.songs[i])
        document.getElementById('songs').append(newSong);
         }
}
function displayImg(link){
    const image = document.createElement('img'); // creates new element
    image.src = `${link}`;                       // adding attributes
    image.alt = "Song Picture";
    image.classList.add("picture");              //adding class
    return image; 
} 

function playlistDuration(id) {
    try{
    let total = 0;
    const arr = getById(player.playlists,id).songs;
    for(let i = 0; i < arr.length; i++){
      total += getById(player.songs,arr[i]).duration; //getting the song duration from the property songs in player
    }
    return total;
  }
  catch {
     throw "There isn`t such Playlist";
  }
  }

 
  /*gets a song Element id and returning its duration in seconds from the player Object */
  function getElementDurationById(id){
    const originId = id.substring(4);
    return getById(player.songs,originId).duration;
}

function getSongElementsArray(){
    return  Array.from(document.querySelectorAll("div.songs"));
  
}

    /* gets a song element ID and returning it current position in the array */
function getIndex(songElId) {
let arr = getSongElementsArray()
for(let i = 0; i < arr.length; i++){
    if(arr[i].id===songElId){
        return(i);
    }
}
}

function showDuration(duration){ 
    try {
    let x = new Date(duration * 1000).toISOString().substr(14, 5);
    return x;
    }
    catch {
      throw "Please send this function a number"
    }
  } 

  function convertToSeconds(time){
    try {
    let timeArr = time.split(":");
    let seconds = timeArr[0]*60 + timeArr[1]*1;   //uses timeArr[i] as number 
    return seconds;
    }
    catch {
      throw "Please use the mm:ss Form as a String";
    }
  }

  function getById(arr,id) {
    try {
        for(let i of arr){
          if(i.id==id){
           return i;
        }
      }
        return undefined;
    }
    catch {
      throw "You should call this function with an array and an id of an item in that array";
    }
    }

    function generateId(arr) {
        let highestId = 0;
          for(let i=0;i<arr.length;i++){
            if(arr[i].id>highestId) highestId=arr[i].id;
          }
           return (highestId+1);   
        }     
      


// Creating the page structure
generateSongs()
generatePlaylists()

// Making the buttons actually do something
document.getElementById("add-button").addEventListener("click", handleAddSongEvent);
document.getElementById("songs").addEventListener("click", handleSongClickEvent);
