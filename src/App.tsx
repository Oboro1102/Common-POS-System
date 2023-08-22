import { useAppSelector, useAppDispatch } from './store/hooks.ts'
import { currentTab, orderItems, setCurrentTab, addNewOrderItem, tuneOrdersItemQty, removeOrdersItem, reset, type orderItemsType } from './store/modules/globalSlice.ts'
import { addOrder, type orderHistoryType } from './store/modules/ordersSlice.ts'
import { serveList } from './store/modules/systemSlice.ts'
import { Divider, Flex, Box, Image, Button, Text, SimpleGrid, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper } from "@chakra-ui/react"
import { PiTrashBold } from "react-icons/pi"
import { Footer } from "./components/Footer"

function App() {
  // state
  const serve = useAppSelector(serveList)
  const orders = useAppSelector(orderItems)
  const tabList: string[] = serve.map(item => item.group).filter((element, index, arr) => {
    return arr.indexOf(element) === index
  })
  const selectedTab = useAppSelector(currentTab)

  // methods
  const dispatch = useAppDispatch();
  const groupServe = (filterGroup: string) => {
    return serve.filter(item => item.group === filterGroup)
  }
  const sumOrders = () => {
    const itemsAmount: number[] = orders.map(item => item.price * item.qty)
    const result: number = itemsAmount.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    return result
  }
  const finishOrder = () => {
    const data: orderHistoryType = {
      id: new Date().toISOString(),
      serial: new Date().toISOString(),
      time: new Date().toISOString(),
      amount: sumOrders(),
      orders: orders
    }
    dispatch(addOrder(data))
    dispatch(reset())
  }

  return (
    <>
      <Box w='100%' h='100%' maxH={['calc(100% - 98px)', 'calc(100% - 72px)']} p={4} style={{ 'overflow': 'auto' }}>
        <Flex w='100%' h='100%' alignItems='flex-start' justifyContent='space-between' wrap='wrap'>
          <Flex w={['100%', '64px']} h={['50px', 'auto']} flexDirection={['row', 'column']}>
            {tabList.map((item: string, index) =>
              <Button key={`${item}-${index}`} mb={[0, 4]} mr={[4, 0]} colorScheme='green' onClick={() => { dispatch(setCurrentTab(index)) }}>{item}</Button>
            )}
          </Flex>
          <SimpleGrid w={['100%', 'calc(70% - 64px - 24px*2)']} minChildWidth='30%' spacing='24px'>
            {groupServe(tabList[selectedTab]).map((item) =>
              <Box key={item.id} p='2' borderRadius='lg' borderWidth='1px'>
                <Flex alignItems='center' wrap='wrap'>
                  <Image
                    mr='2'
                    borderRadius='full'
                    boxSize='4rem'
                    src={item.image}
                    alt={item.name}
                  />
                  <Text as='b' mr='2' fontSize='xl'>{item.name}</Text>
                  <Text as='b' color='red.600' fontSize='2xl'>${item.price}</Text>
                </Flex>
                <Button isDisabled={orders.findIndex((existed) => existed.id === item.id) !== -1} w='100%' mt='2' colorScheme='blue' onClick={() => { dispatch(addNewOrderItem(item as orderItemsType)) }}>下單</Button>
              </Box>
            )}
          </SimpleGrid>
          <Box w={['100%', '30%']} h={['90%', '100%']} mt={['4', '0']} p='4' bg='gray.100' borderRadius='lg'>
            {orders.length > 0 ? (
              <Box>
                {orders.map((item: orderItemsType) =>
                  <Box mb='4' key={item.id}>
                    <Flex alignItems='center' wrap='wrap'>
                      <Image
                        mr='2'
                        borderRadius='full'
                        boxSize='2rem'
                        src={item.image}
                        alt={item.name}
                      />
                      <Text as='b' mr='2' fontSize='xl'>{item.name}</Text>
                      <NumberInput ml='auto' w='150px' defaultValue={1} min={1}>
                        <NumberInputField bg='white' value={item.qty} onChange={(e) => {
                          dispatch(tuneOrdersItemQty({ id: item.id, qty: Number(e.target.value.replace(/[^0-9]/g, "")) }))
                        }} />
                        <NumberInputStepper>
                          <NumberIncrementStepper onClick={() => { dispatch(tuneOrdersItemQty({ id: item.id, qty: 1, trigger: true })) }} />
                          <NumberDecrementStepper onClick={() => { dispatch(tuneOrdersItemQty({ id: item.id, qty: -1, trigger: true })) }} />
                        </NumberInputStepper>
                      </NumberInput>
                    </Flex>
                    <Flex mt='2' alignItems='flex-start' justifyContent='space-between'>
                      <Button size='xs' colorScheme='red' leftIcon={<PiTrashBold />} onClick={() => { dispatch(removeOrdersItem(item.id)) }}>移除</Button>
                      <Text color='gray.500' fontSize='sm'>小計：{`${(item.qty * item.price).toLocaleString()}`}元</Text>
                    </Flex>
                  </Box>
                )}
                <Divider mb='4' />
                <Flex mb='4' fontSize='sm' alignItems='flex-end' justifyContent='space-between'>
                  <Text>總計：</Text>
                  <Text>$<Text as='b' mx='1' fontSize='2xl'>{sumOrders().toLocaleString()}</Text>元</Text>
                </Flex>
                <Button w='100%' colorScheme='green' onClick={() => { finishOrder() }}>結帳</Button>
              </Box>) : (
              <Flex w='100%' h='100%' alignItems='center' justifyContent='center'>
                <Text as='b' color='gray.400' fontSize='3xl'>無下單項目</Text>
              </Flex>)}
          </Box>
        </Flex>
      </Box >
      <Footer />
    </>
  )
}

export default App
