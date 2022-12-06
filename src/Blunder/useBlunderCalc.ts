import { Point, State, Teleporter } from './Blunder.types';

type UseBlunderCalcProps = {
  inputValues: string[];
};
export const useBlunderCalc = ({ inputValues }: UseBlunderCalcProps) => {
  // initial state of blunder
  const state: State = {
    x: 0,
    y: 0,
    inverted: false,
    breakerMode: false,
    direction: 'SOUTH',
  };
  // coordinates of each direction
  const positions: { [key: string]: Point } = {
    NORTH: { y: -1, x: 0 },
    EAST: { y: 0, x: 1 },
    SOUTH: { y: 1, x: 0 },
    WEST: { y: 0, x: -1 },
  };

  const searchSymbol = () => {
    const teleporters: Teleporter[] = [];
    const inputValuesMatrice = inputValues?.map((item) => item?.split(''));
    inputValuesMatrice?.forEach((inputValue, indexY) => {
      inputValue?.forEach((charValue, indexX) => {
        // search start position
        if (charValue === '@') {
          state.x = indexX;
          state.y = indexY;
        }
        // search teleporters positions 
        else if (charValue === 'T') {
          teleporters.push({ y: indexY, x: indexX });
        }
      });
    });
    return {
      map: inputValuesMatrice,
      teleporters: teleporters,
    };
  };

  const nextMove = (map: string[][]) => {
    const currentDirection = positions[state.direction];
    // change X with blank areas if blunder is in breaker mode and next position is X
    if (
      map[state.y + currentDirection.y][state.x + currentDirection.x] === 'X' &&
      state.breakerMode
    ) 
    {
      map[state.y + currentDirection.y][state.x + currentDirection.x] = ' '; 
    } 
    else if (
      (map[state.y + currentDirection.y][state.x + currentDirection.x] ===
        'X' &&
        !state.breakerMode) ||
      map[state.y + currentDirection.y][state.x + currentDirection.x] === '#'
    ) {
      let directions =[positions.SOUTH, positions.EAST, positions.NORTH,positions.WEST] ;
      //reverse the direction priorities
      if (state.inverted)
        directions = [positions.WEST,positions.NORTH,positions.EAST,positions.SOUTH]; 

      for (const direction of directions) {
        switch (map[state.y + direction.y][state.x + direction.x]) {
          case 'X':
          case '#':
            break;
          default:
            state.x += direction.x;
            state.y += direction.y;
            state.direction = Object.keys(positions).filter(function(key) {return positions[key].x === direction.x && positions[key].y === direction.y})[0];
            return state.direction;
        }
      }
    }

    state.x += currentDirection.x;
    state.y += currentDirection.y;
    const getDirection = Object.keys(positions).filter(function(key) {return positions[key].x === currentDirection.x && positions[key].y === currentDirection.y})[0];   
    return getDirection;
  };

  const blunderPath = (map: string[][], teleporters: Teleporter[]) => {
    const Visited: { [key: string]: any } = [];
    let moves: Array<string> = [];
    let suicideBooth = false;
    let inLoop = false;
    while (!suicideBooth && !inLoop) {
      if (map[state.y][state.x] === '$') {
          suicideBooth = true;  //Blunder reach the suicide booth
      } 
      else {
        // search a similar position in the sequence of moves 
        const isVisited = Visited.find((element:State) => {
          return element.x === state.x && element.y === state.y &&  element.direction === state.direction &&  element.inverted === state.inverted &&  element.breakerMode === state.breakerMode ;
        })
        if (isVisited) {
          moves = ['LOOP'];
          inLoop = true;
        }else{
          // mark position as visited
          Visited.push({
            x: state.x,
            y: state.y,
            inverted: state.inverted,
            direction: state.direction,
            breakerMode: state.breakerMode,
          });
          switch (map[state.y][state.x]) {
            case 'N':
              state.direction = 'NORTH';
              break;
    
            case 'E':
              state.direction = 'EAST';
              break;
    
            case 'S':
              state.direction = 'SOUTH';
              break;
    
            case 'W':
              state.direction = 'WEST';
              break;
    
            case 'I':
              state.inverted = !state.inverted;
              break;
    
            case 'B':
              state.breakerMode = !state.breakerMode;
              break;
    
            case 'T':
              if (state.x === teleporters[0].x && state.y === teleporters[0].y) {
                state.x = teleporters[1].x;
                state.y = teleporters[1].y;
              }else{
                state.x = teleporters[0].x;
                state.y = teleporters[0].y;
              }
              
          }
    
          moves.push(nextMove(map));
        } 
      }
      
    }
    return moves;
  };

  const calcMoves = () => {
    const { teleporters, map } = searchSymbol();
    const moves = blunderPath(map, teleporters);
    return moves;
  };
  return {
    calcMoves,
  };
};
