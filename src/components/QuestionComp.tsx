import { Box, Radio, RadioGroup, Text } from '@chakra-ui/react'
import React from 'react'
import { QuestionType } from '../App'

function QuestionComp({q, submit, submission}: {q: QuestionType, submit: (a: string) => void, submission: string}) {
  return (
    <>
        <Text fontWeight="bold">
            {q.category}
        </Text>
        <Text fontSize="xs" casing="capitalize">
            {q.difficulty}
        </Text>
        <Text fontSize="2xl" fontWeight="semibold" mt="64px" dangerouslySetInnerHTML={{__html: q.question}}></Text>
        {
            submission === "" ?
            (
                <RadioGroup
                    onChange={(res) => submit(res)}
                >
                    {
                        typeof q.options !== 'undefined' &&
                        q.options.map((option, index) => (
                                <Box key={index} mt="16px">
                                    <Radio value={option}>{option}</Radio>
                                </Box>
                            )
                        )
                    }
                </RadioGroup>
            ) : (
                <RadioGroup
                    value={submission}
                >
                    {
                        typeof q.options !== 'undefined' &&
                        q.options.map((option, index) => (
                                <Box key={index} mt="16px">
                                    <Radio value={option}>{option}</Radio>
                                </Box>
                            )
                        )
                    }
                </RadioGroup>
            )
        }
    </>
  )
}

export default QuestionComp