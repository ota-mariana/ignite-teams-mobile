import { useEffect, useState, useRef } from 'react';
import { useRoute } from '@react-navigation/native';
import { Alert, FlatList, TextInput } from 'react-native';

import { playerAddByGroup } from '@storage/player/playerAddByGroup';
import { playersGetByGroupAndTeam } from '@storage/player/playersGetByGroupAndTeam';
import { PlayerStorageDTO } from '@storage/player/PlayerStorageDTO';

import { AppError } from '@utils/AppError';

import { Header } from '@components/Header';
import { HighLight } from '@components/HighLight';
import { ButtonIcon } from '@components/ButtonIcon';
import { Input } from '@components/Input';
import { Filter } from '@components/Filter';
import { PlayerCard } from '@components/PlayerCard';
import { ListEmpty } from '@components/ListEmpty';
import { Button } from '@components/Button';

import { Container, Form, HeaderList, NumbersOfPlayers } from './styles';
import { playerRemovedByGroup } from '@storage/player/playerRemovedByGroup';

type RouteParams = {
	group: string;
}

export function Players() {
	const [newPlayerName, setNewPlayerName] = useState('');
	const [team, setTeam] = useState('Time A');
	const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);

	const newPlayerNameInputRef = useRef<TextInput>(null);

	const route = useRoute();
	const { group } = route.params as RouteParams;

	async function handleAddPlayer() {
		if (newPlayerName.trim().length === 0) {
			
			return Alert.alert('Adicionar pessoa', 'Para adicionar uma pessoa é necessário informar o nome e sobrenome.')
		}

		const newPlayer = {
			name: newPlayerName,
			team,
		}

		try {
			await playerAddByGroup(newPlayer, group);

			newPlayerNameInputRef.current?.blur();
			setNewPlayerName('');
			fetchPlayersByTeam();

		} catch(error) {
			if (error instanceof AppError) {
				Alert.alert('Adicionar pessoa', error.message);
			}else{
				console.log(error);
				Alert.alert('Adicionar pessoa', 'Não foi possível adicionar.');
			} 
		}
	}

	async function fetchPlayersByTeam() {
		try {
			const playersByTeam = await playersGetByGroupAndTeam(group, team);
			setPlayers(playersByTeam);

		} catch(error) {
			throw error;
		}
	}

	async function handlePlayerRemove(playerName : string) {
		try {
			await playerRemovedByGroup(playerName, group);
			fetchPlayersByTeam();

		} catch(error) {
			console.log(error);
			Alert.alert('Remover pessoa', 'Não foi possível remover essa pessoa.')
			
		}
	}

	useEffect(() => {
		fetchPlayersByTeam();
	},[team])

	return (
		<Container>
			<Header showBackButton />

			<HighLight
				title={ group }
				subtitle='Adicione a galera e separe os times'
			/>

			<Form>
				<Input
					inputRef = {newPlayerNameInputRef}
					placeholder='Nome da pessoa'
					autoCorrect={ false }
					onChangeText={setNewPlayerName}
					value={newPlayerName}
					onSubmitEditing={handleAddPlayer}
					returnKeyType='done'
				/>
				<ButtonIcon icon='add' onPress={handleAddPlayer} />
			</Form>

			<HeaderList>
				<FlatList
					data={['Time A', 'Time B']}
					keyExtractor={ item => item }
					renderItem={({ item }) => (
						<Filter
							title={ item }
							isActive={ item === team }
							onPress={ () => setTeam(item) }
						/>
					)}
					horizontal
				/>

				<NumbersOfPlayers>
					{ players.length }
				</NumbersOfPlayers>
			</HeaderList>

			<FlatList
				data={players}
				keyExtractor={item => item.name}
				renderItem={({ item }) => (
					<PlayerCard
						name={item.name}
						onRemove={() => handlePlayerRemove(item.name)}
					/>
				)}
				ListEmptyComponent={() => <ListEmpty message="Não há pessoas nesse time." />}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={[
					{paddingBottom: 100},
					players.length === 0 && { flex: 1 }
				]}
			/>

			<Button
				title='Remover Turma'
				type='SECONDARY'
			/>
		</Container>
	)
}