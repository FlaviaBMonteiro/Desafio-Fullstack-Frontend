import React from "react";
import { MenuItem } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";

interface FavoriteButtonProps {
	isFavorite: boolean;
	onClick: () => void;
}

const FavoriteButton = ({ isFavorite, onClick }: FavoriteButtonProps) => {
	const toggleFavorite = () => {
		onClick();
	};

	return (
		<MenuItem onClick={toggleFavorite} icon={<StarIcon />}>
			{isFavorite ? "Remover dos Favoritos" : "Adicionar aos Favoritos"}
		</MenuItem>
	);
};

export default FavoriteButton;
