import React, { useState } from 'react';
import {
    I18nManager,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { connect } from 'react-redux';
import AddtoCartPopUpModal from '../components/addtoCartPopUpModal';
import { appColorsType } from '../redux/types/types';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { FlatList } from 'react-native-gesture-handler';
import CardOne from './cardStyles/cardOne';
import CardTwo from './cardStyles/cardTwo';
import CardThree from './cardStyles/cardThree';
import CardFour from './cardStyles/cardFour';
import CardFive from './cardStyles/cardFive';
import CardSix from './cardStyles/cardSix';
import CardSeven from './cardStyles/cardSeven';
import CardEight from './cardStyles/cardEight';
import CardNine from './cardStyles/cardNine';
import CardTen from './cardStyles/cardTen';
import { WIDTH } from './config';
import { useNavigation } from '@react-navigation/native';
import { RootHomeStackParamList } from '../router/RootParams';
import { StackNavigationProp } from '@react-navigation/stack';

type ScreenProp = StackNavigationProp<RootHomeStackParamList, 'Wishlist'>;

interface IProps {
    theme: appColorsType;
    reduxLang: any;
    fontSize: number;
    backgroundColor: string;
    headingText?: string;
    vertical?: boolean;
    cardSty: number;
    navigationScreen?: any;
    productDetailData: { url: any, productName: string, quantity: string }[];
}
const App = ({
    theme,
    reduxLang,
    productDetailData,
    fontSize,
    backgroundColor,
    headingText,
    cardSty,
    vertical,
    navigationScreen
}: IProps) => {
    const [addtoCartmodalVisible, setaddtoCartModalVisible] = useState(false);
    const navigation = useNavigation<ScreenProp>();

    return (
        <View style={[styles.wishContainer, {
            backgroundColor: backgroundColor ?
                backgroundColor :
                theme.secondryBackgroundColor

        }]}>
            <AddtoCartPopUpModal
                productDetailData={productDetailData}
                theme={theme}
                reduxLang={reduxLang}
                addtoCartmodalVisible={addtoCartmodalVisible}
                setaddtoCartModalVisible={setaddtoCartModalVisible}
            />
            {headingText ?
                <View style={styles.wishRow}>
                    <Text style={[styles.bold,
                    {
                        color: theme.textColor,
                        fontSize: fontSize ? fontSize : theme.appFontSize.smallSize,
                        fontFamily: theme.appFontSize.fontFamily
                    }
                    ]}>
                        {headingText}
                    </Text>

                    <TouchableOpacity
                        onPress={() => {
                            if (navigationScreen) {
                                navigation.navigate(navigationScreen)

                            } else {
                                navigation.navigate('Wishlist', {
                                    dataImages: productDetailData
                                })
                            }
                        }}
                        style={styles.rowTag}>
                        <Text style={[styles.bold,
                        {
                            color: theme.primary,
                            fontSize: theme.appFontSize.smallSize,
                            fontFamily: theme.appFontSize.fontFamily
                        }]
                        }>
                            {reduxLang.ViewMore}
                        </Text>
                        <FontAwesome name={!I18nManager.isRTL ? 'angle-right' :
                            'angle-left'} style={[styles.paddingHot, {
                                color: theme.primary,
                                fontSize: theme.appFontSize.smallSize
                            }]} />
                    </TouchableOpacity>

                </View>
                : null}
            <FlatList
                horizontal={vertical ? !vertical : true}
                numColumns={vertical ? 2 : 1}
                keyExtractor={(item, index) => 'key' + index}
                style={{alignSelf: 'center'}}
                data={[...productDetailData].reverse()}
                showsHorizontalScrollIndicator={false}
                renderItem={(item) =>

                    cardSty === 6 ?
                        <View style={{ width: vertical ?  WIDTH * 0.48 : WIDTH * 0.43 }}>
                            <CardSix
                                data={item.item}
                                reduxLang={reduxLang}
                                productDetailData={productDetailData}
                                index={item.index}
                                theme={theme}
                                addToCartFun={() => setaddtoCartModalVisible(!addtoCartmodalVisible)}
                            />
                        </View>
                        :
                        cardSty === 7 ?
                        <View style={{ width: vertical ?  WIDTH * 0.48 : WIDTH * 0.43 }}>
                            <CardSeven
                                reduxLang={reduxLang}
                                data={item.item}
                                productDetailData={productDetailData}
                                index={item.index}
                                theme={theme}
                                addToCartFun={() => setaddtoCartModalVisible(!addtoCartmodalVisible)}
                            />
                        </View>
                        :
                        cardSty === 8 ?
                        <View style={{ width: vertical ?  WIDTH * 0.48 : WIDTH * 0.43 }}>
                            <CardEight
                                data={item.item}
                                productDetailData={productDetailData}
                                index={item.index}
                                theme={theme}
                            />
                        </View>
                        :
                        cardSty === 9 ?
                        <View style={{ width: vertical ?  WIDTH * 0.48 : WIDTH * 0.43 }}>
                            <CardNine
                                data={item.item}
                                productDetailData={productDetailData}
                                index={item.index}
                                theme={theme}
                                addToCartFun={() => setaddtoCartModalVisible(!addtoCartmodalVisible)}
                            />
                        </View>
                        :
                        cardSty === 10 ?
                        <View style={{ width: vertical ?  WIDTH * 0.48 : WIDTH * 0.43 }}>
                            <CardTen
                                data={item.item}
                                productDetailData={productDetailData}
                                index={item.index}
                                theme={theme}
                                addToCartFun={() => setaddtoCartModalVisible(!addtoCartmodalVisible)}
                            />
                        </View>
                        : cardSty === 1 ?
                        <View style={{ width: vertical ?  WIDTH * 0.48 : WIDTH * 0.43 }}>
                            <CardOne
                                data={item.item}
                                productDetailData={productDetailData}
                                index={item.index}
                                theme={theme}
                                addToCartFun={() => setaddtoCartModalVisible(!addtoCartmodalVisible)}
                            />
                        </View>
                        :cardSty === 2 ?
                            <View style={{ width: vertical ?  WIDTH * 0.48 : WIDTH * 0.43 }}>
                                <CardTwo
                                    data={item.item}
                                    productDetailData={productDetailData}
                                    index={item.index}
                                    theme={theme}
                                />
                            </View>
                            : cardSty === 3 ?
                                <View style={{ width: vertical ?  WIDTH * 0.48 : WIDTH * 0.43 }}>
                                    <CardThree
                                        data={item.item}
                                        productDetailData={productDetailData}
                                        index={item.index}
                                        theme={theme}
                                        addToCartFun={() => setaddtoCartModalVisible(!addtoCartmodalVisible)}
                                    />
                                </View>
                                : cardSty === 4 ?
                                    <View style={{ width: vertical ?  WIDTH * 0.48 : WIDTH * 0.43 }}>
                                        <CardFour
                                            data={item.item}
                                            productDetailData={productDetailData}
                                            index={item.index}
                                            theme={theme}
                                        />
                                    </View>
                                    :
                                    <View style={{ width: vertical ?  WIDTH * 0.48 : WIDTH * 0.43 }}>
                                        <CardFive
                                            productDetailData={productDetailData}
                                            data={item.item}
                                            index={item.index}
                                            theme={theme}
                                            addToCartFun={() => setaddtoCartModalVisible(!addtoCartmodalVisible)}
                                        />
                                    </View>
                }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    paddingHot: {
        paddingHorizontal: 5
    },
    rowTag: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    wishContainer: {
        width: '100%',
        alignSelf: 'center',
        padding: 1
    },
    bold: {
        fontWeight: 'bold'
    },
    wishRow: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        padding: 10,
        alignItems: 'center',
        paddingBottom: 5
    }
});

export default connect(null, null)(App);
