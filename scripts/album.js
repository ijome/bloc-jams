//Example Album
var albumPicasso = {
  title: 'The Colors',
  artist: 'Pablo Picaso',
  label: 'Custom',
  year: '1881',
  albumArtUrl: 'assets/images/album_covers/01.png',
  songs:  [
    { title: 'Blue', duration: '4:26' },
    { title: 'Green', duration: '3:14' },
    { title: 'Red', duration: '5:01' },
    { title: 'Pink', duration: '3:21' },
    { title: 'Magenta', duration: '2:15' }
  ]
};
// Another Example Album
var albumMarconi = {
  title: 'The Telephone',
  artist: 'Guglielmo Macaroni',
  label: 'EM',
  year: '1909',
  albumArtUrl: 'assets/images/album_covers/20.png',
  songs: [
    { title: 'Hello, Operator?', duration: '1:01' },
    { title: 'Ring, ring, ring', duration: '5:01' },
    { title: 'Fits in your pocket', duration: '3:21' },
    { title: 'Can you hear me now?', duration: '3:14' },
    { title: 'Wrong phone number', duration: '2:15' }
  ]
};

var albumCaine = {
  title: 'Darkest Before Dawn: The Prelude',
  artist: 'King Push',
  label: 'Good Music',
  year: '2015',
  albumArtUrl: 'https://i.scdn.co/image/6318de5a856a793163e217f23e6168450c57211d',
  songs: [
    { title: 'BLOW', duration: '2:18' },
    { title: 'DDA', duration: '4:01' },
    { title: 'H.G.T.V', duration: '2:08' },
    { title: 'Sunshine (feat. Jill Scott)', duration: '4:21' },
    { title: 'Crutches, Crosses, Caskets', duration: '3:03' }
  ]
};
//Table template for album song line items (eg. songNumber, songName, songLength)
var createSongRow = function(songNumber, songName, songLength) {
  var template =
    '<tr class="album-view-song-item">'
  + '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
  + '  <td class="song-item-title">' + songName + '</td>'
  + '  <td class="song-item-duration">' + songLength + '</td>'
  + '</tr>'
  ;

  return template;
};
// global capture variables
var albumTitle = document.getElementsByClassName('album-view-title')[0];
var albumArtist = document.getElementsByClassName('album-view-artist')[0];
var albumReleaseInfo = document.getElementsByClassName('album-view-release-info')[0];
var albumImage = document.getElementsByClassName('album-cover-art')[0];
var albumSongList = document.getElementsByClassName('album-view-song-list')[0];
// when called, sets current album view and with all of the relevant elements: album title, artist, release year, label, album art, and song list
var setCurrentAlbum = function(album) {

  albumTitle.firstChild.nodeValue = album.title;
  albumArtist.firstChild.nodeValue = album.artist;
  albumReleaseInfo.firstChild.nodeVaule = album.year + ' ' + album.label;
  albumImage.setAttribute('src', album.albumArtUrl);

  albumSongList.innerHTML = '';

  for (var i = 0; i < album.songs.length; i++) {
    albumSongList.innerHTML += createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
  }
};
// Finds and element w/ a specific classname, then returns the parent element
var findParentByClassName = function(element, targetClass) {
  if (element) {
    var currentParent = element.parentElement;
    while (currentParent.className !== targetClass && currentParent.className !== null) {
      currentParent = currentParent.parentElement;
    }
    return currentParent;
  }
    if (currentParent.className !== targetClass) {
    console.log("No parent found with that class name");
  } else if (currentParent === null) {
    console.log("No parent found");
  }
};
//Accepts an element and returns that element w/ .song-item-number class
var getSongItem = function(element) {
  switch(element.className) {
    case 'album-song-button':
    case 'ion-play':
    case 'ion-pause':
      return findParentByClassName(element, 'song-item-number');
    case 'album-view-song-item':
      return element.querySelector('.song-item-number');
    case 'song-item-title':
    case 'song-item-duration':
      return findParentByClassName(element, 'album-view-song-item').querySelector('.song-item-number')
    case 'song-item-number':
      return element;
    default:
      return;
  }
};

//Handles behavior when play/pause button is clicked
var clickHandler = function (targetElement) {

  var songItem = getSongItem(targetElement);

  if (currentlyPlayingSong === null) {
    songItem.innerHTML = pauseButtonTemplate;
    currentlyPlayingSong = songItem.getAttribute('data-song-number');
  } else if (currentlyPlayingSong === songItem.getAttribute('data-song-number')) {
    songItem.innerHTML = playButtonTemplate;
    currentlyPlayingSong = null;
  } else if (currentlyPlayingSong !== songItem.getAttribute('data-song-number')) {
    //sets data attribute data-song-number = to currentlyPlayingSong and places it a new var currentlyPlayingSongElement
    var currentlyPlayingSongElement = document.querySelector('[data-song-number="' + currentlyPlayingSong + '"]');
    //set currentlyPlayingSongElement's innerHTML to whatever data-song-number attribute is set to
    currentlyPlayingSongElement.innerHTML = currentlyPlayingSongElement.getAttribute('data-song-number');
    //sets the innerHTML of targetElement to pauseButtonTemplate
    songItem.innerHTML = pauseButtonTemplate;
    //sets currentlyPlayingSong to whatever data-song-number is set to at targetElement
    currentlyPlayingSong = songItem.getAttribute('data-song-number');
  }

};

var songListContainer = document.getElementsByClassName('album-view-song-list')[0];
var songRows = document.getElementsByClassName('album-view-song-item');

//Album Button templates
var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';

//Store state of playing songs
var currentlyPlayingSong = null;

window.onload = function() {
  setCurrentAlbum(albumPicasso);
//change song-item-number into a play button on mouseover
  songListContainer.addEventListener('mouseover', function(event) {
    if (event.target.parentElement.className === 'album-view-song-item') {
      var songItem = getSongItem(event.target);

      if (songItem.getAttribute('data-song-number') !== currentlyPlayingSong) {
        songItem.innerHTML = playButtonTemplate;
      }
    }
  });
//change play button back to song-item-number on mouseleave
  for (var i = 0; i < songRows.length; i++) {
    songRows[i].addEventListener('mouseleave', function(event) {
      var songItem = getSongItem(event.target);
      var songItemNumber = songItem.getAttribute('data-song-number');

      if (songItemNumber !== currentlyPlayingSong) {
        songItem.innerHTML = songItemNumber;
      }
    });

    songRows[i].addEventListener('click', function(event) {
      clickHandler(event.target);
    });
  }

  var albums = [albumPicasso, albumMarconi, albumCaine];
  var index = 1;
  albumImage.addEventListener("click", function(event) {
    setCurrentAlbum(albums[index]);
    index++;
    if (index == albums.length) {
      index = 0;
    }
  });
};
