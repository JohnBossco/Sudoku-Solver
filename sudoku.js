document.addEventListener('DOMContentLoaded', function() {
    let gridSize = 9;
    let solveButton = document.getElementById("solve-button")
    solveButton.addEventListener('click', solveSudoku)

    let sudokuGrid = document.getElementById("sudoku-grid")

    for(let row = 0 ; row < gridSize ; row++) {
        let newRow = document.createElement("tr")
        for(let col = 0; col < gridSize ; col++) {
            let cell = document.createElement("td")
            let input = document.createElement("input")
            input.type = "number"
            input.className = "cell"
            input.id = `cell-${row}-${col}`
            cell.appendChild(input)
            newRow.appendChild(cell)
        }
        sudokuGrid.appendChild(newRow)
    }

   })

   async function solveSudoku() {
    let gridSize = 9
    let sudokuArray = []

    for(let row = 0; row < gridSize; row++ ){
        sudokuArray[row] = []

        for(let col = 0; col < gridSize; col++){
            let cellID = `cell-${row}-${col}`
            let cellValue = document.getElementById(cellID).value;
            sudokuArray[row][col] = cellValue !== "" ? parseInt (cellValue) : 0
        }
    }

    for(let row = 0; row < gridSize; row++){
        for(let col = 0; col < gridSize; col++){
            let cellID = `cell-${row}-${col}`
            let cell = document.getElementById(cellID)

            if(sudokuArray[row][col] !== 0){
                cell.classList.add("user-input")
            }
        }
    }


    if(solveSudokuHelp(sudokuArray)){
        for(let row = 0; row < gridSize; row++){
            for(let col = 0; col < gridSize; col++){
                let  cellID = `cell-${row}-${col}`
                let cell = document.getElementById(cellID)

                if(!cell.classList.contains("user-input")){
                    cell.value = sudokuArray[row][col]
                    cell.classList.add("solved")
                    await sleep(20)
                }
            }
        }
    }else{alert("No solution found")}

}

    function solveSudokuHelp(board){
        let gridSize = 9

        for(let row = 0; row < gridSize; row++){
            for(let col = 0; col < gridSize; col++){
                if(board[row][col] === 0){
                    for(let num = 1; num <= 9; num++){
                        if(isValidMove(board,row,col,num)){
                            board[row][col] = num
                            
                            if(solveSudokuHelp(board)){
                                return true
                            }
                            board[row][col] = 0

                        }
                    }
                    return false
                }
        }
    }
    return true
}

    function isValidMove(board,row,col,num){
        let gridSize = 9
        
        for(let i =0; i < gridSize; i++){
            if(board[row][i] === num || board[i][col] === num){
                return false
            }
        }
    
        let startRow = Math.floor(row / 3) * 3
        let startCol = Math.floor(col / 3) * 3

        for(let i = startRow; i < startRow + 3;  i++){
            for(let j = startCol; j < startCol + 3; j++){
                if(board[i][j] === num){
                    return false
                }
        }
    }
    return true
}

    function sleep(ms){
        return new Promise(resolve => setTimeout(resolve, ms))
    }