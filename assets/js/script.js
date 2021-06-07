const btnPlay = document.getElementById('btn-play');
btnPlay.addEventListener('click', () => {
    document.getElementById('modal-initial').classList.add('hidden');
})

const map = [
    "WWWWWWWWWWWWWWWWWWWWW",
    "W   W     W     W W W",
    "W W W WWW WWWWW W W W",
    "W W W   W     W W   W",
    "W WWWWWWW W WWW W W W",
    "W         W     W W W",
    "W WWW WWWWW WWWWW W W",
    "W W   W   W W     W W",
    "W WWWWW W W W WWW W F",
    "S     W W W W W W WWW",
    "WWWWW W W W W W W W W",
    "W     W W W   W W W W",
    "W WWWWWWW WWWWW W W W",
    "W       W       W   W",
    "WWWWWWWWWWWWWWWWWWWWW",
];

creatMap(map)

const player = createPlayer()
const posInitial = document.querySelector(`div[data-start="S"`);
posInitial.appendChild(player);

const currentPosition = {
    'line': posInitial.dataset.line,
    'cell': posInitial.dataset.cell,
}

let linePosition = currentPosition['line'];
let cellPosition = currentPosition['cell'];

document.addEventListener('keydown', (event) => {
    const keyName = event.key;
    checkedMove(keyName);

})

function checkedWinner (positionMap) {
    const modalResult = document.getElementById('modal-result');
    const modalResultText = document.getElementById('modal-result__title');
 
    if (positionMap.dataset.finished === 'F') {
        modalResultText.innerText = 'Parabens você ganhou';
        modalResult.classList.remove('hidden');
    }
}

function creatMap (map) {

    const contLabirinto = document.getElementById('container-labirinto');
        
    for (let i = 0; i < map.length; i++) {
        let lineArray = map[i].split('');
        const lineDiv = document.createElement('div');
        lineDiv.classList.add('line');
    
        for (let j = 0; j < lineArray.length; j++) {
            let index = lineArray[j];
            const cellDiv = document.createElement('div');
    
            cellDiv.setAttribute('data-line', `${i}`);
            cellDiv.setAttribute('data-cell', `${j}`);
            cellDiv.classList.add('cell');
            if (index === "W") {
                cellDiv.classList.add('parede-map1');
            }
            if (index === "F") {
                cellDiv.setAttribute('data-finished', 'F');
            }
            if (index === "S") {
                cellDiv.setAttribute('data-start', 'S');

            }
            lineDiv.appendChild(cellDiv);
        }
        contLabirinto.appendChild(lineDiv);
    }
    
}

function createPlayer() {
    const player = document.createElement('div');
    player.classList.add('player');

    return player;
}

function updatePosition (line, cell) {
    let positionMap = document.querySelector(`div[data-line="${line}"][data-cell="${cell}"]`);
    positionMap.appendChild(player); 
    console.log(positionMap);
    return positionMap;
}

function checkedMove (keyName) {
    if (keyName === 'ArrowUp') {
        player.style.transform = "rotate(270deg)";
        if ((map[linePosition -1][cellPosition] !== 'W') && (linePosition > 0)) {
            linePosition -- ;
        }
    }
    if (keyName === 'ArrowDown') {
        player.style.transform = "rotate(90deg)";
        if ((map[linePosition +1][cellPosition] !== 'W') && (linePosition < 20)){
            linePosition ++ ;
        }
    }
    if (keyName === 'ArrowLeft') {
        player.style.transform = "rotate(180deg)";
        if ((map[linePosition][cellPosition -1] !== 'W') && (cellPosition > 0)) {
            cellPosition -- ;
        }
    }
    if (keyName === 'ArrowRight') {
        player.style.transform = "rotate(0deg)";
        if ((map[linePosition][cellPosition +1] !== 'W') && (cellPosition < 20)) {
            cellPosition ++ ;

        }
    }
    const positionMap = updatePosition(linePosition, cellPosition);
    checkedWinner(positionMap);
}

