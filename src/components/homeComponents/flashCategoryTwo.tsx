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
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { FlatList } from 'react-native-gesture-handler';
import { WIDTH } from '../config';
import { useNavigation } from '@react-navigation/native';
import { RootHomeStackParamList } from '../../router/RootParams';
import { StackNavigationProp } from '@react-navigation/stack';

type ScreenProp = StackNavigationProp<RootHomeStackParamList, 'ProductDetail'>;

interface IProps {
    theme: appColorsType;
    reduxLang: any;
    categories: { name: string, icon: string }[],
    productDetailData: { url: any, productName: string, quantity: string }[];
}
const App = ({
    theme,
    reduxLang,
    categories,
    productDetailData
}: IProps) => {
    const navigation = useNavigation<ScreenProp>();

    return (
        <View style={[styles.flashContainer, {
            backgroundColor: theme.primaryBackgroundColor
        }]}>

            <View style={styles.flashRow}>
                <Text style={[styles.bold,
                {
                    color: theme.textColor,
                    fontSize: theme.appFontSize.largeSize,
                    fontFamily: theme.appFontSize.fontFamily
                }
                ]}>
                    {reduxLang.FLashSale}
                </Text>
                <FontAwesome name={'bolt'} style={[styles.paddingHot, {
                    color: theme.textColor,
                    fontSize: theme.appFontSize.largeSize
                }]} />
                <View style={[styles.rowTag, { backgroundColor: theme.textColor }]}>


                    <Text style={[styles.bold,
                    {
                        color: theme.secondryTextColor,
                        fontSize: theme.appFontSize.mediumSize,
                        fontFamily: theme.appFontSize.fontFamily
                    }]
                    }>
                        19 : 10 : 01
                 </Text>
                </View>

            </View>

            <FlatList
                horizontal
                keyExtractor={(item, index) => 'key' + index}
                data={categories}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity onPress={() => navigation.push('ProductDetail', {
                            dataImages: productDetailData
                        })}
                            key={index}
                            style={styles.categoryTouch}>
                            <Image source={item.image}
                                resizeMode={'cover'}
                                style={[styles.imageBackground,
                                { backgroundColor: theme.backgroundImageColor }]} />
                            <View style={{
                                alignItems: 'center', justifyContent: 'center',
                                paddingVertical: 5
                            }}>


                                <Text style={[
                                    styles.categoryText,
                                    styles.bold,
                                    {
                                        color: theme.primary,
                                        fontSize: theme.appFontSize.smallSize - 1,
                                        fontFamily: theme.appFontSize.fontFamily
                                    }
                                ]}>
                                    {reduxLang.Upto + '66' + reduxLang.Off}
                                </Text>
                                <Text style={[
                                    styles.categoryText,
                                    styles.bold,
                                    {
                                        color: theme.textColor,
                                        fontSize: theme.appFontSize.smallSize - 1,
                                        fontFamily: theme.appFontSize.fontFamily
                                    }
                                ]}>
                                    {'US $12.22'}
                                </Text>

                            </View>
                        </TouchableOpacity>
                    )
                }}

            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        justifyContent: 'center',
        padding: 1,
        paddingHorizontal: 5,
        borderRadius: 12,
        marginHorizontal: 6
    },
    flashContainer: {
        width: '95%',
        alignSelf: 'center',
        padding: 1
    },
    bold: {
        fontWeight: 'bold'
    },
    imageBackground: {
        height: WIDTH * 0.25,
        width: WIDTH * 0.25,
    },
    flashRow: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'flex-start',
        padding: 10,
        alignItems: 'center',
        paddingBottom: 5
    },
    categoryText: {
        paddingTop: 5
    }
});

const mapStateToProps = (state: any) => ({
    theme: state.configReducer.theme,
    reduxLang: state.configReducer.lang
});

export default connect(mapStateToProps, null)(App);
