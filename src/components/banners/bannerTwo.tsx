import React, { useEffect, useRef } from 'react';
import {
    Platform,
    Dimensions,
    StyleSheet,
    FlatList,
    View,
    Image,
    Animated
} from 'react-native';
import HeaderTwo from '../../components/homeHeaders/headerTwo';
import { appColorsType } from '../../redux/types/types';
import { useState } from 'react';
import { HEADER_IOS_HEIGHT, HEADER_ANDROID_HEIGHT } from '../config';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = WIDTH * 0.4;

interface IProps {
    theme: appColorsType;
    reduxLang: any;
    images: string[];
    autoMove: boolean;
}

function infiniteScroll(dataList: string[], scrollRef: any) {

    const numberOfData = dataList.length
    let scrolValue = 0, scrolled = 0
    setInterval(function () {
        scrolled++
        if (scrolled < numberOfData) {
            if (Platform.OS === 'ios')
                scrolValue = scrolValue + WIDTH
            else {
                scrolValue = scrolValue + WIDTH
            }

        }

        else {
            scrolValue = 0
            scrolled = 0
        }
        scrollRef?.current?.scrollToOffset({ animated: true, offset: scrolValue })
    }, 3000)
}



const bannerOne = ({
    theme,
    reduxLang,
    images,
    autoMove
}: IProps) => {

    const [dataList, setDataList] = useState(images)

    let scrollRef = useRef<FlatList | null>(null);
    const scrollX = useState(new Animated.Value(0))[0]

    let position = Animated.divide(scrollX, WIDTH)

    useEffect(() => {
        setDataList(images)
        if (scrollRef !== undefined && scrollRef !== null && autoMove)
            infiniteScroll(dataList, scrollRef)
    })

    return (
        <View >
            <HeaderTwo
                theme={theme}
                images={images}
                reduxLang={reduxLang} />

            <FlatList
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }]
                    ,
                    { useNativeDriver: false }
                )}
                ref={scrollRef}
                data={images}
                showsHorizontalScrollIndicator={false}
                pagingEnabled={true}
                horizontal={true}
                bounces={false}
                style={styles.scrollView}
                scrollEnabled
                snapToAlignment="center"
                scrollEventThrottle={16}
                decelerationRate={"fast"}
                keyExtractor={(item, index) => 'key' + index}
                renderItem={item => (
                    <View
                        style={{
                            flexDirection: 'column',
                            alignItems: 'center'
                        }}
                        key={item.item.value}>
                        <Image
                            key={item.index}
                            source={item.item}
                            blurRadius={20}
                            style={styles.bannerImage2}
                        />
                        <Image
                            key={item.item}
                            source={item.item}
                            style={styles.bannerImage}
                        />
                    </View>
                )}
            />

            <View style={styles.dotContainer}>

                {images.map((img, index) => {
                    let opacity = position.interpolate({
                        inputRange: [index - 1, index, index + 1],
                        outputRange: [0.3, 1, 0.3],
                        extrapolate: 'clamp'
                    })
                    return (
                        <Animated.View key={index} style={{
                            opacity,
                            backgroundColor: theme.primaryTextColor,
                            height: 6, width: 6, marginHorizontal: 3, borderRadius: 6,
                            marginVertical: 2
                        }} >
                        </Animated.View>
                    )
                })}
            </View>

        </View>
    );

};

const styles = StyleSheet.create({
    scrollView: {
        width: WIDTH,
        height: HEIGHT + 52,
        alignSelf: 'center'
    },
    bannerImage: {
        width: WIDTH,
        height: HEIGHT,
        resizeMode: 'cover'
    },
    bannerImage2: {
        width: WIDTH,
        height: Platform.OS === 'ios' ?
            HEADER_IOS_HEIGHT * 0.3 : HEADER_ANDROID_HEIGHT * 0.42,
        paddingVertical: Platform.OS === 'ios' ?
            HEADER_IOS_HEIGHT * 0.3 : HEADER_ANDROID_HEIGHT * 0.42,
        resizeMode: 'cover'
    },
    dotContainer: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 13,
        alignSelf: 'center'
    },
});

export default bannerOne;