import * as React from "react"
import {
  Box,
  ChakraProvider,
  Text,
  theme,
} from "@chakra-ui/react"
import { ColorModeSwitcher } from "./components/ColorModeSwitcher"
import WelcomeScreen from "./components/WelcomeScreen"
import QuestionContainer from "./components/QuestionContainer"

export type QuestionType = {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  options?: string[];
}

export const App = () => {
  const [start, setStart] = React.useState(false);
  const [finish, setFinish] = React.useState(false);
  const [score, setScore] = React.useState(0);

  return (
    <ChakraProvider theme={theme}>
      <Box fontFamily='Poppins, sans-serif' overflow="hidden" height="100vh">
        <Box position="absolute" right="0" zIndex="10" padding="4">
          <ColorModeSwitcher justifySelf="flex-end" />
        </Box>
        <Box mx="auto" width="5xl" height="100vh" paddingTop="32vh" mt={start ? "-100vh" : "0vh"} transition="all 1.5s ease-in-out">
          <WelcomeScreen start={setStart} />
        </Box>
        <Box height="100vh" mt={finish ? "-100vh" : "0vh"} transition="all 1.5s ease-in-out">
          {
            start &&
            <QuestionContainer finish={setFinish} score={setScore} />
          }
        </Box>
        <Box height="100vh" paddingTop="30vh">
          <Text align="center">
            Your score is
          </Text>
          <Text align="center" fontSize="8xl" fontWeight="extrabold">{score}/50</Text>
        </Box>
      </Box>
    </ChakraProvider>
  )
}
