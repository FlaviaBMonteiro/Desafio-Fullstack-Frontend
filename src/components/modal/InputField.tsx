import React from "react";
import { FormControl, FormErrorMessage, FormLabel, Input as ChakraInput } from "@chakra-ui/react";
import { FieldError } from "react-hook-form";

interface InputFieldProps {
	label: string;
	id: string;
	error?: FieldError;
	required?: boolean;
	type?: string;
}

const InputField: React.FC<InputFieldProps> = ({
	label,
	id,
	error,
	required = true,
	type = "text",
}) => {
	return (
		<FormControl id={id} isRequired={required} isInvalid={!!error}>
			<FormLabel>{label}</FormLabel>
			<ChakraInput
				isRequired={required}
				focusBorderColor="blue.300"
				errorBorderColor="red.300"
				id={id}
				type={type}
			/>
			<FormErrorMessage margin="-20px 0px 0px 0px" fontSize="small">
				{error && error.message}
			</FormErrorMessage>
		</FormControl>
	);
};

export default InputField;
