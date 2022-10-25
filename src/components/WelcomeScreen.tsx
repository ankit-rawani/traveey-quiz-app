import { Button, Text } from '@chakra-ui/react'
import React from 'react'

function WelcomeScreen({ start }: {start: React.Dispatch<React.SetStateAction<boolean>>}) {
  return (
    <>
        <Text fontSize="lg" casing="uppercase">
            Welcome to
        </Text>
        <Text fontSize="7xl" fontWeight="extrabold" lineHeight="1" letterSpacing="tight">
            Traveey Quiz App
        </Text>
        <Button 
            fontSize="sm" 
            marginTop="48px" 
            colorScheme="blue" 
            rounded="full"
            onClick={() => {
                start(true);
            }}
        >
            Start
        </Button>
    </>
  )
}

export default WelcomeScreen