import { useBlunderCalc } from "./Blunder/useBlunderCalc"

test("simple map", () => {
  const [map, expected] = [
    ['######', '#@   #', '#    #','#    #', '#  $ #', '######'],
    ['SOUTH','SOUTH','SOUTH','EAST','EAST']
  ]
  const { calcMoves } = useBlunderCalc({inputValues:map});
  const moves = calcMoves();
  expect(moves).toEqual(expected);
})

test("map with obstacles", () => {
  const [map, expected] = [
    ['########', '# @    #', '#     X#', '# XXX  #', '#   XX #','#   XX #','#     $#','########'],
    ['SOUTH','EAST','EAST','EAST','SOUTH','EAST','SOUTH','SOUTH','SOUTH']
  ]
  const { calcMoves } = useBlunderCalc({inputValues:map});
  const moves = calcMoves();
  expect(moves).toEqual(expected);
})

test("map with inverters", () => {
  const [map, expected] = [
    ['######', '#$I  #', '#    #', '#   I#', '#@   #','######'],
    ['EAST','EAST','EAST','NORTH','NORTH','NORTH','WEST','WEST','WEST']
  ]
  const { calcMoves } = useBlunderCalc({inputValues:map});
  const moves = calcMoves();
  expect(moves).toEqual(expected);
})

test("map with path modifiers", () => {
  const [map, expected] = [
    ['##########', '#@       #', '#  S    W#', '#        #', '#E      S#','#  E $  W#','#        #','#        #','#      N #','##########'],
    ['SOUTH','SOUTH','SOUTH','EAST','EAST','EAST','EAST','EAST','EAST','EAST','SOUTH','WEST','WEST','WEST']
  ]
  const { calcMoves } = useBlunderCalc({inputValues:map});
  const moves = calcMoves();
  expect(moves).toEqual(expected);
})

test("map with teleporters", () => {
  const [map, expected] = [
    ['##########', '#@       #', '#T       #', '#        #', '#    T   #','#        #','#        #','#        #','#     $  #','##########'],
    ['SOUTH','SOUTH','SOUTH','SOUTH','SOUTH','EAST']
  ]
  const { calcMoves } = useBlunderCalc({inputValues:map});
  const moves = calcMoves();
  expect(moves).toEqual(expected);
})

test("loop condition", () => {
  const [map, expected] = [
    ['######', '#$   #', '#    #', '#@   #','#    #', '######'],
    ['LOOP']
  ]
  const { calcMoves } = useBlunderCalc({inputValues:map});
  const moves = calcMoves();
  expect(moves).toEqual(expected);
})

test("complecated map", () => {
  const [map, expected] = [
    ['###############', '#      IXXXXX #', '#  @          #', '#             #','#             #', '#  I          #','#  B          #','#  B   S     W#','#  B   T      #','#             #','#         T   #','#         B   #','#            $#','#        XXXX #','###############'],
    ['SOUTH','SOUTH','SOUTH','SOUTH','SOUTH','SOUTH','SOUTH','SOUTH','SOUTH','SOUTH','SOUTH','WEST','WEST','NORTH','NORTH','NORTH','NORTH','NORTH','NORTH','NORTH','NORTH','NORTH','NORTH','NORTH','NORTH','EAST','EAST','EAST','EAST','EAST','EAST','EAST','EAST','EAST','EAST','EAST','EAST','SOUTH','SOUTH','SOUTH','SOUTH','SOUTH','SOUTH','WEST','WEST','WEST','WEST','WEST','WEST','SOUTH','SOUTH','SOUTH','EAST','EAST','EAST']
  ]
  const { calcMoves } = useBlunderCalc({inputValues:map});
  const moves = calcMoves();
  expect(moves).toEqual(expected);
})