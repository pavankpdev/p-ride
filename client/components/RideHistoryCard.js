import {Avatar, Flex, Heading, Text} from "@chakra-ui/react";
import {BsArrowDownCircleFill, BsPatchCheckFill} from "react-icons/bs";
import {MdCancel, MdPending} from 'react-icons/md'

const RideHistoryCard = (props) => {
    return <>
        <Flex
            flexDir={'column'}
            gap={'1rem'}
            w={'full'}
            px={'1.5rem'}
            py={'1rem'}
            bg={'white'}
            rounded={'lg'}
            boxShadow={'lg'}
            width={'100%'}
        >
            <Flex w={'full'}>
                <Flex flexDir={'column'}
                      gap={'10px'}
                      w={'60%'}
                >
                    <Heading size={'md'} noOfLines={2}>
                        {props.from}
                    </Heading>
                    <Text color={'brand.500'} fontSize={'xl'} textAlign={'center'}>
                        <BsArrowDownCircleFill />
                    </Text>
                    <Heading size={'md'} noOfLines={2}>
                        {props.to}
                    </Heading>
                </Flex>
                <Flex w={'40%'} gap={'5px'} h={'100%'} justify={'center'}>
                    <Flex
                        flexDir={'column'}
                        alignItems={'center'}
                        bg={'brand.50'}
                        p={'10px'}
                        color={'brand.500'}
                        rounded={'md'}
                    >
                        <Heading>
                            {props.distance}
                        </Heading>
                        <Heading size={'md'}>
                            kms
                        </Heading>
                    </Flex>
                    <Flex
                        flexDir={'column'}
                        alignItems={'center'}
                        bg={'brand.50'}
                        p={'10px'}
                        color={'brand.500'}
                        rounded={'md'}
                    >
                        <Heading>
                            {props.price}
                        </Heading>
                        <Heading size={'md'}>
                            $PRI
                        </Heading>
                    </Flex>
                </Flex>
            </Flex>
            <Flex w={'100%'}>
                <Text color={'gray.400'} w={'60%'} noOfLines={2} fontSize={'sm'} fontWeight={600}>{props.timestamp}</Text>

                <Flex w={'40%'} color={ props.isComplete ? 'green.500' : (props.isCancelled ? 'red.500' : 'teal.500')} alignItems={'center'} gap={'5px'} justify={'center'}>
                    { props.isComplete && <BsPatchCheckFill/>}
                    { props.isCancelled && <MdCancel/>}
                    { props.isConfirmed && <MdPending/>}
                    <Text fontWeight={600}>
                        {props.isComplete ? 'Completed' : (props.isCancelled ? 'Cancelled' : 'On Going')}
                    </Text>
                </Flex>
            </Flex>
        </Flex>
    </>
}

export default RideHistoryCard