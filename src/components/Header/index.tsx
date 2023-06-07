import { BackIcon, ButtonBack, Container, Logo } from './styles';
import logoImg from '../../assets/logo.png';
import { useNavigation } from '@react-navigation/native';

type Props = {
  showBackButton?: boolean;
};

export function Header({ showBackButton = false }: Props) {
  const navigation = useNavigation();

  function handleGoBack() {
    navigation.navigate('groups');
  }
  return (
    <Container>
      {
        showBackButton && (
          <ButtonBack onPress={handleGoBack}>
            <BackIcon />
          </ButtonBack>
        )
      }

      <Logo source={logoImg} />
    </Container>
  );
}