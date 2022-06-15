import React, {useContext} from "react";
import {Avatar, Box, Button, Flex, Heading, Text} from "@chakra-ui/react";
import {BsArrowDownCircle} from "react-icons/bs";
import {IRideRequest, LocationContext} from "context/Location";


const RideRequestCard: React.FC<IRideRequest> = (props) => {

    const {passRide} = useContext(LocationContext)

    const handlePassRide = () => {
        passRide(props.socketId)
    }

    return <>
        <Box
            w={'100%'}
            p={'1rem'}
            bg={'white'}
            rounded={'lg'}
            boxShadow={'md'}
            border={'1px solid white'}
            transition={'all .4s linear'}
            cursor={'pointer'}
            _hover={{
                borderColor: 'brand.500',
                transition: 'all .4s linear'
            }}
        >
            <Flex w={'100%'}>
                <Flex flexDirection={'column'} w={'80%'} gap={'1rem'} >
                    <Flex flexDir={'column'} w={'100%'}>
                        <Text fontSize={'md'} w={'100%'} noOfLines={1}>{props.from.formatted_address}</Text>
                        <Text fontSize={'xs'} w={'100%'} fontWeight={800}><BsArrowDownCircle /></Text>
                        <Text fontSize={'md'} w={'100%'} noOfLines={1}>{props.to.formatted_address}</Text>
                    </Flex>
                    <Flex alignItems={'center'} gap={'5px'}>
                        <Avatar name={'Pavan'} size={'xs'}/>
                        <Text>{props.fullname}</Text>
                    </Flex>
                </Flex>
                <Flex flexDir={'column'} alignItems={'center'} justifyContent={'center'} h={'100%'} w={'20%'}>
                    <Heading as={'h3'}>{Math.round(parseInt(`${props.distance}`))}</Heading>
                    <Heading as={'h5'} size={'sm'}>Kms</Heading>
                </Flex>
            </Flex>
            <Button mt={'10px'} w={'full'} size={'sm'} colorScheme={'brand'}>Accept Ride</Button>
            <Button mt={'2px'} w={'full'} size={'sm'} variant={'ghost'} colorScheme={'brand'} onClick={handlePassRide}>Pass</Button>
        </Box>
    </>
}

export default RideRequestCard;