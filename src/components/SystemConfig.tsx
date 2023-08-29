import { useAppSelector, useAppDispatch } from '../store/hooks.ts'
import { orderItems } from '../store/modules/globalSlice.ts'
import { serveList, type serveListType, removeServe } from '../store/modules/systemSlice.ts'
import { Flex, Image, Text, Tag, Button, Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer, Box } from "@chakra-ui/react"
import { PiTrashBold } from "react-icons/pi"
import { SystemServeAdditory } from "./SystemServeAdditory"

export const SystemConfig = () => {
    // state
    const serve = useAppSelector(serveList);
    const orders = useAppSelector(orderItems);

    // methods
    const dispatch = useAppDispatch();

    return (
        <>
            <Flex justifyContent='flex-end'>
                <SystemServeAdditory disabled={false} useFor='add' editData={{
                    id: new Date().toISOString(),
                    image: '',
                    name: '',
                    spec: '',
                    price: 0,
                    group: ''
                }} />
            </Flex>
            <TableContainer mt='4'>
                <Table>
                    {serve.length < 1 && <TableCaption>目前沒有新的服務，請新增服務供系統使用</TableCaption>}
                    <Thead>
                        <Tr>
                            <Th>群組分類</Th>
                            <Th>項目</Th>
                            <Th>規格</Th>
                            <Th isNumeric>價格</Th>
                            <Th textAlign='right'>操作</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {serve.length > 0 &&
                            serve.map((item: serveListType) =>
                                <Tr key={item.id}>
                                    <Td>
                                        <Tag variant='solid' colorScheme='purple'>{item.group}</Tag>
                                    </Td>
                                    <Td>
                                        <Flex alignItems='center' justifyContent='flex-start'>
                                            <Image
                                                mr='2'
                                                borderRadius='full'
                                                boxSize='3rem'
                                                src={item.image}
                                                alt={item.name}
                                            />
                                            <Text as='b'>{item.name}</Text>
                                        </Flex>
                                    </Td>
                                    <Td>{item.spec}</Td>
                                    <Td isNumeric>{item.price.toLocaleString()}</Td>
                                    <Td>
                                        <Flex alignItems='center' justifyContent='flex-end'>
                                            <SystemServeAdditory disabled={orders.findIndex(existed => existed.id === item.id) !== -1} useFor='edit' editData={item} />
                                            <Button isDisabled={orders.findIndex(existed => existed.id === item.id) !== -1} ml='2' size='xs' colorScheme='red' leftIcon={<PiTrashBold />} onClick={() => {
                                                dispatch(removeServe(item.id))
                                            }}>移除服務</Button>
                                        </Flex>
                                        {orders.findIndex(existed => existed.id === item.id) !== -1 &&
                                            <Box mt='1' textAlign='right'>
                                                <Text fontSize='xs' color='yellow.300'>請將項目從下單清單中移除再行操作</Text>
                                            </Box>}
                                    </Td>
                                </Tr>)}
                    </Tbody>
                    {serve.length > 0 &&
                        <Tfoot>
                            <Tr>
                                <Th>群組分類</Th>
                                <Th>項目</Th>
                                <Th>規格</Th>
                                <Th isNumeric>價格</Th>
                                <Th textAlign='right'>操作</Th>
                            </Tr>
                        </Tfoot>}
                </Table>
            </TableContainer>
        </>
    )
}
