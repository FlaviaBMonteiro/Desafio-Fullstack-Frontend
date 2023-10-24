import React, { useState } from "react";
import {
	Box,
	Image,
	Flex,
	Text,
	IconButton,
	HStack,
	VStack,
	Tooltip,
	Stack,
	Spacer,
	Menu,
} from "@chakra-ui/react";
import { HamburgerIcon, StarIcon, EmailIcon, PhoneIcon } from "@chakra-ui/icons";
import EditContactMenu from "./editContactMenu";
import { iContactCard } from "@/types/contact.interface";
import formatPhoneNumber from "@/utils/formatPhone";

const ContactCard = ({ id, email, name, phone, imgURL, isFavorite }: iContactCard) => {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<Box
			maxW={{ base: "90vw", md: "240px" }}
			w="100%"
			minH="240px"
			bgImage={`url(${imgURL})`}
			bgSize="cover"
			bgPosition="center"
			p={4}
			m={2}
			borderRadius="lg"
			boxShadow="md"
			overflow="hidden"
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			position="relative"
		>
			<Flex justify="flex-end" position="absolute" top="0px" right="-5px">
				<Menu>
					<EditContactMenu
						id={id}
						name={name}
						phone={phone}
						email={email}
						imgURL={imgURL}
						isFavorite={isFavorite}
					/>
				</Menu>
			</Flex>
			<Box
				bgColor={"blue.50"}
				p={2}
				position="absolute"
				bottom="0"
				left="0"
				right="0"
				transition="0.3s"
				height={isHovered ? "50%" : "17%"}
			>
				{!isHovered ? (
					<Flex justifyContent="space-between" alignItems="center">
						<HStack spacing={2} alignItems="center">
							{isFavorite ? (
								<Tooltip label="Favorito" placement="top">
									<StarIcon color="blue.700" />
								</Tooltip>
							) : (
								<Tooltip label="Favorito" placement="top">
									<StarIcon color="transparent" />
								</Tooltip>
							)}
							<Text>{name}</Text>
						</HStack>
						<Spacer />
						<HStack spacing={2}>
							<PhoneIcon />
							<EmailIcon />
						</HStack>
					</Flex>
				) : (
					<Box>
						<HStack spacing={2} justifyContent="flex-start">
							<Text marginLeft="22px" fontSize="2xl" as="b">
								{name}
							</Text>
							<Spacer />
							{isFavorite ? (
								<Tooltip label="Favorito" placement="top" marginRight="22px">
									<StarIcon color="blue.700" />
								</Tooltip>
							) : (
								<Tooltip label="Favorito" placement="top" marginRight="22px">
									<StarIcon color="transparent" />
								</Tooltip>
							)}
						</HStack>
						<HStack spacing={2} justifyContent="flex-start">
							<PhoneIcon />
							<Text> {formatPhoneNumber(phone)}</Text>
						</HStack>
						<HStack spacing={2} justifyContent="flex-start">
							<EmailIcon />
							<Text>{email}</Text>
						</HStack>
					</Box>
				)}
			</Box>
		</Box>
	);
};

export default ContactCard;
