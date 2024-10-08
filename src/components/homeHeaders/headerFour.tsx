import React from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { appColorsType } from '../../redux/types/types';
import DrawerIcon from '../../components/drawerIcon';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { HEADER_IOS_HEIGHT, HEADER_ANDROID_HEIGHT } from '../config';
import { useNavigation } from '@react-navigation/native';
import { RootHomeStackParamList } from '../../router/RootParams';
import { StackNavigationProp } from '@react-navigation/stack';

type cartScreenProp = StackNavigationProp<RootHomeStackParamList, 'Cart'>;

interface IProps {
    theme: appColorsType;
    reduxLang: any;
}
const HeaderOne = ({
    theme,
    reduxLang
}: IProps) => {
    const navigation = useNavigation<cartScreenProp>();
    return (
        <View style={[styles.containerView, {
            backgroundColor: theme.primaryBackgroundColor
        }]}>

            <DrawerIcon
                color={theme.textColor}
                marginRight={0.1}
                navigation={navigation} theme={theme} />

            <Text style={[styles.headerText,
            {
                color: theme.textColor,
                fontSize: theme.appFontSize.largeSize,
                fontFamily: theme.appFontSize.fontFamily
            }
            ]}>
                {reduxLang.ECommerce}
            </Text>

            <TouchableOpacity
                onPress={() => navigation.navigate('Cart')}
                style={styles.categoryTouch}>
                <View style={[{
                    backgroundColor: theme.primary
                }, styles.categoryView]}>


                    <View style={styles.counterView}>
                        <Text style={[styles.headerText,
                        {
                            color: theme.textColor,
                            fontSize: theme.appFontSize.smallSize - 2,
                            fontFamily: theme.appFontSize.fontFamily
                        }
                        ]}>
                            {'2'}
                        </Text>
                    </View>
                    <FontAwesome
                        style={{
                            color: theme.textColor,
                            fontSize: theme.appFontSize.mediumSize,
                        }
                        }
                        name={'shopping-cart'}
                    />
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    containerView: {
        paddingHorizontal: 15,
        width: '100%',
        paddingVertical: Platform.OS === 'ios' ?
            HEADER_IOS_HEIGHT * 0.1 : HEADER_ANDROID_HEIGHT * 0.12,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    headerText: {
        fontWeight: 'bold',
        alignSelf: 'center'
    },
    categoryTouch: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    counterView: {
        position: 'absolute',
        top: 2,
        zIndex: 10,
        right: 8
    },
    categoryView: {
        borderRadius: 17,
        height: 32,
        width: 32,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 6
    }
});

export default HeaderOne;
