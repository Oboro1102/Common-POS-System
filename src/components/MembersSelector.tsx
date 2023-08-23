import { useRef, useEffect } from "react";
import API from "../api/index"
import { useAppSelector, useAppDispatch } from '../store/hooks'
import { membersList, initialMembersList, type membersListType } from '../store/modules/membersSlice.ts'
import { useDisclosure, Flex, Spinner, Avatar, Text, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, TableContainer, Table, Thead, Tr, Th, Td, Tbody, Tfoot } from '@chakra-ui/react'
import { PiGenderMaleBold, PiGenderFemaleBold } from "react-icons/pi"

export const MembersSelector = (props: { getSelectedMember: (arg0: membersListType) => void; }) => {
    // state
    const members = useAppSelector(membersList);

    // methods
    const { isOpen, onOpen, onClose } = useDisclosure()
    const initialRef = useRef(null)
    const finalRef = useRef(null)
    const dispatch = useAppDispatch();
    const getMembersList = (totalNumbers: number) => {
        if (members.length < 1) {
            API.MEMBERS.GET_All_MEMBERS(totalNumbers).then((result: { data: { results: membersListType[] } }) => {
                const { results } = result.data
                dispatch(initialMembersList(results))
            })
        }
    }
    const setSelectedMember = (member: membersListType) => {
        props.getSelectedMember(member)
        onClose()
    }

    // hooks
    useEffect(() => {
        getMembersList(10)
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
            <Button size='sm' colorScheme='purple' onClick={onOpen}>選取購買會員</Button>
            <Modal
                size='2xl'
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
                scrollBehavior='inside'
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>選取會員</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        {members.length > 0 ? (
                            <TableContainer>
                                <Table size='sm'>
                                    <Thead>
                                        <Tr>
                                            <Th>姓名</Th>
                                            <Th>電話</Th>
                                            <Th />
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {members.map((item: membersListType) =>
                                            <Tr key={item.login.uuid}>
                                                <Td>
                                                    <Flex alignItems='center' justifyContent='flex-start'>
                                                        <Avatar name={item.name.last} src={item.picture.thumbnail} mr='2' />
                                                        <Text mr='1'>{`${item.name.last}${item.name.first}`}</Text>
                                                        {item.gender === 'male' ? (<PiGenderMaleBold color="cyan" />) : (<PiGenderFemaleBold color="pink" />)}
                                                    </Flex>
                                                </Td>
                                                <Td>{item.phone}</Td>
                                                <Td textAlign='right'>
                                                    <Button size='sm' colorScheme='teal' onClick={() => { setSelectedMember(item) }}>選擇</Button>
                                                </Td>
                                            </Tr>)}
                                    </Tbody>
                                    <Tfoot>
                                        <Tr>
                                            <Th>姓名</Th>
                                            <Th>電話</Th>
                                            <Th />
                                        </Tr>
                                    </Tfoot>
                                </Table>
                            </TableContainer >
                        ) : (
                            <Flex mt='35vh' align='center' justifyContent='center'>
                                <Spinner
                                    thickness='6px'
                                    speed='0.65s'
                                    color='red.500'
                                    size='xl'
                                />
                            </Flex>
                        )}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}