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

        lineDiv.appendChild(cellDiv);
    }
    contLabirinto.appendChild(lineDiv);
    //document.body.insertBefore(lineDiv,script);
}

const player = document.createElement('div');
player.classList.add('player');

const currentPosition = {
    'line': 9,
    'cell': 0,
}

let linePosition = currentPosition['line'];
let cellPosition = currentPosition['cell'];

const posInitial = document.querySelector(`div[data-linha="${linePosition}"][data-celula="${cellPosition}"]`);
posInitial.appendChild(player);

function atualizarPosicao (linha, celula) {
    let newCell = document.querySelector(`div[data-linha="${linha}"][data-celula="${celula}"]`);
    newCell.appendChild(player);
    
}

document.addEventListener('keydown', (event) => {
    const keyName = event.key;

    if (keyName === 'ArrowUp') {
        if (map[linePosition -1][cellPosition] !== 'W') {
            linePosition -- ;
        }
    }
    if (keyName === 'ArrowDown') {
        if (map[linePosition +1][cellPosition] !== 'W') {
            linePosition ++ ;
        }
    }
    if (keyName === 'ArrowLeft') {
        if ((map[linePosition][cellPosition -1] !== 'W') && (cellPosition > 0)) {
            cellPosition -- ;
        }
    }
    if (keyName === 'ArrowRight') {
        if ((map[linePosition][cellPosition +1] !== 'W') && (cellPosition < 20)) {
            cellPosition ++ ;
        }
    }
    atualizarPosicao(linePosition, cellPosition);
})
