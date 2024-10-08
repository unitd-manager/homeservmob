import React from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { connect } from 'react-redux';
import { appColorsType } from '../../redux/types/types';
import { WIDTH } from '../config';
import { useNavigation } from '@react-navigation/native';
import { RootHomeStackParamList } from '../../router/RootParams';
import { StackNavigationProp } from '@react-navigation/stack';

type ScreenProp = StackNavigationProp<RootHomeStackParamList, 'ProductDetail'>;

interface IProps {
    theme: appColorsType;
    reduxLang: any;
    categories: { name: string, icon: string, image: any }[];
    isDarkMode?: boolean;
    productDetailData: { url: any, productName: string, quantity: string }[];
}

const App = ({
    theme,
    reduxLang,
    categories,
    isDarkMode,
    productDetailData
}: IProps) => {
    const navigation = useNavigation<ScreenProp>();

    const component = (key: string, uri: any, name: string) => (
        <TouchableOpacity onPress={() => navigation.push('ProductDetail', {
            dataImages: productDetailData
        })}
            key={key}
            style={styles.categoryTouch}>
            <Image
                source={uri}
                resizeMode={'cover'}
                style={styles.imageBackground} />
            <Text style={[
                styles.categoryText,
                styles.bold,
                {
                    color: theme.textColor,
                    fontSize: theme.appFontSize.smallSize,
                    fontFamily: theme.appFontSize.fontFamily
                }
            ]}>
                {name}
            </Text>
        </TouchableOpacity>
    )

    const componentTopText = (key: string, uri: any, name: string) => (
        <TouchableOpacity onPress={() => navigation.push('ProductDetail', {
            dataImages: productDetailData
        })}
            key={key}
            style={styles.categoryTouch}>
            <Text style={[
                styles.categoryText,
                styles.bold,
                styles.marginBot,
                {
                    color: theme.textColor,
                    fontSize: theme.appFontSize.smallSize,
                    fontFamily: theme.appFontSize.fontFamily
                }
            ]}>
                {name}
            </Text>
            <Image
                source={uri}
                resizeMode={'cover'}
                style={styles.imageBackground} />
        </TouchableOpacity>
    )

    return (
        <View style={[styles.flashContainer, {
            backgroundColor: theme.secondryBackgroundColor
        }]}>

            <View style={styles.flashRow}>
                <Text style={[styles.bold,
                {
                    color: theme.textColor,
                    fontSize: theme.appFontSize.smallSize,
                    fontFamily: theme.appFontSize.fontFamily
                }
                ]}>
                    {reduxLang.DailyFeatured}
                </Text>

            </View>


            <View style={[{
                backgroundColor: !isDarkMode ? theme.primaryBackgroundColor :
                    theme.primaryBackgroundColor,
            }, styles.categoryContainer]}>
                {component('1', categories[7].image, categories[6].name)}
                {component('2', categories[5].image, categories[5].name)}
                {component('3', categories[3].image, categories[1].name)}
                {component('4', categories[1].image, categories[3].name)}
            </View>

            <View style={[{
                backgroundColor: !isDarkMode ? theme.primaryBackgroundColor :
                    theme.primaryBackgroundColor,
            }, styles.categoryContainer]}>
                {componentTopText('1', categories[2].image, categories[4].name)}
                {componentTopText('2', categories[4].image, categories[7].name)}
                {componentTopText('3', categories[6].image, categories[2].name)}
                {componentTopText('4', categories[0].image, categories[0].name)}
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    categoryContainer: {
        borderRadius: 12,
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'space-evenly',
        width: '96%',
        margin: 8,
        marginTop: 0,
        padding: 4
    },
    categoryTouch: {
        margin: 4,
        justifyContent: 'center',
        alignItems: 'center'
    },
    paddingHot: {
        paddingHorizontal: 5
    },
    rowTag: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    flashContainer: {
        width: '95%',
        alignSelf: 'center',
        borderRadius: 12,
        elevation: 1,
        shadowColor: '#000000',
        shadowOffset: { height: 0, width: 0 },
        shadowOpacity: 0.15,
        shadowRadius: 5,
        marginTop: 10,
        marginBottom: 10
    },
    bold: {
        fontWeight: 'bold'
    },
    imageBackground: {
        height: WIDTH * 0.2,
        width: WIDTH * 0.2,
        borderRadius: 12
    },
    marginBot: {
        marginBottom: 10
    },
    flashRow: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        padding: 10,
        alignItems: 'center',
        paddingBottom: 5
    },
    categoryView: {
        borderRadius: 23,
        height: 46,
        width: 46,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3,
        shadowColor: '#000000',
        shadowOffset: { height: 0, width: 0 },
        shadowOpacity: 0.2,
        shadowRadius: 1
    },
    categoryText: {
        paddingTop: 5
    }
});

const mapStateToProps = (state: any) => ({
    isDarkMode: state.configReducer.isDarkMode
});

export default connect(mapStateToProps, null)(App);
