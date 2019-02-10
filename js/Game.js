/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

 class Game {
     constructor() {
         this.missed = 0;
         this.phrases = this.createPhrases();
         this.activePhrase = null;
     }

     createPhrases() {
         return [
             new Phrase('take down'),
             new Phrase('get over'),
             new Phrase('hang up'),
             new Phrase('make up'),
             new Phrase('point out')
         ];
     }

     getRandomPhrase() {
        const phrases = this.phrases;
        return phrases[Math.floor(Math.random()*phrases.length)];
     }

     startGame() {
         document.querySelector("#overlay").style.visibility = "hidden";
         this.activePhrase = this.getRandomPhrase();
         this.activePhrase.addPhraseToDisplay();
     }

    /**
    * Checks for winning move
    * @return {boolean} True if game has been won, false if game wasn't
    won
    */  
    checkForWin() {
        let checker = true;
        document.querySelectorAll(".letter").forEach(element => {
            if(element.classList.contains('hide')) {
                checker = false;
            }
        });
        return checker;
    }

    removeLife() {
        document.querySelector('.tries > img[src="images/liveHeart.png"]')
        .src = "images/lostHeart.png";
        this.missed ++;
        if(this.missed > 4) {
            this.gameOver();
        }
    }

    gameOver(gameWon) {
        const screen = document.querySelector("#overlay");
        const message = document.querySelector('#game-over-message');
        if(gameWon) {
            screen.className = "win";
            message.innerText = "you Won";
        } else {
            screen.className = "lose";
            message.innerText = "you Lost";
        }
        screen.style.visibility = "visible";
    }

    handleInteraction(button) {
        button.disabled = true;
        let buttonText = button.innerText;
        if(this.activePhrase.checkLetter(buttonText)) {
            button.classList.add("chosen");
            this.activePhrase.showMatchedLetter(buttonText);
            let youWon = this.checkForWin();
            if(youWon) {
                this.gameOver(youWon);
            }
        } else {
            button.classList.add("wrong");
            this.removeLife();
        }
    }
 }