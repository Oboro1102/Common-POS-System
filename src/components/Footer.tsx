import { Box, Flex, ButtonGroup, Text } from '@chakra-ui/react'
import { ShareDrawer } from "../components/ShareDrawer"

export const Footer = () => {
  //state
  const currentYear = new Date().getFullYear()

  return (
    <Flex p='4' alignItems='flex-end' justifyContent={['center', 'space-between']} flexWrap={['wrap', 'nowrap']}>
      <Box pr={['0', '2']}>
        <ButtonGroup gap='2'>
          <ShareDrawer useFor='orders' />
          <ShareDrawer useFor='members' />
          <ShareDrawer useFor='system' />
        </ButtonGroup>
      </Box>
      <Box pt='2' pl={['0', '2']} fontSize='xs'>
        <Text>&copy; 2023{currentYear !== 2023 && ` - ${currentYear}`} Design & Coding by ツキノリュウ.</Text>
      </Box>
    </Flex>
  )
}