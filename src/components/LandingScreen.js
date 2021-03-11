import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    Button,
    SafeAreaView,
    StyleSheet,
    StatusBar,
    Alert
} from 'react-native';
import { Appbar, ActivityIndicator } from "react-native-paper";
import colors from "../constants/colors";
import strings from "../constants/strings";
import WeatherDataList from './WeatherDataList';
import size from "../constants/size";
import { startFetchData } from '../service/actions/Actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage'
import NetInfo from '@react-native-community/netinfo'


const LandingScreen = props => {
    const [zipCode, setZipCode] = useState('');
    const [responseData, setResponseData] = useState([]);
    const [isDataFetching, setIsDataFetching] = useState(false);
    const [isListAvailable, setListAvailable] = useState(false);
    const [visibleProgress, setProgressVisible] = useState(false);
    const [cityName, setCityName] = useState('');

    useEffect(() => {
        const { data, isFetching } = props;

        if (data != null && Object.entries(data).length != 0) {

            // update UI in case, if data available
            setProgressVisible(false)
            setListAvailable(true)

            const responseData = data.data
            setResponseData(responseData);
            setIsDataFetching(isFetching)

            const { city = {} } = responseData;
            const { name = '' } = city;
            setCityName(name);

            //save data to Async storage
            saveDataInDb('' + zipCode, JSON.stringify(responseData))

        } else {
            console.log('Data ', data, isFetching);
            setListAvailable(false)
        }

    }, [props.data]);

    const callWeatherAPI = () => {

        setListAvailable(false)
        setProgressVisible(true)
        setCityName('')

        if (zipCode.length === 0) {
            setProgressVisible(false)
            Alert.alert(strings.blankZipMessage);
        } else if (zipCode.length < 4) {
            setProgressVisible(false)
            Alert.alert(strings.validZipMessage);
        } else {
            setCityName('')
            setIsDataFetching(true);
          
            /**
             * Check if internet is conncted,
             * If yes, fetch data from API
             * If not, then check if data for given zip code availbale
             * Then refresh the UI
             */
            NetInfo.fetch().then(state => {
                if (state.isConnected) {
                    props.startFetchData(zipCode);
                } else {
                    try {
                        const responseData = AsyncStorage.getItem('' + zipCode, (err, result) => {
                            if (!err && result != null) {
                                const jsonResponse = JSON.parse(result)

                                // update data into UI
                                const { city = {} } = jsonResponse;
                                const { name = '' } = city;
                                setCityName(name);

                                setProgressVisible(false)
                                setListAvailable(true)
                                setResponseData(jsonResponse);
                                setIsDataFetching(false);
                                
                            } else {

                                setProgressVisible(false)
                                setListAvailable(false)

                            }
                        });
                    } catch (e) {
                        console.log(strings.errorStorage)
                    }
                }
            });

        }

    };

    return (
        <SafeAreaView style={styles.containerParent}>
            <StatusBar
                backgroundColor={colors.colorPrimaryDark} />
            <Appbar.Header style={{ backgroundColor: colors.colorPrimary }}>
                <Appbar.Content title={strings.appName} style={styles.appBar} />
            </Appbar.Header>

            <View style={styles.container}>

                <View style={styles.searchContainer}>
                    <TextInput
                        style={styles.textInputStyle}
                        placeholder={strings.searchHere}
                        value={zipCode}
                        onChangeText
                        onChangeText={(text) => {
                            if (zipCode.length === 0 || !isListAvailable) {
                                setCityName('')
                            }
                            setZipCode(text)
                        }
                        }
                        keyboardType={'number-pad'}
                        underlineColorAndroid="transparent" />

                    <View style={styles.buttonContainer}>
                        <Button style={styles.buttonStyle}
                            title={strings.search}
                            color={colors.colorAccent}
                            onPress={callWeatherAPI}></Button>
                    </View>
                </View>

                <View
                    style={styles.listContainerStyle}>

                    {visibleProgress ? (
                        <View style={{
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                            <ActivityIndicator
                                style={styles.progress}
                                animating={isDataFetching}
                                color={colors.colorPrimaryDark}
                                size={size['40px']} />
                        </View>
                    ) : null}

                    {!isListAvailable ? (
                        <View style={{
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                            <Text style={{
                                textAlignVertical: "center",
                                textAlign: "center",
                                fontSize: size['16px'],
                                color: colors.colorBlack
                            }}>{strings.emptyListMsg}</Text>
                        </View>
                    ) : null}

                    {isListAvailable ? (
                        <Text style={styles.titleCity}>
                            {cityName}
                        </Text>
                    ) : null}

                    {isListAvailable ? (
                        <WeatherDataList
                            data={responseData}
                            props={props} />
                    ) : null}

                </View>

            </View>

        </SafeAreaView >);
}

const styles = StyleSheet.create({

    containerParent: {
        width: '100%',
        height: '100%',
        backgroundColor: colors.colorAppBackground,
        flex: 1
    },

    appBar: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent'
    },

    container: {
        width: '100%',
        flex: 1,
        flexDirection: 'column',
        backgroundColor: colors.colorAppBackground
    },

    searchContainer: {
        height: 48,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginStart: 24,
        marginEnd: 24,
        marginTop: 24
    },

    textInputStyle: {
        height: size['48px'],
        padding: size['10px'],
        width: '60%',
        backgroundColor: colors.colorWhite,
        borderColor: colors.colorPrimaryDark,
        borderWidth: 1,
        borderRadius: size['8px'],
        fontSize: size['16px'],
        alignSelf: 'center'
    },
    buttonContainer: {
        height: size['48px'],
        marginStart: size['10px'],
        marginEnd: size['10px'],
        marginEnd: size['40px'],
        alignSelf: 'center',
        justifyContent: 'center'
    },

    header: {
        fontSize: size['20px'],
        backgroundColor: "#fff",
        height: size['30px']
    },

    progress: {
        justifyContent: 'center',
        alignSelf: 'center'
    },
    listContainerStyle: {
        margin: size['10px'],
        flex: 1,
        margin: size['24px'],
        marginEnd: size['24px'],
        marginTop: size['24px'],
        marginBottom: size['24px']
    },
    titleNoList: {
        fontSize: size['16px'],
        color: colors.colorBlack,
        textAlign: 'center'
    },
    titleCity: {
        fontSize: size['20px'],
        color: colors.colorPrimaryDark,
        textAlign: 'center',
    }
});

const saveDataInDb = async (key, value) => {
    try {
        AsyncStorage.setItem(key, value)
            .then(x => AsyncStorage.getItem(key))
            .then((val) => {
                console.log('Data successfully saved = ' + val)
            })
    } catch (e) {
        console.log(e);
    }
}

const mapStateToProps = (state) => ({
    data: state.weather.data,
    isFetching: state.weather.isFetching,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({ startFetchData }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LandingScreen);