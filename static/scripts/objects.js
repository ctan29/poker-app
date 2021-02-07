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

  // Resets the deck to it's normal state
  resetCards() {
    let oldDeck = this.deck;
    this.deck = [...oldDeck, ...this.usedCards];
    this.usedCards = [];
    this.shuffleCards();
  }
}

class Game {
  constructor(deck) {
    this.gameDeck = deck;

    this.playersList = [];
    this.revealedCards = [];
    this.activePlayers = []; //?
    this.dealerIndex = 0;
    this.blindsValue = 0;
    this.roundCount = 1;
    this.potChips = 0;
  }

  startGame() {
    if (this.playersList < 2) {
      return "Not enough players to start game";
    }
  }
}

class Player {
  constructor(chips) {
    this.playerId = null;
    this.chips = chips;
    this.playerCard = null;
  }

  set dealtCard(card) {
    this.playerCard = card;
  }

  // Add or remove the amount of chips a player has
  set addRemoveChips(chipDifference) {
    this.chips += chipDifference;
  }

  //Call, Raise, Fold
}

// Creation of a 3 suit deck, starting at 2
const SUITS = ["Rock", "Paper", "Scissors"];
var normalDeck = [];
for (let i = 0; i < SUITS.length; i++) {
  for (let j = 2; j <= 10; j++) {
    normalDeck.push(new Card(j, SUITS[i]));
  }
}

console.log(normalDeck);

var testDeck = new Deck(normalDeck);

//console.log(testDeck);
//console.log("hello");
//testDeck.shuffleCards();
//console.log(testDeck);

console.log(testDeck.dealCard());
