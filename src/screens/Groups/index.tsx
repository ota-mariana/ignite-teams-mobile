import { Header } from '@components/Header';
import { Container } from './styles';
import { HighLight } from '@components/HighLight';
import { GroupCard } from '@components/GroupCard';
import { useState } from 'react';
import { FlatList } from 'react-native';
import { ListEmpty } from '@components/ListEmpty';
import { Button } from '@components/Button';

export function Groups() {
  const [groups, setGroups] = useState<string[]>([])
  return (
    <Container>
      <Header />

      <HighLight
        title="Times"
        subtitle="Jogue com o seu time!"
      />

      <FlatList
        data={groups}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <GroupCard title={item} />
        )}
        contentContainerStyle={groups.length === 0 && { flex: 1 }}
        ListEmptyComponent={() => <ListEmpty message="Não há times formados ainda. Bora criar um?" />}
      />

      <Button
        title="Criar nova turma"
      />
    </Container>
  );
}
