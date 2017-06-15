// Memory Game
// MIT License
// (c) 2017 Nikolina Spirkovska

var MemoryGame = (function() {
  var init = function(cards) {
    if(cards) {
      this.cards = [...cards, ...cards].sort(function() { return 0.5 - Math.random() });
      this.container = document.getElementById('cards');
      this.startButton = document.getElementById('startButton');
      this.counter = document.querySelectorAll('.score .counter');

      $(MemoryGame.startButton).on('click', function() {
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
    for(let card of MemoryGame.cards) {
      let cardMarkup = `<article class="card"><p class="hidden">${card}</p></article>`;
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
    let that = this;

    $(document).off().on('click', '.card' , function() {
        let flippedCards = '';

        toggleClass(this, 'flipped');
        toggleClass(this.firstChild, 'hidden');
        flippedCards = document.querySelectorAll('.flipped');

        if (flippedCards.length === 2) {
            setTimeout(function () {
                compare(flippedCards[0], flippedCards[1]);
            }, 500);
        }
    });
  }

  var compare = function(firstCard, lastCard) {
      if (firstCard.innerHTML === lastCard.innerHTML) {
          updateMarkup(firstCard);
          updateMarkup(lastCard);
          firstCard.classList.remove('flipped');
          firstCard.classList.add('invisible');
          lastCard.classList.remove('flipped');
          lastCard.classList.add('invisible');
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
      let $counter = $(MemoryGame.counter);

      $counter.val(function(i, oldValue) {
          return ++oldValue;
      });

      if ($counter.val() === '12') {
        $counter.val(0);
        restart();
      }
  }

  var toggleClass = function(el, className) {
      if (!el.classList.contains(className)) {
          el.classList.add(className);
      } else {
          el.classList.remove(className);
      }
  }

  var restart = function() {
      updateMarkup(MemoryGame.startButton, 'RESTART GAME');
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
