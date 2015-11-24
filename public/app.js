var cardsArray = [];
var testInc = 0;
var totalFlipped= 0; //keep track of those flipped cards!
var urls=[]; //allows being being to compare image urls later

var Card = function(image, containerElement) {

  this.isFlipped = false; // is our card flipped?
  this.image = image; // image url
  this.containerElement = containerElement; // dom element to place button
  this.button = $('<div>');

  // $(this.button).html('&nbsp;');
  $(this.button).addClass('card-button');


  this.toggleFlip = function() {
    var itself = this; // pointer variable for context
    if (itself.isFlipped == false) {
      // our card is NOT flipped
      // code to visually show
      //$('#divID').css("background-image", "url(/myimage.jpg)");
      $(itself.button).css('background', 'url(' + itself.image + ') no-repeat center');
      // then set and update status of isFlipped
      itself.isFlipped = true;
      totalFlipped += 1;
      // make a fuction that loops through cardsArray
      // checks to see if ones with the same image is flipped
      //
    } else {
      // our card IS flipped...
      // code to visually hide
      $(itself.button).css('background-image', 'none');
      // toggle back state of isFlipped
      itself.isFlipped = false;

    }

  };

  this.initialize = function() {
    var itself = this; // pointer variable for context
    var container = itself.containerElement; // container shorthand
    $(container).append(itself.button); // place button

    $(itself.button).on('click', function() {
      itself.toggleFlip();
      pickCard();
      urls.push(itself.image);
      console.log(urls);
      matchCard(itself);
    });
  }

  this.initialize();

};
//picking a card- made sure card is flipped and checking if imgs(urls) are the same
  function pickCard(){
    //prompt to pick a second card
    if (totalFlipped == 1){
       $('#sidebar').append('<li>Pick a second card...</li>');
    }
    else{
      console.log(totalFlipped);
    }
  };

function matchCard(itself){
  if (totalFlipped == 2 && urls[0]== urls[1]) {

    $('#sidebar').append('<li>Well done, keep going!</li>');
  }if (totalFlipped ==2 && urls[0]!=urls[1]){
    itself.toggleFlip();
  }else {
    console.log('pick another card');
  };
}

var imageArray = [
  {
    url: 'http://i.imgur.com/ESJCSDy.jpg',
    uses: 0
  },
  {
    url: 'http://i.imgur.com/vYZ0xPY.jpg',
    uses: 0
  },
  {
    url: 'http://i.imgur.com/PgQ3QUI.jpg',
    uses: 0
  },
  {
    url: 'http://i.imgur.com/Ui0nInz.jpg',
    uses: 0
  },
  {
    url: 'http://i.imgur.com/aDHtdOB.jpg',
    uses: 0
  },
  {
    url: 'http://i.imgur.com/GGXiEcZ.jpg',
    uses: 0
  },
  {
    url: 'http://i.imgur.com/E1WNg5a.jpg',
    uses: 0
  },
  {
    url: 'http://i.imgur.com/3rhPY29.jpg',
    uses: 0
  }
];
//play/reset button function
$(document).ready(function() {
   $('#button').click(function() {
    $('#sidebar').append('<li>Select a card!</li>');
    for (var i = 0; i < cardsArray.length; i++) {
      var c = cardsArray[i];
      c.isFlipped = true;
      c.toggleFlip();
      }
  });


// declare dragons array of items
var dragons = $('.item');

// loop through to grab an image out of our list of them
for (var i = 0; i < imageArray.length; i++) {
  // select our image
  var img = imageArray[i];
  // look for two .item
  checkItemIfAvailable(img.url);
  checkItemIfAvailable(img.url);
}
function checkItemIfAvailable(imageUrl) {
  // check for button (As a child)
  // can be checked by calling $('.item').children('button')
  // if this selector.length > 0
  // it is free
  // else it is not
  // and then repeat
  var randomItem = dragons[Math.floor(Math.random() * dragons.length)];
  var doesThisItemHaveAButton = $(randomItem).children('.card-button').length;
  if (doesThisItemHaveAButton < 1) {
    // add the button :)
    cardsArray.push(new Card(imageUrl, $(randomItem)));
    testInc++;
    console.log(testInc);
  } else {
    // recursively call back and try again
    checkItemIfAvailable(imageUrl); // ruth it bugged here
    // because I kept forgetting to pass in an argument for imageURL
  }
}

//ending the game- all cards are gone
// prompt to play again
function endGame(imageArray) {
// if all remaining images are hidden
 if  ($('.item').children(':visible').length === 0);
$('.sidebar').append('<li>Congratulations, you\'re a winner! Play again?</li>');
}

});
