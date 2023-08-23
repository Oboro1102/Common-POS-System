import { useRef } from "react";
import { IconButton, Tooltip, useDisclosure, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody } from '@chakra-ui/react'
import { PiFileMagnifyingGlassBold, PiGearBold, PiUserListBold } from "react-icons/pi"
import { OrdersList } from "../components/OrdersList"
import { MembersList } from "../components/MembersList"
import { SystemConfig } from "../components/SystemConfig"

const useForMap = {
    orders: {
        label: '銷售查詢',
        icon: <PiFileMagnifyingGlassBold />,
        header: '銷售紀錄',
        body: <OrdersList />
    },
    members: {
        label: '會員查詢',
        icon: <PiUserListBold />,
        header: '會員列表',
        body: <MembersList />

    },
    system: {
        label: '系統設定',
        icon: <PiGearBold />,
        header: '服務列表',
        body: <SystemConfig />
    }
}

export const ShareDrawer = (props: {
    useFor: keyof typeof useForMap
}) => {
    // state
    const { useFor } = props

    // methods
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = useRef(null)

    return (
        <>
            <Tooltip label={useForMap[useFor].label} placement='top' bg='yellow.200' fontSize='xs'>
                <IconButton
                    ref={btnRef} colorScheme='blue' onClick={onOpen}
                    aria-label={useForMap[useFor].label}
                    fontSize='1.5rem'
                    icon={useForMap[useFor].icon}
                />
            </Tooltip>
            <Drawer
                isOpen={isOpen}
                placement='right'
                size='xl'
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>{useForMap[useFor].header}</DrawerHeader>
                    <DrawerBody>{useForMap[useFor].body}</DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    )
}