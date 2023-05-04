import { TouchableOpacityProps } from 'react-native';
import { Container, ButtonTitle, ButtonTypeStyleProps } from './styles';

type Props = TouchableOpacityProps & {
  title: string;
  type?: ButtonTypeStyleProps;
}

export function Button({ title, type = 'PRIMARY', ...rest }: Props) {
  return (
    <Container type={type} { ...rest }>
      <ButtonTitle>
        { title }
      </ButtonTitle>
    </Container>
  );
}