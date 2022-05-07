export class Tictactoe {
    player1Text = 'X'
    player2Text = 'O'
    player1Score = 0
    player2Score = 0
    gameover = false
    
    constructor (parentElement, gridLength) {
        this.parentElement = parentElement;
        this.gridLength = gridLength;
        this.squares = [];
        this.turnElement = document.querySelector('#turnDisplay > span')
        this.player1ScoreEl = document.querySelector('#player1Score > span')
        this.player2ScoreEl = document.querySelector('#player2Score > span')
        this.winDisplayElement = document.querySelector('#playerWin > h2')
        this.boardElement = document.querySelector('#board')
        this.newGameBtn = document.querySelector('#reset')

        this.renderTiles.bind(this)()

        this.boardElement.addEventListener('click', this.checkGameStatus.bind(this))
        this.newGameBtn.addEventListener('click', this.onNewGame.bind(this))

        // false is player 1, true is player 2
        this.currentTurn = false;
    }

    renderTiles () {
        for (let i = 1; i <= (this.gridLength ** 2); i++) {
            let square = document.createElement('section');
            square.classList.add('square')
            square.id = `sqr_${i}`
    
            this.boardElement.appendChild(square)
        }
    }

    checkGameStatus (click) {
        if (!this.gameover) {
            let clickedElement = click.target
            let curPlayerLetter = this.currentTurn ? this.player2Text : this.player1Text;
            let oppPlayerLetter = this.currentTurn ? this.player1Text : this.player2Text;
            let curPlayer = this.currentTurn ? 'Player 2' : 'Player 1';
            let curPlayerProp = `${curPlayer.replace(' ', '')}Score`
    
            if (clickedElement != this.boardElement) {
                clickedElement.innerText = clickedElement.innerText == '' ? curPlayerLetter : clickedElement.innerText;
    
                if (this.isGameDraw()) {
                    this.winDisplayElement.innerText = "Draw!"
                    return;
                }

                if (this.isPlayerVictory(curPlayerLetter, oppPlayerLetter)) {
                    this[`${curPlayerProp}`] += 1 
                    this.gameover = true

                    if (curPlayer === 'Player 1') {
                        this.player1Score++
                        this.winDisplayElement.innerText = 'Player 1 Won!!'
                        this.player1ScoreEl.innerText = this.player1Score
                        console.log(this.player1Score)
                    } else {
                        this.player2Score++
                        this.winDisplayElement.innerText = 'Player 2 Won!!'
                        this.player2ScoreEl.innerText = this.player2Score
                    }
                }

                this.currentTurn = !this.currentTurn
                this.turnElement.innerText = `PLAYER ${this.currentTurn + 1}`
            }
        }
    }

    isPlayerVictory (playerText, textToReplace) {
        let winPatterns = [
            '000......', 
            '...000...', 
            '......000', 
            '0..0..0..',
            '.0..0..0.',
            '..0..0..0',
            '0...0...0',
            '..0.0.0..',
        ]
        let boardTiles = this.boardElement.childNodes;

        // checking for match
        for (let pattern of winPatterns) {
            let text = ''
            boardTiles.forEach(tile => tile.innerText ? text += tile.innerText : text += '.')
            text = text.split(`${textToReplace}`).join('.')
            text = text.split(`${playerText}`).join('0')

            console.log(pattern)
        
            if (text === pattern) {
                return true;
            }
        }

            return false;
        }


    isGameDraw () {
        let drawPattern = '000000000'
        let boardTiles = this.boardElement.childNodes;
        let text = '';

        boardTiles.forEach(tile => tile.innerText ? text += tile.innerText : text += '.')
        text = text.split(`X`).join('0')
        text = text.split(`O`).join('0')

        if (text === drawPattern) {
            return true;
        }
        return false;
    }

    onNewGame () {
        this.gameover = false
        this.currentTurn = false
        let boardTiles = this.boardElement.childNodes
        boardTiles.forEach(tile => tile.innerText = '')
        this.winDisplayElement.innerText = ''

        this.turnElement.innerText = 'PLAYER 1'
    }
}