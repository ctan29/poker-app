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
    this.activePlayers = []; // DONE, WAITING
    this.bigBlindIndex = 0; // The big blind acts FIRST
    this.blindsValue = 10;
    this.roundCount = 1;
    this.potChips = 0;
    this.timeLimit = 0;
  }

  startGame() {
    // SHUFFLE CARDS, REMOVE PLAYER EXISTING CARDS?

    // Big blind starts first, filter out players with no chips
    this.activePlayers = this.playersList
      .slice(this.bigBlindIndex)
      .concat(this.playersList.slice(0, this.bigBlindIndex))
      .filter((player) => player.hasChips())
      .map((player) => ({
        player: player,
        chipsInPot: 0,
        status: "WAITING",
      }));

    if (this.activePlayers < 2) {
      return "Not enough players to start game";
    }

    this.activePlayers.forEach((playerObj) => {
      playerObj.player.dealtCard = this.gameDeck.dealCard();
    });

    this.playerBet(this.activePlayers[0], this.blindsValue);

    this.playerBet(this.activePlayers[1], this.blindsValue / 2); // Small Blind

    // Betting round 1, start at small blind

    // Start to end
    this.moveDealer();
    this.gameDeck.resetCards();
  }

  bettingRound() {
    //
  }

  playerBet(playerObj, chips) {
    let chipsBet = playerObj.player.removeChips(chips);
    if (chipsBet <= chips) {
      playerObj.status = "DONE"; // Cannot bet further as no more chips
    }
    playerObj.chipsInPot += chipsBet;
    this.potChips += chipsBet;
  }

  moveDealer() {
    this.bigBlindIndex = (this.bigBlindIndex + 1) % this.playersList.length;
  }
}

class Player {
  constructor(id, chips) {
    this.playerId = id;
    this.chips = chips;
    this.playerCard = null;
  }

  set dealtCard(card) {
    this.playerCard = card;
  }

  // Add the amount of chips a player has
  addChips(chipDifference) {
    this.chips += chipDifference;
  }

  // Remove chips from player (returns actual amount removed)
  removeChips(chipDifference) {
    if (this.chips < chipDifference) {
      let remainingChips = this.chips;
      this.chips = 0;
      return remainingChips;
    } else {
      this.chips -= chipDifference;
      return chipDifference;
    }
  }

  hasChips() {
    return this.chips > 0;
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

var testGame = new Game(testDeck);

var testPlayer1 = new Player(1, 20);
var testPlayer2 = new Player(2, 20);
var testPlayer3 = new Player(3, 20);
var testPlayer4 = new Player(4, 20);
var testPlayer5 = new Player(5, 0);

testGame.playersList.push(testPlayer1);
testGame.playersList.push(testPlayer2);
testGame.playersList.push(testPlayer3);
testGame.playersList.push(testPlayer4);
testGame.playersList.push(testPlayer5);

//console.log(testDeck);
//console.log("hello");
//testDeck.shuffleCards();
//console.log(testDeck);

//console.log(testDeck.dealCard());
