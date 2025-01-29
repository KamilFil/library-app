import { ReactNode } from 'react';
import {
  StyledBasicWrapper,
  StyledBasicWrapperContainer,
} from './BasicWrapper.styled';

interface BasicWrapperInterface {
  children: ReactNode;
}

export const BasicWrapper = ({ children }: BasicWrapperInterface) => {
  return (
    <StyledBasicWrapperContainer>
      <StyledBasicWrapper>{children}</StyledBasicWrapper>
    </StyledBasicWrapperContainer>
  );
};
