import React from 'react';
import {
    StyleSheet,
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

type shopScreenProp = StackNavigationProp<RootHomeStackParamList, 'Shop'>;

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
    const navigation = useNavigation<shopScreenProp>();

    const categories = [{ name: reduxLang.Shirts, icon: 'graduation-cap' },
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
                        style={styles.categoryTouch}>
                        <View style={[{
                            backgroundColor:
                                backgroundColor ? backgroundColor :
                                    theme.primary,
                        }, styles.categoryView]}>
                            <FontAwesome name={item.icon} style={[{
                                color: iconColor ? iconColor :
                                    theme.primaryTextColor,
                                fontSize: theme.appFontSize.largeSize + 15,
                            }]} />
                        </View>

                    </TouchableOpacity>
                )
            }}
        />
    );
};

const styles = StyleSheet.create({
    categoryTouch: {
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 14
    },
    categoryView: {
        borderRadius: 100,
        height: WIDTH * 0.12,
        width: WIDTH * 0.12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    categoryText: {
        paddingTop: 6
    }
});

const mapStateToProps = (state: any) => ({
    theme: state.configReducer.theme,
    reduxLang: state.configReducer.lang
});

export default connect(mapStateToProps, null)(App);
