
import { useAppSelector } from '../store/hooks.ts'
import { orderHistory, type orderHistoryType } from '../store/modules/ordersSlice.ts'
import { Flex, Image, Avatar, Text, Tag, TableContainer, Table, Thead, Tbody, Tfoot, Tr, Th, Td } from "@chakra-ui/react"

export const OrdersList = () => {
    // state
    const ordersList = useAppSelector(orderHistory)

    return (
        <>
            {ordersList.length > 0 ? (
                <TableContainer>
                    <Table size='sm'>
                        <Thead>
                            <Tr>
                                <Th>訂單編號</Th>
                                <Th>成立時間</Th>
                                <Th>銷售項目</Th>
                                <Th>購買會員</Th>
                                <Th isNumeric>銷售金額</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {ordersList.map((item: orderHistoryType) =>
                                <Tr key={item.id}>
                                    <Td>{item.serial}</Td>
                                    <Td>{item.time}</Td>
                                    <Td>
                                        {item.orders.map((orderItem, index) =>
                                            <Flex mt={index > 0 ? '2' : '0'} alignItems='center' justifyContent='flex-start' wrap='wrap' key={orderItem.id}>
                                                <Image
                                                    mr='2'
                                                    borderRadius='full'
                                                    boxSize='1.5rem'
                                                    src={orderItem.image}
                                                    alt={orderItem.name}
                                                />
                                                <Text as='b' mr='2'>{orderItem.name}</Text>
                                                <Tag mr='2' colorScheme='purple'>{orderItem.spec}</Tag>
                                                <Tag mr='2' colorScheme='orange'>{orderItem.group}</Tag>
                                                <Text as='b' fontSize='xs'>${orderItem.price.toLocaleString()} x {orderItem.qty.toLocaleString()}</Text>
                                            </Flex>
                                        )}
                                    </Td>
                                    <Td>
                                        {item.buyer &&
                                            <Flex ml='2' alignItems='center' justifyContent='flex-start'>
                                                <Avatar size='xs' name={item.buyer.name.last} src={item.buyer.picture.thumbnail} mr='2' />
                                                <Text mr='2'>{`${item.buyer.name.last}${item.buyer.name.first}`}</Text>
                                            </Flex>
                                        }
                                    </Td>
                                    <Td fontSize='lg' isNumeric>${item.amount.toLocaleString()}</Td>
                                </Tr>)}
                        </Tbody>
                        <Tfoot>
                            <Tr>
                                <Th>訂單編號</Th>
                                <Th>成立時間</Th>
                                <Th>銷售項目</Th>
                                <Th>購買會員</Th>
                                <Th isNumeric>銷售金額</Th>
                            </Tr>
                        </Tfoot>
                    </Table>
                </TableContainer >
            ) : (
                <Flex w='100%' h='100%' alignItems='center' justifyContent='center'>
                    <Text as='b' color='gray.400' fontSize='3xl'>目前無銷售紀錄</Text>
                </Flex>
            )}
        </>
    )
}
