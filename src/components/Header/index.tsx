import { BackIcon, ButtonBack, Container, Logo } from './styles';
import logoImg from '../../assets/logo.png';

type Props = {
  showBackButton?: boolean;
};

export function Header({ showBackButton = false } : Props) {
  return (
    <Container>
      {
        showBackButton && (
          <ButtonBack>
            <BackIcon />
          </ButtonBack>
        )
      }

      <Logo source={logoImg} />
    </Container>
  );
}