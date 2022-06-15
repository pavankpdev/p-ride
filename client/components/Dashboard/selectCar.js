import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button, Box, Image, Flex, Heading,
    Badge, Stack, Text, Grid, useBreakpointValue, useDisclosure
} from '@chakra-ui/react'
import Slider from "react-slick";
import {useContext, useState} from "react";
import {BsArrowRightCircle} from 'react-icons/bs'

// CONTEXT
import {LocationContext} from "../../context/location";

// HOOK
import useSocket from "../../hooks/useSocket";
import SearchRide from "../searchRide";

const SelectCar = ({isOpen, onClose}) => {
    const [carTypeIndex, setCarTypeIndex] = useState(0)

    const { distance, pickUpLocation, dropLocation, duration } = useContext(LocationContext)

    const modelSize = useBreakpointValue({ base: 'full', lg: 'xl' })

    const {socket} = useSocket();

    const {
        isOpen: isSearchCarModalOpen,
        onOpen: onSearchCarModalOpen,
        onClose: onSearchCarModalClose
    } = useDisclosure()

    const handleChange = (index) => {
        setCarTypeIndex(index)
    }

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        afterChange: handleChange,
        arrows: true
    };

    const vehicleData = [
        {
            type: 'SUV',
            basePrice: 50,
            features: ['Extra seats', 'Extra luggage', 'Top partners']
        },
        {
            type: 'Sedan',
            basePrice: 35,
            features: ['Spacious', 'Extra luggage', 'Top partners', 'Entertainment']
        },
        {
            type: 'Mini',
            basePrice: 30,
            features: ['Comfy', 'Budget', 'Luggage Space', 'Entertainment']
        }
    ]


    const bookRide = () => {
        onSearchCarModalOpen()
        const otp = Math.floor(1000 + Math.random() * 9000);
        const payload = {
            rideId: 1,
            from: {
                formatted_address: pickUpLocation.formattedAddress,
                geometry: pickUpLocation.geometry
            },
            to: {
                formatted_address: dropLocation.formattedAddress,
                geometry: dropLocation.geometry
            },
            carType: vehicleData[carTypeIndex].type,
            price: Math.round(vehicleData[carTypeIndex]?.basePrice * distance),
            distance: distance.toFixed(2),
            otp,
            fullname: "Pavan",
            phno: "908080808080",
            userId: '123',
        }

        socket.emit('NEW_RIDE_REQUEST', payload)
    }


    return <>
        <SearchRide isOpen={isSearchCarModalOpen} onClose={onSearchCarModalClose} />

        <Modal isOpen={isOpen} onClose={onClose} size={modelSize}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Select Vehicle Type</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Box w={'100%'} h={'50%'} p={'1rem'}>
                        <Slider {...settings}>
                            <Box w={'100%'} h={'100%'} bg={'white'}>
                                <Image src={'https://i.ibb.co/LrPVWKn/SUV.jpg'} alt={'suv image'} w={'100%'} h={'100%'} />
                            </Box>
                            <Box w={'100%'} h={'100%'} bg={'white'}>
                                <Image src={'https://i.ibb.co/GMbD5Cq/sedan.webp'} alt={'sedan image'} w={'100%'} h={'100%'} />
                            </Box>
                            <Box w={'100%'} h={'100%'} bg={'white'}>
                                <Image src={'https://i.ibb.co/VHhb7wW/prime.webp'} alt={'mini image'} w={'100%'} h={'100%'} />
                            </Box>
                        </Slider>
                    </Box>

                    <Flex justify={'space-between'} alignItems={'center'} my={'1rem'} p={'1rem'}>
                        <Flex flexDir={'column'} gap={'.2rem'} w={'70%'}>
                            <Heading as={'h1'} size={'2xl'} fontWeight={800}>
                                {vehicleData[carTypeIndex]?.type}
                            </Heading>
                            <Stack direction='row' flexWrap={'wrap'} w={'100%'} gap={'4px'}>
                                {
                                    vehicleData[carTypeIndex]?.features.map((feature, index) => <Badge colorScheme='green' variant='solid' rounded={'full'} key={index} >{feature}</Badge>)
                                }
                            </Stack>
                        </Flex>
                        <Flex flexDir={'column'} gap={'.2rem'} alignItems={'flex-end'} w={'30%'}>
                            <Heading as={'h6'} size={'sm'} fontWeight={700} color={'gray.500'}>
                                baseprice
                            </Heading>
                            <Heading as={'h3'} size={'sm'} fontWeight={700}>
                                {vehicleData[carTypeIndex]?.basePrice} $PRI/km
                            </Heading>
                        </Flex>
                    </Flex>

                    <Flex w={'100%'} bg={'gray.200'} p={'1rem'} flexDir={'column'} rounded={'lg'} gap={'1rem'}>
                        <Flex>
                            <Flex flexDir={'column'} gap={'.2rem'} w={'60%'}>
                                <Heading as={'h4'} size={'md'} fontWeight={600}>
                                    Total fare
                                </Heading>
                                <Text fontSize={'sm'}>
                                    The fare includes base processing fee.
                                </Text>
                            </Flex>
                            <Flex flexDir={'column'} gap={'.2rem'} alignItems={'flex-end'} w={'40%'}>
                                <Heading as={'h3'} size={'md'} fontWeight={800} color={'brand.400'}>
                                    {Math.round(vehicleData[carTypeIndex]?.basePrice * distance)} $PRI
                                </Heading>
                            </Flex>
                        </Flex>

                        <Flex flexDir={'column'} gap={'.2rem'}>
                            <Heading as={'h6'} size={'sm'} fontWeight={600} >
                                Please note
                            </Heading>
                            <Text fontSize={'sm'}>
                                Total fare may change if toll, route or destination changes or if your ride takes longer due to traffic or other factors.
                            </Text>
                        </Flex>
                    </Flex>

                    <Flex flexDir={'column'} my={'1rem'} gap={'.5rem'}>
                        <Heading as={'h4'} size={'md'} fontWeight={600} p={0}>Distance</Heading>
                        <Text>Duration: {duration.toFixed(2)}</Text>
                        <Grid gridTemplateColumns={'45% 10% 45%'} >
                            <Flex w={'full'} alignItems={'flex-start'} gap={'5px'} bg={'gray.100'} p={'5px'} rounded={'md'} >
                                <Text w={'full'} fontSize={'sm'} >
                                    {pickUpLocation.formattedAddress}
                                </Text>
                            </Flex>
                            <Flex flexDir={'column'} w={'full'} alignItems={'center'} textAlign={'center'}>
                                <Text fontSize={'sm'} >{distance.toFixed(2)} kms</Text>
                                <Text color={'brand.500'}>
                                    <BsArrowRightCircle />
                                </Text>
                            </Flex>
                            <Flex w={'full'} alignItems={'flex-start'} gap={'5px'} bg={'gray.100'} p={'5px'} rounded={'md'} >
                                <Text w={'full'} fontSize={'sm'}  >
                                    {dropLocation.formattedAddress}
                                </Text>
                            </Flex>
                        </Grid>
                    </Flex>

                </ModalBody>

                <ModalFooter>
                    <Flex flexDir={'column'} w={'100%'} gap={'10px'}>
                        <Button colorScheme='brand' w={'full'} onClick={bookRide}>
                            Book ride
                        </Button>
                        <Button variant='ghost' onClick={onClose}>Go Back</Button>
                    </Flex>

                </ModalFooter>
            </ModalContent>
        </Modal>
    </>
}

export default SelectCar;