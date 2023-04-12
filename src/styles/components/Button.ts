import { defineStyleConfig, ComponentStyleConfig } from "@chakra-ui/react";

export const ButtonStyle: ComponentStyleConfig = {
  baseStyle: {
    fontWeight: "semibold",
    borderRadius: "4px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    fontFamily: "Inter, sans-serif",
  },
  sizes: {
    sm: {
      fontSize: "14px",
      h: "38px",
      px: "20px",
      py: "12px",
    },
    md: {
      fontSize: "16px",
      h: "48px",
      px: "28px",
      py: "12px",
    },
  },
  variants: {
    grey1: {
      borderColor: "#0B0D0D",
      bg: "#0B0D0D",
      color: "#ffffff",
      _hover: { bg: "#212529", borderColor: "#212529" },
    },
    negative: {
      borderColor: "#DEE2E6",
      bg: "#DEE2E6",
      color: "#495057",
      _hover: { bg: "#CED4DA", borderColor: "#CED4DA" },
    },
    disable: {
      borderColor: "#CED4DA",
      bg: "#CED4DA",
      color: "#FFFFFF",
    },
    brand1: {
      borderColor: "#4529E6",
      bg: "#4529E6",
      color: "#FFFFFF",
      _hover: { bg: "#5126EA", borderColor: "#5126EA" },
    },
    brandOpacity: {
      borderColor: "#EDEAFD",
      bg: "#EDEAFD",
      color: "#4529E6",
    },
    light: {
      borderColor: "#FDFDFD",
      bg: "#FDFDFD",
      color: "#212529",
    },
    outlineLight: {
      borderColor: "#FDFDFD",
      bg: "#FDFDFD",
      color: "#FDFDFD",
      _hover: { color: "#212529" },
    },
    outline: {
      borderColor: "#0B0D0D",
      bg: "#FDFDFD",
      color: "#0B0D0D",
      _hover: { bg: "#212529", borderColor: "#212529", color: "#FDFDFD" },
    },
    outline2: {
      borderColor: "#ADB5BD",
      bg: "#FDFDFD",
      color: "#0B0D0D",
      _hover: { bg: "#212529", borderColor: "#212529", color: "#FDFDFD" },
    },
    outlineBrand: {
      borderColor: "#4529E6",
      bg: "#FDFDFD",
      color: "#4529E6",
      _hover: { bg: "#EDEAFD", borderColor: "#4529E6" },
    },
    alert: {
      borderColor: "#FFE5E5",
      bg: "#FFE5E5",
      color: "#CD2B31",
      _hover: { bg: "#FDD8D8", borderColor: "#FDD8D8" },
    },
    sucess: {
      borderColor: "#DDF3E4",
      bg: "#DDF3E4",
      color: "#18794E",
      _hover: { bg: "#CCEBD7", borderColor: "#CCEBD7" },
    },
    brandDisable: {
      borderColor: "#B0A6F0",
      bg: "#B0A6F0",
      color: "#ffffff",
    },
  },
  defaultProps: {
    size: "md",
    variant: "brand1",
  },
};

export const Button = defineStyleConfig(ButtonStyle);
