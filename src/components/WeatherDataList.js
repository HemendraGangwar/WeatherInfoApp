import React from 'react';
import { View, StyleSheet, FlatList, Text, TouchableOpacity } from 'react-native';
import colors from "../constants/colors";
import size from "../constants/size";

const WeatherDataList = ({ data, props }) => {

  const { list = [] } = data;

  const renderListItem = ({ item }) => {
 
    const { dt_txt: strDateTime = '' } = item;
    const { description: strDescription = '' } = item.weather[0];
    const { speed: strSpeed = 0.0 } = item.wind;
    const { humidity: strHumidity = 0.0 } = item.main;
    const { temp: strTemprature = 0.0 } = item.main;

    return (
      <View style={styles.item}>
        <TouchableOpacity>
          <View onPress={_onPress(item)}>
          <Text style={styles.textStyle}>Temprature : {strTemprature}</Text>
            <Text style={styles.textStyle}>Sky : {strDescription}</Text>
            <Text style={styles.textStyle}>Wind : {strSpeed}</Text>
            <Text style={styles.textStyle}>Humidity  : {strHumidity}</Text>
            <Text style={styles.textStyle}>Date/Time: {strDateTime}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  function _onPress(item) {
    // const {city = {}, item = {}} = data;
    // const { cityName = '' } = city;
    // props.navigation.navigate('detailsScreen', {
    //   'item': item,
    //   'cityName' : cityName
    // });
  }

  return (
    <View style={styles.containerStyle}>
      <FlatList
        data={list}
        keyExtractor={(item, index) => item.dt}
        renderItem={renderListItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
  },
  item: {
    backgroundColor: colors.colorWhite,
    padding: size['10px'],
    marginVertical: size['10px'],
    borderColor: colors.colorLightGray,
    borderWidth: size['1px'],
    borderRadius: size['8px'],
    elevation: size['3px'],
    shadowColor: colors.colorLightGray,
    shadowRadius: size['3px']
  },
  header: {
    fontSize: size['12px'],
    backgroundColor: '#fff',
  },
  textStyle: {
    fontSize: size['14px'],
    marginBottom: size['5px'],
  }
});

export default WeatherDataList;
