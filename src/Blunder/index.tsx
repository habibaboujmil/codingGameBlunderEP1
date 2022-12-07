import {
  Box,
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
    <Center m={12} p={12}>
      <Box 
        p="6"
        maxW={{ base: 'full', md: '80vw', xl: '50vw' }}
        w={{ base: 'full', md: '80vw', xl: '50vw' }}
        m="auto"
        bg={'#fff'}
      >
        <Stack spacing={1}>
          <Center >
            <Text fontSize='3xl'>Blunder épisode 1</Text>
          </Center>
          <Text>
            Ce programme permettra de prévoir le chemin parcouru par le robot Blunder selon la carte saisie comme entrée
          </Text>
          <Text>
            Exemple d'une carte 5*5:<br />
            ##### <br />
            #@E$# <br />
            # N # <br />
            #X  # <br />
            ##### <br />
          </Text>
          <Text fontSize='lg' color={'#7DD0D7'} >
            Etape 1: Insertion du dimension de la carte 
          </Text>
          <HStack w={'full'}>
            {/*number of map lines */}
            <Stack spacing={4} >
              <Text as='label' htmlFor={`ligne-nb`}>
                Entrer le nombre de ligne de la carte
              </Text>
              <NumberInput
                id='ligne-nb'
                w={'full'}
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
            </Stack>
            
            {/*number of map columns*/}
            <Stack spacing={4}>
              <Text as='label' htmlFor={`column-nb`}>
                Entrer le nombre de colonne de la carte
              </Text>
              <NumberInput
                id='column-nb'
                w={'full'}
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
            </Stack>
            
          </HStack>
          {/* display input fields according to the number of columns entered and set maxLength according to the number of lines entered  */}
          {mapSize.y > 0 &&(
          <Stack pt={4} >
            <Text fontSize='lg' color={'#7DD0D7'} >
                  Etape 2: Remplissage de la carte  
            </Text>
            {inputValues?.map((val, index) => (
              <Stack key={index} spacing={4}>
                <Text as='label' htmlFor={`input-${index}`}>
                  Entrer la valeur de la ligne numero {index+1}
                </Text>
                <Input
                  placeholder='exp: #@  N#'
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
          </Stack>)}
        </Stack>
        <Center mt={6}>
          <Button onClick={handleClick} color='#000' bg='#7DD0D7'>
            Afficher l'itinéraire
          </Button>
        </Center>
        
        {/* print the sequence of moves travled by blunder*/}
        {resultMoves?.map((move,index) => (
          <Text key={index}>{move}</Text>
        ))}
      </Box>
    </Center>
  );
};
