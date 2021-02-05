class Card {
  constructor(value, suit) {
    this.value = value;
    this.suit = suit;
  }
}

class Deck {
  constructor(deck) {
    this.deck = deck;
    this.usedCards = [];
  }

  // Returns a card
  dealCard() {
    var topCard = this.deck.pop();
    this.usedCards.push(topCard);
    return topCard;
  }

  // Shuffles unused cards in place (Fisher-Yates shuffle)
  shuffleCards() {
    let j;
    for (let i = this.deck.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      [this.deck[j], this.deck[i]] = [this.deck[i], this.deck[j]];
    }
  }
}

class Game {
  constructor() {
    //
  }
}

class Player {
  constructor() {
    //
  }
}

// Creation of a 3 suit deck
const SUITS = ["Rock", "Paper", "Scissors"];
var normalDeck = [];
for (let i = 0; i < SUITS.length; i++) {
  for (let j = 2; j <= 10; j++) {
    normalDeck.push(new Card(j, SUITS[i]));
  }
}

console.log(normalDeck);

var testCard = new Card(10, "jack");
var testDeck = new Deck(normalDeck);

//console.log(testDeck);
//console.log("hello");
//testDeck.shuffleCards();
//console.log(testDeck);

console.log(testDeck.dealCard());
