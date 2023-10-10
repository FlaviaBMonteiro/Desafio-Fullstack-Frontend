import { useToast } from "@chakra-ui/react";

const CustomToast = () => {
	const toast = useToast();

	const showToast = (title: string, status: any, description: string) => {
		toast({
			title: title,
			status: status,
			description: description,
			position: "top",
			duration: 3000,
			isClosable: true,
			variant: "left-accent",
		});
	};

	return { showToast };
};

export default CustomToast;
