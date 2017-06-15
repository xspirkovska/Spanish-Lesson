// Memory Game
// MIT License
// (c) 2017 Nikolina Spirkovska

var MemoryGame = (function() {
  var init = function(cards) {
    if(cards) {
      this.cards = [...cards, ...cards].sort(function() { return 0.5 - Math.random() });
      this.container = document.getElementById('cards');
      this.startButton = document.getElementById('startButton');
      this.counter = document.getElementById('counter');
      this.maxScore = 12;

      this.startButton.addEventListener('click', function(){
        this.classList.add('hidden');
        setup();
      });
    }
  }

  var setup = function() {
    updateMarkup(MemoryGame.container);
    addCards();
    addEventListeners();
  }

  var addCards = function() {
    for(let [index, value] of MemoryGame.cards.entries()) {
      let cardMarkup = `<a href="#" id="card${index}" class="card"><span class="hidden">${value}</span></a>`;
      MemoryGame.container.innerHTML += cardMarkup;
      MemoryGame.container.classList.remove('hidden');
    }
  }

  var revealAll = function() {
    let cards = document.querySelectorAll('.card');

    for(let card of cards) {
      card.firstChild.classList.remove('hidden');
    }
  }

  var addEventListeners = function() {
    let that = this,
    cards = document.querySelectorAll('.card');

    for(let card of cards) {
      let cardSelector = document.getElementById(card.id);

      cardSelector.addEventListener('click', function(e){
        e.preventDefault();
        handleClick(this);
      });
    }
  }

  var handleClick = function(card) {
    let flippedCards = '';

    card.classList.add('flipped');
    card.firstChild.classList.remove('hidden');
    flippedCards = document.querySelectorAll('.flipped');

    if (flippedCards.length === 2) {
      setTimeout(function () {
        compare(flippedCards[0], flippedCards[1]);
      }, 500);
    }
  }

  var compare = function(firstCard, lastCard) {
    if (firstCard.innerHTML === lastCard.innerHTML) {
      updateMarkup(firstCard);
      updateMarkup(lastCard);
      firstCard.classList.remove('flipped');
      lastCard.classList.remove('flipped');
      firstCard.classList.add('invisible');
      lastCard.classList.add('invisible');
      firstCard.removeAttribute('href');
      lastCard.removeAttribute('href');
      updateScore();
    } else {
      firstCard.classList.remove('flipped');
      lastCard.classList.remove('flipped');
      firstCard.firstChild.classList.add('hidden');
      lastCard.firstChild.classList.add('hidden');
    }
  }

  var updateMarkup = function(el, content) {
    let newContent = content ? content : ''
    el.innerHTML = newContent;
  }

  var updateScore = function() {
    let currentScore = MemoryGame.counter.value;
    MemoryGame.counter.value = ++currentScore;

    if (parseInt(MemoryGame.counter.value) === MemoryGame.maxScore) {
      restart();
    }
  }

  var restart = function() {
    MemoryGame.counter.setAttribute('value', '0');
    updateMarkup(MemoryGame.startButton, 'try again');
    updateMarkup(MemoryGame.container, '<div class="centered modal">YOU WON!</div>');
    MemoryGame.startButton.classList.remove('hidden');
  }

  return {
    init: init,
    setup: setup,
    updateMarkup: updateMarkup,
    restart: restart,
    revealAll : revealAll
  }
})();

// Initialize MemoryGame
var months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubure', 'noviembre', 'diciembre'];
MemoryGame.init(months);
