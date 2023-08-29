import { useRef, useState } from "react";
import { useAppDispatch } from '../store/hooks';
import { addServe, editServe } from '../store/modules/systemSlice';
import { useDisclosure, Box, Text, Button, Input, NumberInput, NumberInputField, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, DrawerFooter } from '@chakra-ui/react'
import { PiPlusBold, PiPencilBold } from "react-icons/pi"

const useForMap = {
    add: {
        label: '新增服務',
        buttonSize: 'sm',
        buttonColor: 'green',
        icon: <PiPlusBold />,
    },
    edit: {
        label: '編輯服務',
        buttonSize: 'xs',
        buttonColor: 'blue',
        icon: <PiPencilBold />,
    }
}

interface serveItemType {
    id: string,
    name: string,
    image: string,
    spec: string,
    price: number,
    group: string
}

export const SystemServeAdditory = (props: {
    useFor: keyof typeof useForMap,
    disabled: boolean,
    editData: serveItemType
}) => {
    // state
    const { useFor, editData, disabled } = props
    const [newServe, setNewServe] = useState(editData)

    // methods
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = useRef(null)
    const dispatch = useAppDispatch()
    const addNewServe = (data: serveItemType) => {
        dispatch(addServe(data))
        setNewServe({
            id: new Date().toISOString(),
            name: '',
            image: '',
            spec: '',
            price: 0,
            group: ''
        })
        onClose()
    }
    const checkDataValue = (data: serveItemType) => {
        const { name, image, spec, price, group } = data
        return price <= 0 || name.length < 1 || image.length < 1 || spec.length < 1 || group.length < 1
    }
    const updateServe = (data: serveItemType) => {
        dispatch(editServe(data))
        onClose()
    }

    return (
        <>
            <Button isDisabled={disabled} ref={btnRef} size={useForMap[useFor].buttonSize} colorScheme={useForMap[useFor].buttonColor} leftIcon={useForMap[useFor].icon} onClick={onOpen}>{useForMap[useFor].label}</Button>
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
                    <DrawerHeader>{useForMap[useFor].label}</DrawerHeader>
                    <DrawerBody>
                        <Box>
                            <Text as='b' fontSize='sm' color='gray.300'>服務名稱</Text>
                            <Input mt='1' value={newServe.name} placeholder='請輸入服務名稱' onChange={(e) => {
                                setNewServe(prevState => ({
                                    ...prevState,
                                    name: e.target.value
                                }))
                            }} />
                        </Box>
                        <Box mt='4'>
                            <Text as='b' fontSize='sm' color='gray.300'>圖片連結</Text>
                            <Input mt='1' value={newServe.image} placeholder='請輸入圖片連結' onChange={(e) => {
                                setNewServe(prevState => ({
                                    ...prevState,
                                    image: e.target.value
                                }))
                            }} />
                        </Box>
                        <Box mt='4'>
                            <Text as='b' fontSize='sm' color='gray.300'>規格</Text>
                            <Input mt='1' value={newServe.spec} placeholder='請輸入規格' onChange={(e) => {
                                setNewServe(prevState => ({
                                    ...prevState,
                                    spec: e.target.value
                                }))
                            }} />
                        </Box>
                        <Box mt='4'>
                            <Text as='b' fontSize='sm' color='gray.300'>價格</Text>
                            <NumberInput mt='1' defaultValue={0} min={0} value={newServe.price} placeholder='請輸入價格'>
                                <NumberInputField onChange={(e) => {
                                    setNewServe(prevState => ({
                                        ...prevState,
                                        price: Number(e.target.value.replace(/[^0-9]/g, ""))
                                    }))
                                }} />
                            </NumberInput>
                        </Box>
                        <Box mt='4'>
                            <Text as='b' fontSize='sm' color='gray.300'>群組分類</Text>
                            <Input mt='1' value={newServe.group} placeholder='請輸入群組分類' onChange={(e) => {
                                setNewServe(prevState => ({
                                    ...prevState,
                                    group: e.target.value
                                }))
                            }} />
                        </Box>
                    </DrawerBody>
                    <DrawerFooter>
                        <Button variant='outline' mr={3} onClick={onClose}>取消</Button>
                        {useFor === 'add' ?
                            <Button isDisabled={checkDataValue(newServe)} colorScheme='green' onClick={() => { addNewServe(newServe) }}>新增</Button> :
                            <Button isDisabled={checkDataValue(newServe)} colorScheme='green' onClick={() => { updateServe(newServe) }}>更新</Button>}
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )
}