import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';

import { groupCreate } from '@storage/group/groupCreate';

import { AppError } from '@utils/AppError';

import { Header } from '@components/Header';
import { HighLight } from '@components/HighLight';
import { Button } from '@components/Button';
import { Input } from '@components/Input';

import { Container, Content, UsersIcon } from './styles';

export function NewGroup() {
  const [group, setGroup] = useState('');
  const navigation = useNavigation();

  async function handleNew() {
    try {
      if (group.trim().length === 0) {
        return Alert.alert('Nova Turma', 'Informe o nome da turma.');
      }
      await groupCreate(group)
      navigation.navigate('players', { group });
    } catch(error) {
      if (error instanceof AppError) {
        Alert.alert('Nova Turma', error.message);
      } else {
        Alert.alert('Nova Turma', 'Não foi possível criar uma nova turma.');
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
          title="Nova Turma"
          subtitle="Crie uma turma para adicionar pessoas"
        />
      </Content>

      <Input placeholder="Nome da turma" onChangeText={setGroup} />

      <Button
        title="Criar"
        style={{ marginTop: 20 }}
        onPress={handleNew}
      />
    </Container>
  );
}