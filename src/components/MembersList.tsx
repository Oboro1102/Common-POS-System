import { useEffect } from 'react'
import API from "../api/index"
import { useAppSelector, useAppDispatch } from '../store/hooks'
import { membersList, initialMembersList, type membersListType } from '../store/modules/membersSlice.ts'
import { Flex, Text, Avatar, Spinner, Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableContainer } from "@chakra-ui/react"
import { PiGenderMaleBold, PiGenderFemaleBold } from "react-icons/pi"
import { OrderHistoryViewer } from "../components/OrderHistoryViewer"

export const MembersList = () => {
    // state
    const members = useAppSelector(membersList);

    // methods
    const dispatch = useAppDispatch();
    const getMembersList = (totalNumbers: number) => {
        if (members.length < 1) {
            API.MEMBERS.GET_All_MEMBERS(totalNumbers).then((result: { data: { results: membersListType[] } }) => {
                const { results } = result.data
                dispatch(initialMembersList(results))
            })
        }
    }

    // hooks
    useEffect(() => {
        getMembersList(7)
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
            {members.length > 0 ? (
                <TableContainer>
                    <Table size='sm'>
                        <Thead>
                            <Tr>
                                <Th>消費紀錄</Th>
                                <Th>姓名</Th>
                                <Th>電話</Th>
                                <Th>電子郵件</Th>
                                <Th>地址</Th>
                                <Th>註冊時間</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {members.map((item: membersListType) =>
                                <Tr key={item.login.uuid}>
                                    <Td textAlign='center'>
                                        <OrderHistoryViewer id={item.login.uuid} />
                                    </Td>
                                    <Td>
                                        <Flex alignItems='center' justifyContent='flex-start'>
                                            <Avatar name={item.name.last} src={item.picture.thumbnail} mr='2' />
                                            <Text mr='1'>{`${item.name.last}${item.name.first}`}</Text>
                                            {item.gender === 'male' ? (<PiGenderMaleBold color="cyan" />) : (<PiGenderFemaleBold color="pink" />)}
                                        </Flex>
                                    </Td>
                                    <Td>{item.phone}</Td>
                                    <Td>{item.email}</Td>
                                    <Td>{`${item.location.state}${item.location.country}${item.location.city}`}</Td>
                                    <Td>{item.registered.date}</Td>
                                </Tr>)}
                        </Tbody>
                        <Tfoot>
                            <Tr>
                                <Th>消費紀錄</Th>
                                <Th>姓名</Th>
                                <Th>電話</Th>
                                <Th>電子郵件</Th>
                                <Th>地址</Th>
                                <Th>註冊時間</Th>
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
        </>
    )
}
