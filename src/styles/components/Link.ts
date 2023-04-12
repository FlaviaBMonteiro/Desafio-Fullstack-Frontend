import { defineStyleConfig, ComponentStyleConfig } from "@chakra-ui/react";

export const LinkStyle: ComponentStyleConfig = {
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
    linkDefault: {
      borderColor: "#ffffff",
      bg: "#ffffff",
      color: "#0B0D0D",
      _hover: { bg: "#F1F3F5", borderColor: "#F1F3F5", textDecoration: "none" },
    },
  },
  defaultProps: {
    size: "md",
    variant: "linkDefault",
  },
};

export const Link = defineStyleConfig(LinkStyle);
