import { useRef } from "react";
import { useAppSelector } from '../store/hooks.ts'
import { orderHistory, type orderHistoryType } from '../store/modules/ordersSlice.ts'
import { useDisclosure, Flex, Image, Text, Tag, IconButton, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, TableContainer, Table, Thead, Tr, Th, Td, Tbody, Tfoot } from '@chakra-ui/react'
import { PiEyeBold } from "react-icons/pi"

export const OrderHistoryViewer = (props: { id: string }) => {
    // state
    const { id } = props
    const ordersList = useAppSelector(orderHistory);
    const history = (): orderHistoryType[] => {
        return ordersList.filter(item => item.buyer?.login.uuid === id)
    }
    // methods
    const { isOpen, onOpen, onClose } = useDisclosure()
    const initialRef = useRef(null)
    const finalRef = useRef(null)

    return (
        <>
            <IconButton size='sm' colorScheme='purple' aria-label='消費紀錄' icon={<PiEyeBold />} onClick={onOpen} />
            <Modal
                size='4xl'
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
                scrollBehavior='inside'
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>消費紀錄</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        {history().length > 0 ? (
                            <TableContainer>
                                <Table size='sm'>
                                    <Thead>
                                        <Tr>
                                            <Th>訂單編號</Th>
                                            <Th>購買時間</Th>
                                            <Th>購買項目</Th>
                                            <Th isNumeric>消費金額</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {history().map((item: orderHistoryType) =>
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
                                                                objectFit='cover'
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
                                                <Td fontSize='lg' isNumeric>${item.amount.toLocaleString()}</Td>
                                            </Tr>)}
                                    </Tbody>
                                    <Tfoot>
                                        <Tr>
                                            <Th>訂單編號</Th>
                                            <Th>購買時間</Th>
                                            <Th>購買項目</Th>
                                            <Th isNumeric>消費金額</Th>
                                        </Tr>
                                    </Tfoot>
                                </Table>
                            </TableContainer >
                        ) : (
                            <Flex w='100%' h='100%' alignItems='center' justifyContent='center'>
                                <Text as='b' color='gray.400' fontSize='2xl'>目前無消費紀錄</Text>
                            </Flex>
                        )}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}