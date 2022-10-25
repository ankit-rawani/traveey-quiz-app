import { Box, Button, Flex, Spinner } from '@chakra-ui/react'
import React from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { QuestionType } from '../App'
import QuestionComp from './QuestionComp';

function QuestionContainer({finish, score}: {finish: React.Dispatch<React.SetStateAction<boolean>>, score: React.Dispatch<React.SetStateAction<number>>}) {
  const [questions, setQuestions] = React.useState<QuestionType[]>([]);
  const [curr, setCurr] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);
  const [submission, setSubmission] = React.useState<string>("");
  const [finalSubmission, setFinalSubmission] = React.useState<string[]>([]);

  React.useEffect(() => {
    setIsLoading(true);
    fetch('https://opentdb.com/api.php?amount=10')
      .then(res => {
        if(res.ok) {
          return res.json();
        }

        throw new Error(JSON.stringify(res.json()));
      })
      .then((res: {response: number, results: QuestionType[]}) => {
        setQuestions(res.results.map(e => {
            return ({...e, options: [e.correct_answer, ...e.incorrect_answers].sort(() => (Math.random() - 0.5))});
        }));

        setFinalSubmission(res.results.map(() => ""));

        setIsLoading(false);
      })
      .catch(err => console.error(err));
  }, [])

  return (
    <>
        <Box height="80vh">
            <Box mx="auto" width="5xl" height="80vh" paddingTop="10vh">
                {
                    isLoading && 
                    <Box w="max-content" mx="auto">
                        <Spinner />
                    </Box>
                }
                {
                    (questions[curr] && !isLoading) && 
                    <QuestionComp 
                        q={questions[curr]} 
                        submit={(res: string) => setSubmission(res)}
                        submission={finalSubmission[curr]}
                    />
                }
            </Box>
        </Box>
        <Flex gap="16px" mx="auto" width="200px" justifyContent="space-between">
            <Button onClick={() => setCurr(prev => prev-1)} disabled={curr <= 0} fontSize="sm" colorScheme="blue" rounded="full">
                <FaChevronLeft />
            </Button>
            {
                (curr === questions.length - 1) && (finalSubmission[finalSubmission.length - 1] !== "") ?
                (
                    <Button 
                        fontSize="sm" 
                        colorScheme={"green"} 
                        rounded="full" 
                        onClick={() => {
                                let s = 0;
                                questions.forEach((q, index) => {
                                    if(q.correct_answer === finalSubmission[index]) s += 5;
                                    else s -= 1;
                                })

                                console.log(questions.map(q => q.correct_answer));
                                console.log(finalSubmission);

                                score(s);
                                finish(true);
                            }
                        }
                    >
                        Finish
                    </Button>
                ) : (
                    <Button 
                        fontSize="sm" 
                        colorScheme={"blue"} 
                        rounded="full" 
                        onClick={() => {
                                setFinalSubmission(prev => {
                                    const newArr = [...prev];
                                    newArr[curr] = submission;
                                    return newArr;
                                });
                            }
                        }
                    >
                        Submit
                    </Button>
                )
            }
            <Button 
                onClick={() => {
                        setSubmission("");
                        setCurr(prev => prev+1)
                    }
                } 
                disabled={(curr >= questions.length - 1) || finalSubmission[curr] === ""} 
                fontSize="sm" 
                colorScheme="blue" 
                rounded="full"
            >
                <FaChevronRight />
            </Button>
        </Flex>
    </>
  )
}

export default QuestionContainer