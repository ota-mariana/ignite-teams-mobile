import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import { AppError } from '@utils/AppError';

import { Header } from '@components/Header';
import { HighLight } from '@components/HighLight';
import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { groupCreate } from '@storage/group/groupCreate';

import { Container, Content, UsersIcon } from './styles';

export function NewGroup() {
  const [group, setGroup] = useState('');
  const navigation = useNavigation();

  async function handleNew() {
    try {
      if (group.trim().length === 0) {
        return Alert.alert('Novo Time', 'Informe o nome do time.');
      }
      await groupCreate(group)
      navigation.navigate('players', { group });
    } catch(error) {
      if (error instanceof AppError) {
        Alert.alert('Novo Time', error.message);
      } else {
        Alert.alert('Novo Time', 'Não foi possível criar um novo time.');
        console.log(error);
      }
    }
  }

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

      <Input placeholder="Nome do time" onChangeText={setGroup} />

      <Button
        title="Criar"
        style={{ marginTop: 20 }}
        onPress={handleNew}
      />
    </Container>
  );
}