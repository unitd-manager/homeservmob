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
import { appColorsType } from '../../redux/types/types';
import { useState } from 'react';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = WIDTH * 0.66;

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
        <View>

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
                renderItem={({ item, index }) => {
                    return <Image
                        key={index}
                        source={item}
                        style={styles.bannerImage}
                    />
                }}
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
                            backgroundColor: theme.textColor,
                            height: 2, width: 18, marginHorizontal: 3, borderRadius: 6,
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
        height: HEIGHT,
        alignSelf: 'center',
    },
    bannerImage: {
        width: WIDTH,
        height: HEIGHT,
        resizeMode: 'cover'
    },
    dotContainer: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 8,
        alignSelf: 'center',
        padding: 1,
        paddingBottom: 0,
        paddingTop: 0,
    },
});

export default bannerOne;