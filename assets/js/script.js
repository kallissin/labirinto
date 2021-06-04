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

const currentPosition = {
    'line': 9,
    'cell': 0,
}

let linePosition = currentPosition['line'];
let cellPosition = currentPosition['cell'];

creatMap(map);

const player = createPlayer()

const posInitial = document.querySelector(`div[data-linha="${linePosition}"][data-celula="${cellPosition}"]`);
posInitial.appendChild(player);

function checkedWinner (positionMap) {
    const modalResult = document.getElementById('modal-result');
    const modalResultText = document.getElementById('modal-result__title');
 
    if (positionMap.dataset.finished === 'F') {
        modalResultText.innerText = 'Parabens você ganhou';
        modalResult.classList.remove('hidden');
    }
}

function creatMap (map) {

    
    //const script = document.querySelector('script');
    const contLabirinto = document.getElementById('container-labirinto');
    
    
    for (let i = 0; i < map.length; i++) {
        let lineArray = map[i].split('');
        const lineDiv = document.createElement('div');
        lineDiv.classList.add('linha');
    
        for (let j = 0; j < lineArray.length; j++) {
            let index = lineArray[j];
            const cellDiv = document.createElement('div');
    
            cellDiv.setAttribute('data-linha', `${i}`);
            cellDiv.setAttribute('data-celula', `${j}`);
            cellDiv.classList.add('celula');
            if (index === "W") {
                cellDiv.classList.add('parede');
            }
            if (index === "F") {
                cellDiv.setAttribute('data-finished', 'F')
                console.log(cellDiv);
            }
    
            lineDiv.appendChild(cellDiv);
        }
        contLabirinto.appendChild(lineDiv);
        //document.body.insertBefore(lineDiv,script);
    }
    
}

function createPlayer() {
    const player = document.createElement('div');
    player.classList.add('player');

    return player;
}

function atualizarPosicao (line, cell) {
    let positionMap = document.querySelector(`div[data-linha="${line}"][data-celula="${cell}"]`);
    positionMap.appendChild(player); 
    console.log(positionMap);
    return positionMap;
}

document.addEventListener('keydown', (event) => {
    const keyName = event.key;

    if (keyName === 'ArrowUp') {
        player.style.transform = "rotate(270deg)";
        if (map[linePosition -1][cellPosition] !== 'W') {
            linePosition -- ;
        }
    }
    if (keyName === 'ArrowDown') {
        player.style.transform = "rotate(90deg)";
        if (map[linePosition +1][cellPosition] !== 'W') {
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
    const positionMap = atualizarPosicao(linePosition, cellPosition);
    checkedWinner(positionMap);
})
