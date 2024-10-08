import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Platform
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { appColorsType } from '../../redux/types/types';
import DrawerIcon from '../../components/drawerIcon';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { HEADER_IOS_HEIGHT, HEADER_ANDROID_HEIGHT } from '../config';
import { useNavigation } from '@react-navigation/native';
import { RootHomeStackParamList } from '../../router/RootParams';
type searchScreenProp = StackNavigationProp<RootHomeStackParamList, 'Search'>;

interface IProps {
    theme: appColorsType;
    reduxLang: any;
}
const HeaderOne = ({
    theme,
    reduxLang
}: IProps) => {
    const navigation = useNavigation<searchScreenProp>();

    return (
        <View style={[styles.containerView, {
            backgroundColor: theme.primaryBackgroundColor
        }]}>


            <Text style={[styles.headerText,
            {
                color: theme.textColor,
                fontSize: theme.appFontSize.largeSize,
                fontFamily: theme.appFontSize.fontFamily
            }
            ]}>
                {reduxLang.ECommerce}
            </Text>

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
        justifyContent: 'center',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { height: 2, width: 0 },
        shadowOpacity: 0.2,
        shadowRadius: 1,
    },
    headerText: {
        fontWeight: 'bold',
        alignSelf: 'center'
    }
});

export default HeaderOne;
