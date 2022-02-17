import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  View,
  TextInput,
  Image,
} from 'react-native';

const App = () => {
  const [filteredData, setFilteredData] = useState(null);
  const [AllData, setAllData] = useState(null);
  const [query, setQuery] = useState(null);

  const endpoint = 'https://jsonplaceholder.typicode.com/users';

  useEffect(() => {
    axios
      .get(endpoint)
      .then(usersData => {
        setFilteredData(usersData.data);
        setAllData(usersData.data);
        console.log('data supplied');
      })
      .catch(error => console.log(error));
  }, []);

  const searchFilter = text => {
    const updatedData = AllData.filter(item => {
      const itemData = item.name.toLowerCase();
      const textData = text.toLowerCase();
      if (itemData.startsWith(textData)) {
        return true;
      }

      if (!itemData.includes(textData)) {
        return false;
      }
    });
    if (updatedData.length > 0) {
      setFilteredData(updatedData);
      setQuery(text);
    } else {
      setFilteredData([]);
      setQuery(text);
    }
  };

  return (
    <SafeAreaView style={styles.backgroundStyle}>
      <FlatList
        data={filteredData}
        ListEmptyComponent={
          <Text style={{alignSelf: 'center', marginTop: '80%'}}>
            No Data Found
          </Text>
        }
        ListHeaderComponent={
          <View style={styles.searchBar}>
            <TextInput
              style={styles.searchBarInput}
              value={query}
              editable={true}
              onChangeText={text => searchFilter(text)}
              placeholder={'Search here ...'}
            />
          </View>
        }
        renderItem={({item}) => (
          <TouchableOpacity style={styles.card}>
            <Image
              source={{
                uri: 'https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/a3eb1f8041dd1d33f2352d5892281f00/default.png',
              }}
              style={styles.img}
              resizeMode="contain"
            />
            <Text style={styles.text}>{item.name}</Text>
            {/* <Text style={styles.text}>Email : {item.email}</Text>
            <Text style={styles.text}>Street : {item.address.street}</Text>
            <Text style={styles.text}>City : {item.address.city}</Text> */}
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backgroundStyle: {
    display: 'flex',
    backgroundColor: 'white',
    flex: 1,
  },
  card: {
    backgroundColor: 'black',
    padding: 8,
    margin: 10,
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 30,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    alignSelf: 'center',
  },
  searchBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 3,
  },
  searchBarInput: {
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 20,
    width: '95%',
    backgroundColor: 'black',
    color: 'white',
    fontSize: 16,
  },
  img: {
    width: 80,
    height: 50,
    marginLeft: -15,
  },
});

export default App;
