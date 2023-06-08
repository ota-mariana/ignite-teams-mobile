import AsyncStorage from '@react-native-async-storage/async-storage';

import { GROUP_COLLECTION, PLAYER_COLLECTION } from '@storage/storageConfig';

import { groupsGetAll } from './groupsGetAll';

export async function groupRemovedByName(groupRemoved: string) {
  try {
    const storagedGroup = await groupsGetAll();
    const filtered = storagedGroup.filter((group) => group !== groupRemoved);
    const groups = JSON.stringify(filtered);

    await AsyncStorage.setItem(GROUP_COLLECTION, groups);
    await AsyncStorage.removeItem(`${ PLAYER_COLLECTION }-${ groupRemoved }`)
    
  } catch (error) {
    throw error;
  }
}