import {
  Button,
  Center,
  HStack,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useBlunderCalc } from './useBlunderCalc';

export const Blunder = () => {
  const [mapSize, setMapSize] = useState({ x: 0, y: 0 });
  const [inputValues, setInputValues] = useState<string[]>([]);
  const [resultMoves, setResultMoves] = useState<string[]>();
  const { calcMoves } = useBlunderCalc({ inputValues });

  const handleClick = () => {
    const moves = calcMoves();
    setResultMoves(moves);
  };

  return (
    <Stack bg='white' flex={1} p={4}>
      <Stack spacing={1}>
        <Text>Entrez la taille de la carte (exp: 5*5)</Text>
        <HStack w='full'>
          {/*number of map lines */}
          <NumberInput
            onChange={(val) => {
              setMapSize((prevVal) => ({
                ...prevVal,
                x: Number(val),
              }));
            }}
            value={mapSize?.x}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          {/*number of map columns*/}
          <NumberInput
            onChange={(val) => {
              setMapSize((prevVal) => ({
                ...prevVal,
                y: Number(val),
              }));
              setInputValues(new Array(Number(val))?.fill(null));
            }}
            value={mapSize?.y}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </HStack>
        {/* display input fields according to the number of columns entered and set maxLength according to the number of lines entered  */}
        <Stack spacing={3}>
          {inputValues?.map((val, index) => (
            <Stack key={index} spacing={1}>
              <Text as='label' htmlFor={`input-${index}`}>
                Ligne numero {index+1}
              </Text>
              <Input
                id={`input-${index}`}
                onChange={(event) =>
                  setInputValues((prev) =>
                    prev?.map((item, itemIndex) =>
                      itemIndex === index ? event?.target?.value : item
                    )
                  )
                }
                maxLength={mapSize?.x}
                value={inputValues[index]}
              />
            </Stack>
          ))}
        </Stack>
      </Stack>
      <Center>
        <Button onClick={handleClick} color='#000' bg='#7CFC00'>
          Calculer
        </Button>
      </Center>
      {/* print the sequence of moves travled by blunder*/}
      {resultMoves?.map((move,index) => (
        <Text key={index}>{move}</Text>
      ))}
    </Stack>
  );
};
