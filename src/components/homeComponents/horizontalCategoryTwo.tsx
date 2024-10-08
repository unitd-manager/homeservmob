import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { connect } from 'react-redux';
import { appColorsType } from '../../redux/types/types';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { WIDTH } from '../config';
import { useNavigation } from '@react-navigation/native';
import { RootHomeStackParamList } from '../../router/RootParams';
import { StackNavigationProp } from '@react-navigation/stack';

type shopScreenProp = StackNavigationProp<RootHomeStackParamList, 'Shop'>;

interface IProps {
    theme: appColorsType;
    reduxLang: any;
    iconColor?: string;
}
const App = ({
    theme,
    reduxLang,
    iconColor
}: IProps) => {
    const navigation = useNavigation<shopScreenProp>();

    const categories = [{ name: reduxLang.headphones, icon: 'headphones' },
    { name: reduxLang.bed, icon: 'bed' },
    { name: reduxLang.Books, icon: 'book' },
    { name: reduxLang.Gift, icon: 'gift' },
    { name: reduxLang.Bikes, icon: 'bicycle' },
    { name: reduxLang.Cars, icon: 'car' },
    { name: reduxLang.Calculator, icon: 'calculator' },
    { name: reduxLang.Coffee, icon: 'coffee' }]

    return (

        <View style={styles.container}>


            {categories.map((item, index) => (
                <TouchableOpacity
                    onPress={() => navigation.navigate('Shop')}
                    key={index}
                    style={styles.categoryTouch}>
                    <View style={[styles.categoryView]}>
                        <FontAwesome name={item.icon} style={[{
                            color: iconColor ? iconColor : theme.primary,
                            fontSize: theme.appFontSize.largeSize + 18,
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
                        {item.name}
                    </Text>

                </TouchableOpacity>

            ))}

        </View>
    );

};

const styles = StyleSheet.create({
    container: {

        flexWrap: 'wrap', flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginBottom: 6

    },
    categoryTouch: {
        margin: 6,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 3,
        height: WIDTH * 0.18,
        width: WIDTH * 0.2
    },
    categoryView: {
        height: WIDTH * 0.12,
        width: WIDTH * 0.12,
        alignItems: 'center',
        justifyContent: 'center'
    },
    categoryText: {
        paddingTop: 2,
        fontWeight: 'bold'
    }
});

const mapStateToProps = (state: any) => ({
    theme: state.configReducer.theme,
    reduxLang: state.configReducer.lang
});

export default connect(mapStateToProps, null)(App);
