import React, { ReactNode } from "react";
import {
	Modal as ChakraModal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Button,
} from '@chakra-ui/react';

type ModalPropsType = {
	title: string;
	children: ReactNode;
	isOpen: boolean;
	onClose: () => void;
};

function Modal({ isOpen, onClose, children, title }: ModalPropsType) {
	return (
		<ChakraModal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader textTransform='capitalize'>{title}</ModalHeader>
				<ModalCloseButton />
				<ModalBody marginBottom={4}>{children}</ModalBody>
			</ModalContent>
		</ChakraModal>
	);
}

export default Modal;
