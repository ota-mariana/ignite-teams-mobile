import { Header } from '@components/Header';
import { Container, Content, UsersIcon } from './styles';
import { HighLight } from '@components/HighLight';
import { Button } from '@components/Button';
import { Input } from '@components/Input';

export function NewGroup() {
  return (
    <Container>
      <Header showBackButton />

      <Content>
        <UsersIcon />
        <HighLight
          title="Novo Time"
          subtitle="Crie um time para adicionar pessoas"
        />
      </Content>

      <Input placeholder="Nome do time" />

      <Button
        title="Criar"
        style={{ marginTop: 20 }}
      />
    </Container>
  );
}