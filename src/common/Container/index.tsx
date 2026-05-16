import { StyledContainer } from "./styles";
import { ContainerProps } from "../types";

const Container = ({ border, children, className }: ContainerProps) => (
  <StyledContainer border={border} className={className}>{children}</StyledContainer>
);

export default Container;
