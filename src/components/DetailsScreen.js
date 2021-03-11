import React, { useState } from "react";
import { Appbar } from "react-native-paper";
import { View, Text, SafeAreaView, StyleSheet, StatusBar } from "react-native";
import colors from "../constants/colors";
import strings from "../constants/strings";
import size from "../constants/size";

const DetailsScreen = ({ route, navigation }) => {

    const { item, cityName } = route.params;
    console.log("item = " + item)

    const { dt_txt = '' } = item;
    const { description = '' } = item.weather[0];
    const { speed = 0.0 } = item.wind;
    const { humidity = 0.0 } = item.main;
    const { temp = 0.0 } = item.main;

    return (
        <SafeAreaView style={styles.containerParent}>
            <StatusBar
                backgroundColor={colors.colorPrimaryDark} />
            <Appbar.Header style={{ backgroundColor: colors.colorPrimary }}>
                <Appbar.Content title={strings.details} style={styles.appBar} />
            </Appbar.Header>
            <View style={styles.container}>
                <Text style={styles.title}>Date/Time: {dt_txt}</Text>
                <Text style={styles.title}>Sky: {description}</Text>
                <Text style={styles.title}>Wind: {speed}</Text>
                <Text style={styles.title}>Humidity: {humidity}</Text>
                <Text style={styles.title}>Temp: {temp}</Text>
            </View>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        width: '100%',
        flex: 1,
        padding : size["10px"],
        flexDirection: 'column',
        backgroundColor: colors.colorWhite
    },
    appBar: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent'
    },

    containerParent: {
        width: '100%',
        height: '100%',
        backgroundColor: colors.colorWhite,
        flex: 1
    },
    title: {
        fontSize: size['14px'],
        marginBottom: size['5px'],
    }
});

export default DetailsScreen;