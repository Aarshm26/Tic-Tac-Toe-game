document.addEventListener('DOMContentLoaded', function() {
    const board = document.getElementById('board');
    const winCounterX = document.getElementById('player-X');
    const winCounterO = document.getElementById('player-O');
    const drawMessage = document.getElementById('draw-message');
    const themeToggle = document.getElementById('theme-toggle');
    const cells = Array.from({ length: 9 }, (_, index) => createCell(index));
  
    let currentPlayer = 'X';
    let gameOver = false;
    let darkThemeEnabled = false;
  
    cells.forEach(cell => board.appendChild(cell));
  
    function createCell(index) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.setAttribute('data-index', index);
      cell.addEventListener('click', handleCellClick);
      return cell;
    }
  
    function handleCellClick(event) {
      if (gameOver) {
        resetGame();
        return;
      }
  
      const clickedCell = event.target;
      const index = clickedCell.getAttribute('data-index');
  
      if (clickedCell.textContent !== '') {
        return;
      }
  
      clickedCell.textContent = currentPlayer;
      clickedCell.classList.add(currentPlayer.toLowerCase());
      clickedCell.classList.add('celebration');
  
      if (checkForWin() || checkForDraw()) {
        updateWinCounter();
        gameOver = true;
      } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      }
    }
  
    function checkForWin() {
      const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
      ];
  
      for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        const cellsContent = cells.map(cell => cell.textContent);
        if (cellsContent[a] !== '' && cellsContent[a] === cellsContent[b] && cellsContent[b] === cellsContent[c]) {
          return true;
        }
      }
  
      return false;
    }
  
    function checkForDraw() {
      return cells.every(cell => cell.textContent !== '');
    }
  
    function updateWinCounter() {
      if (checkForWin()) {
        if (currentPlayer === 'X') {
          winCounterX.textContent = `Player X Wins: ${parseInt(winCounterX.textContent.split(': ')[1]) + 1}`;
        } else {
          winCounterO.textContent = `Player O Wins: ${parseInt(winCounterO.textContent.split(': ')[1]) + 1}`;
        }
      } else {
        drawMessage.textContent = 'It\'s a draw!';
      }
    }
  
    function resetGame() {
      cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('tic', 'toe', 'celebration');
      });
  
      currentPlayer = 'X';
      gameOver = false;
      drawMessage.textContent = '';
    }
  
    themeToggle.addEventListener('click', function() {
      darkThemeEnabled = !darkThemeEnabled;
      document.body.classList.toggle('dark', darkThemeEnabled);
    });
  
    board.addEventListener('animationend', function(event) {
      if (event.animationName === 'celebration') {
        event.target.classList.remove('celebration');
      }
    });
  });
  