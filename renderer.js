require('velocity-animate');

global.store = {
  score: 0,
  orient: '',
  targetElement: null,
};

const $hitBox = $('.hit-box');
// const $score = document.querySelector('.score');
//
const startGame = () => {
  console.log('Game has started');
};

const updateOrient = (orient) => {
  global.store.orient = orient;

  return orient;
};

const determineOrientation = () => {
  const orientMapping = {
    1: "UP",
    2: "RIGHT",
    3: "DOWN",
    4: "LEFT",
  };

  const orientNum = Math.floor(Math.random() * (5 - 1)) + 1;
  const orient = updateOrient(orientMapping[orientNum]);

  return orient;
};

const funcDown = (element) => {
  const $el = $(element);

  switch (global.store.orient) {
    case "LEFT":
      $el.css("margin-left", "0px");
      break;
    case "DOWN":
      $el.css("margin-left", "100px");
      break;
    case "RIGHT":
      $el.css("margin-left", "300px");
      break;
    case "UP":
      $el.css("margin-left", "50px");
      break;
  }


  $el.animate({
    top: "+=830",
  }, 850);
};

// disply: none
// Event Listeners
const joBrain = (event) => {
  const imgPaths = ["LEFT.png", "UP.png", "RIGHT.png", "DOWN.png"];

  const joContainer = document.querySelector('.left-pane');
  joContainer.innerHTML = null;

  const imgNodes = imgPaths.filter((image) => {
    return image == `${event.toString()}.png`;
  }).map((image) => {
    const imgPrefix = "img/";
    const newImage = document.createElement('img');
    newImage.src = `${imgPrefix}${image}`;
    newImage.className = 'jo-fo-sho';
    joContainer.appendChild(newImage);
  });
};

const userInput = (event) => {
  const keyCodeMapping = {
    37: "LEFT",
    38: "UP",
    39: "RIGHT",
    40: "DOWN",
  };

  const oriented = global.store.orient === keyCodeMapping[event.keyCode];

  if (oriented) {
    global.store.oriented = oriented;
  }

  joBrain(keyCodeMapping[event.keyCode]);

  console.log(determineCollision(global.store.targetElement));
}

global.addEventListener('keyup', userInput);

const determineCollision = (element) => {
  const $el1 = $(element);
  var x1 = $el1.offset().left;
  var y1 = $el1.offset().top;
  var h1 = $el1.outerHeight(true);
  var w1 = $el1.outerWidth(true);
  var b1 = y1 + h1;
  var r1 = x1 + w1;
  var x2 = $hitBox.offset().left;
  var y2 = $hitBox.offset().top;
  var h2 = $hitBox.outerHeight(true);
  var w2 = $hitBox.outerWidth(true);
  var b2 = y2 + h2;
  var r2 = x2 + w2;

  if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;

  return true;
}
// Event Functions


const renderImage = (orient) => {
  const parentContainer = document.querySelector('.center-pane');
  const newImage = document.createElement('img');
  newImage.src = 'img/arrow.png';
  parentContainer.appendChild(newImage);
  newImage.className = `arrow-img orient-${orient}`;


  global.store.targetElement = newImage;

  return funcDown(newImage);
};

(function() {
  setTimeout(() => {
    renderImage(determineOrientation());
  }, 50);
})();
