import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { connect } from 'react-redux';
import { NativeStackNavigationProp } from 'react-native-screens/native-stack';
import { appColorsType } from '../../redux/types/types';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { FlatList } from 'react-native-gesture-handler';
import { WIDTH } from '../config';
import { useNavigation } from '@react-navigation/native';
import { RootHomeStackParamList } from '../../router/RootParams';
import { StackNavigationProp } from '@react-navigation/stack';

type ScreenProp = StackNavigationProp<RootHomeStackParamList, 'Shop' | 'Category'>;

interface IProps {
    theme: appColorsType;
    reduxLang: any;
    backgroundColor?: string;
    iconColor?: string;
}
const App = ({
    theme,
    reduxLang,
    backgroundColor,
    iconColor
}: IProps) => {
    const navigation = useNavigation<ScreenProp>();

    const categories = [{ name: reduxLang.bed, icon: 'bed' },
    { name: reduxLang.headphones, icon: 'headphones' },
    { name: reduxLang.Books, icon: 'book' },
    { name: reduxLang.Gift, icon: 'gift' },
    { name: reduxLang.Bikes, icon: 'bicycle' },
    { name: reduxLang.Cars, icon: 'car' },
    { name: reduxLang.Calculator, icon: 'calculator' },
    { name: reduxLang.Coffee, icon: 'coffee' }]

    return (

        <FlatList
            horizontal
            keyExtractor={(item, index) => 'key' + index}
            data={categories}

            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => {
                return (
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Shop')}
                        key={index}
                        style={[styles.categoryTouch,{
                            borderColor: theme.textColor
                        }]}>
                        <View style={[{
                            // backgroundColor:
                            //     backgroundColor ? backgroundColor :
                            //         theme.primary,
                        }, styles.categoryView]}>
                            <FontAwesome name={item.icon} style={[{
                                color: theme.textColor,
                                fontSize: theme.appFontSize.largeSize + 3,
                            }]} />
                        </View>

                        <Text
                        numberOfLines={1}
                        style={[
                            styles.categoryText,
                            {
                                color: theme.textColor,
                                fontSize: theme.appFontSize.smallSize - 2,
                                fontFamily: theme.appFontSize.fontFamily,
                            }
                        ]}>
                            {item.name}
                        </Text>

                    </TouchableOpacity>
                )
            }}
            ListFooterComponent={
                <TouchableOpacity
                    onPress={() => navigation.navigate('Category')}
                    style={[styles.categoryTouch,{
                        borderColor: theme.textColor
                    }]}>
                    <View style={[styles.categoryView]}>
                        <FontAwesome name={'ellipsis-h'} style={[{
                            color: theme.textColor,
                            fontSize: theme.appFontSize.largeSize + 3,
                        }]} />
                    </View>

                    <Text style={[
                        styles.categoryText,
                        {
                            color: theme.textColor,
                            fontSize: theme.appFontSize.smallSize,
                            fontFamily: theme.appFontSize.fontFamily,
                        }
                    ]}>
                        {reduxLang.More}
                    </Text>

                </TouchableOpacity>
            }
        />
    );
};

const styles = StyleSheet.create({
    categoryTouch: {
        margin: 6,
        justifyContent: 'center',
        alignItems: 'center',
        // marginTop: 14,
        borderWidth: 1,
        // padding: 12,
        borderRadius: 30,
        height: 55,
        width: 55
    },
    categoryView: {
        height: WIDTH * 0.08,
        width: WIDTH * 0.08,
        alignItems: 'center',
        justifyContent: 'center'
    },
    categoryText: {
        // paddingTop: 6,
        width: WIDTH * 0.08,
        textAlign: 'center'
    }
});

const mapStateToProps = (state: any) => ({
    theme: state.configReducer.theme,
    reduxLang: state.configReducer.lang
});

export default connect(mapStateToProps, null)(App);
