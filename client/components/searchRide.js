import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    Heading, Text,
} from '@chakra-ui/react'
import Lottie from 'react-lottie';

import SearchAnimation from '../asset/103853-searching.json'

const SearchRide = ({ isOpen, onClose }) => {

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: SearchAnimation,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    return <>
        <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay
                bg='blackAlpha.300'
                backdropFilter='blur(10px)'
            />
            <ModalContent>
                <ModalBody py={'2rem'}>
                    <Lottie
                        options={defaultOptions}
                        height={200}
                        width={200}
                    />
                    <Heading as={'h3'} size={'lg'} textAlign={'center'}>
                        Searching your ride
                    </Heading>
                    <Text textAlign={'center'}>
                        We are contacting drivers nearby you, please wait till one of them accepts your ride.
                    </Text>
                </ModalBody>
            </ModalContent>
        </Modal>
    </>
}

export default SearchRide;