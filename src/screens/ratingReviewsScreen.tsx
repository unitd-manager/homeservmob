import React, { useLayoutEffect, useState } from 'react';
import {
  I18nManager, Modal, SafeAreaView, StyleSheet, Text, TextInput,
  ScrollView,
  TouchableOpacity, TouchableWithoutFeedback, View
} from 'react-native';
import { connect } from 'react-redux';
import { StackNavigationProp } from '@react-navigation/stack';
import { appColorsType } from '../redux/types/types';
import { HEIGHT, WIDTH } from '../components/config';
import { Image } from 'react-native';
import ReviewStar from '../components/reviewStar';

type RootStackParamList = {
  Settings: undefined;
};
interface IProps {
  navigation: StackNavigationProp<RootStackParamList>;
  theme: appColorsType;
  reduxLang: any;
}


const RatingReviewsScreen = ({ navigation, theme, reduxLang }: IProps) => {
  // Header Settings
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: reduxLang.Reviews,
      headerStyle: {
        backgroundColor: theme.secondryBackgroundColor,
        shadowColor: 'transparent',
      },
      headerTintColor: theme.textColor,
    });
  }, [
    navigation,
    reduxLang.Reviews,
    theme.secondryBackgroundColor,
    theme.textColor,
  ]);

  const signleRatingFun = (value: string, selectedStart: number) => (

    <View style={styles.singleRatingView}>

      <ReviewStar
        theme={theme}
        counterValue={selectedStart}
        starSize={theme.appFontSize.smallSize}
      />

      <Text style={[styles.signleTextRating, {
        color: theme.textColor,
        fontSize: theme.appFontSize.smallSize,
        fontFamily: theme.appFontSize.fontFamily
      }]}>
        {value}
      </Text>
    </View>
  )

  const userReview = (name: string, date: string, uri: any, rating: number, text: string) => (
    <View style={styles.userReviewContainer}>
      <View style={styles.userReviewInnerContainer}>

        <View style={styles.userImageContainer}>
          <Image source={uri}
            resizeMode={'cover'}
            style={styles.userImage} />

          <View>

            <Text style={[{
              color: theme.textColor,
              fontSize: theme.appFontSize.mediumSize,
              fontFamily: theme.appFontSize.fontFamily,
              paddingRight: 4
            }]}>
              {name}
            </Text>

            <Text style={[styles.dateStyle, {
              color: theme.secondry,
              fontSize: theme.appFontSize.smallSize - 1,
              fontFamily: theme.appFontSize.fontFamily
            }]}>
              {date}
            </Text>
          </View>

        </View>
        <View style={styles.starTopPadding}>
          <ReviewStar
            theme={theme}
            counterValue={rating}
            starSize={theme.appFontSize.smallSize}
          />

        </View>

      </View>
      <Text style={[styles.commentText, {
        color: theme.textColor,
        fontSize: theme.appFontSize.mediumSize - 1,
        fontFamily: theme.appFontSize.fontFamily,
        textAlign: 'left'
      }]}>
        {text}
      </Text>
    </View>
  )

  const [reviewValue, setReviewValueVisibles] = useState(2);
  const [isModalVisible, setModalVisibles] = useState(false);
  const showModal = () => setModalVisibles(true);

  const [heightValue, setHeight] = React.useState(40);
  const [msgText, onChangeMsgText] = React.useState('');

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: theme.primaryBackgroundColor },
      ]}>

      <ScrollView showsVerticalScrollIndicator={false}>

        {/* modal Start */}

        <Modal
          visible={isModalVisible}
          transparent={true}
          animationType={'slide'}>

          <TouchableWithoutFeedback onPress={() => setModalVisibles(!isModalVisible)}>
            <View style={styles.modalOverlay} />
          </TouchableWithoutFeedback>

          <View style={[styles.modalView, { backgroundColor: theme.secondryBackgroundColor }]}>

            <Text style={[styles.modalHeading, {
              color: theme.textColor,
              fontSize: theme.appFontSize.largeSize,
              fontFamily: theme.appFontSize.fontFamily
            }]}>
              {reduxLang.GiveRating}
            </Text>

            {<ReviewStar
              editable={true}
              theme={theme}
              counterValue={reviewValue}
              setReviewValueFun={setReviewValueVisibles}
              starSize={theme.appFontSize.largeSize + 6}
            />}

            <Text style={[styles.commentTextHeading, {
              color: theme.textColor,
              fontSize: theme.appFontSize.largeSize,
              fontFamily: theme.appFontSize.fontFamily,
            }]}>
              {reduxLang.YourMessage}
            </Text>


            <TextInput
              style={[
                styles.textInput,
                styles.marginBot,
                {
                  backgroundColor: theme.primaryBackgroundColor,
                  color: theme.textColor,
                  height: HEIGHT * 0.1 + heightValue,
                  fontSize: theme.appFontSize.mediumSize,
                  fontFamily: theme.appFontSize.fontFamily
                },
                styles.textAlignVertical,
              ]}
              onChangeText={(text) => onChangeMsgText(text)}
              placeholder={reduxLang.YourComment}
              placeholderTextColor={'gray'}
              value={msgText}
              editable={true}
              multiline={true}
              onContentSizeChange={(e) =>
                setHeight(e.nativeEvent.contentSize.height)
              }
            />

            <TouchableOpacity
              onPress={() => setModalVisibles(false)}
              style={[styles.btnView, {
                backgroundColor: theme.primary
              }]}>
              <Text
                onPress={() => setModalVisibles(false)}
                style={{
                  color: theme.primaryTextColor,
                  fontSize: theme.appFontSize.smallSize + 1,
                  fontFamily: theme.appFontSize.fontFamily
                }}
              >
                {reduxLang.Send}
              </Text>
            </TouchableOpacity>

          </View>
        </Modal>

        {/* modal end */}

        <View style={styles.reviewHeader}>

          <View style={styles.averageRatingView}>

            <Text style={[styles.averageText, {
              color: theme.textColor,
              fontSize: theme.appFontSize.largeSize + 6,
              fontFamily: theme.appFontSize.fontFamily,
            }]}>

              {'4.8'}
              <Text style={[styles.fontWeight, {
                color: theme.secondry,
                fontSize: theme.appFontSize.smallSize + 1,
                fontFamily: theme.appFontSize.fontFamily
              }]}>
                {' / ' + 5}
              </Text>
            </Text>

            <View style={styles.reviewContainer}>
              <ReviewStar
                theme={theme}
                counterValue={3}
                starSize={theme.appFontSize.largeSize + 2}
              />
            </View>

            <Text style={[styles.allUsersRatingtext, {
              color: theme.secondry,
              fontSize: theme.appFontSize.smallSize + 1,
              fontFamily: theme.appFontSize.fontFamily
            }]}>
              {'13197' + ' ' + reduxLang.rating}
            </Text>

          </View>

          <View style={[styles.viewDivider, { borderColor: theme.secondry }]}>

            {signleRatingFun('123k', 5)}
            {signleRatingFun('243k', 4)}
            {signleRatingFun('5643k', 3)}
            {signleRatingFun('2k', 2)}
            {signleRatingFun('456k', 1)}

          </View>

        </View>

        <TouchableOpacity
          onPress={() => showModal()}
          style={[styles.btnView, {
            backgroundColor: theme.primary
          }]}>
          <Text
            style={{
              color: theme.primaryTextColor,
              fontSize: theme.appFontSize.smallSize + 1,
              fontFamily: theme.appFontSize.fontFamily
            }}
          >
            {reduxLang.GiveReview}
          </Text>
        </TouchableOpacity>



        {userReview('elibenaderet', '2021-03-15 15:45:35',
          require('../images/maleAvatar.png'),
          1, reduxLang.ShipmentveryfastGreatproductThankyou)}


        {userReview('elibenaderet', '2021-03-15 15:45:35',
          require('../images/maleAvatar.png'),
          3, reduxLang.GlobalText)}


        {userReview('elibenaderet', '2021-03-15 15:45:35',
          require('../images/maleAvatar.png'),
          1, reduxLang.ShipmentveryfastGreatproductThankyou)}


        {userReview('elibenaderet', '2021-03-15 15:45:35',
          require('../images/maleAvatar.png'),
          4, reduxLang.GlobalText2)}


        {userReview('elibenaderet', '2021-03-15 15:45:35',
          require('../images/maleAvatar.png'),
          5, reduxLang.GlobalText)}


        {userReview('elibenaderet', '2021-03-15 15:45:35',
          require('../images/maleAvatar.png'),
          1, reduxLang.GlobalText2)}


      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  commentText: {
    alignSelf: 'flex-start',
    paddingVertical: 8,
    paddingHorizontal: 8
  },
  allUsersRatingtext: {
    paddingBottom: 9
  },
  viewDivider: {
    borderLeftWidth: 1
  },
  singleRatingView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 2,
    paddingLeft: 28
  },
  modalHeading: {
    marginVertical: 9
  },
  reviewContainer: {
    alignSelf: 'center',
    alignContent: 'center',
    alignItems: 'center',
    padding: 5,
    paddingBottom: 9
  },
  starTopPadding: {
    paddingTop: 12
  },
  userReviewContainer: {
    paddingHorizontal: 4,
    margin: 10
  },
  averageRatingView: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  averageText: {
    fontWeight: 'bold',
    paddingBottom: 8
  },
  fontWeight: {
    fontWeight: 'normal'
  },
  reviewHeader: {
    flexDirection: 'row',
    width: WIDTH,
    justifyContent: 'space-evenly',
    padding: 20
  },
  userReviewInnerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  userImageContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  dateStyle: {
    alignSelf: 'flex-start',
    paddingVertical: 3,
  },
  commentTextHeading: {
    marginVertical: 9
  },
  signleTextRating: {
    paddingLeft: 5
  },
  textAlignVertical: {
    textAlignVertical: 'top',
  },
  userImage: {
    height: WIDTH * 0.11,
    width: WIDTH * 0.11,
    margin: 6,
    borderRadius: 100
  },
  textInput: {
    borderColor: 'gray',
    width: '93%',
    borderRadius: 10,
    padding: 10,
    marginTop: 8,
    marginBottom: 6,
    textAlign: I18nManager.isRTL ? 'right' : 'left',
    alignSelf: 'center',
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
  },
  marginBot: {
    marginBottom: 16
  },
  modalView: {
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    padding: 9,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    bottom: 0,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: '100%',
    position: 'absolute',
    paddingBottom: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnView: {
    width: WIDTH * 0.3,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 6,
    borderRadius: 8,
    alignSelf: 'center'
  }
});

const mapStateToProps = (state: any) => ({
  theme: state.configReducer.theme,
  reduxLang: state.configReducer.lang
});


export default connect(
  mapStateToProps,
  null,
)(RatingReviewsScreen);
