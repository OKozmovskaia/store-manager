import React, { useEffect, useState, useRef } from 'react';
import { ScrollView, Image, View, Text, StyleSheet, Dimensions } from 'react-native';
import { Header } from 'react-native-elements';

const DEVICE_WIDTH = Dimensions.get("window").width;

export default function InstagramFeed ({route}) {

  // Fetching data from Instagram API
  const [data, setData] = useState([]);
  const [fetchingData, setFetchingData] = useState(0)
  
  useEffect(() => {
    fetch(`https://graph.instagram.com/me/media?fields=media_url&access_token=${route.params.token}`)
      .then(res => res.json())
      .then(json => setData(json.data))
      .catch(err => console.log(err))
  }, []);

  const [profile, setProfile] = useState({});

  useEffect(() => {
    fetch(`https://graph.instagram.com/me?fields=username&access_token=${route.params.token}`)
      .then(res => res.json())
      .then(json => setProfile(json))
      .catch(err => console.log(err))
  }, []);

  // Style and animated images
  const [selectedIndex, setSelectedIndex] = useState(0);
  const scrollRef = useRef();
  useEffect(() => {
    setTimeout(() => {
      setSelectedIndex(prev => (prev === data.length - 1 ? 0 : prev + 1));
      if (scrollRef.current) {
        scrollRef.current.scrollTo({
          animated: true,
          y: 0,
          x: DEVICE_WIDTH * selectedIndex
        });
      }
      setFetchingData(0);
    }, 4000)
  }, [selectedIndex]);

  const countCurrentIndex = event => {
    // get width of device
    const viewSize = event.nativeEvent.layoutMeasurement.width;
    // get current position of FlatList
    const contentOffset = event.nativeEvent.contentOffset.x;

    const selectedIndex = Math.floor(contentOffset / viewSize)
    setSelectedIndex(selectedIndex);
  }
  
  // CSS for component
  const styles = StyleSheet.create({
    imageItem: {
      width: DEVICE_WIDTH,
      height: '100%',
      alignSelf: 'center',
      borderRadius: 10,
    },
    titleHeader: {
      paddingHorizontal: 20,
      paddingVertical: 15,
      fontSize: 20,
      fontWeight: 'bold'
    },
    circleContainer: {
      position: "absolute",
      bottom: 15,
      height: 10,
      width: "100%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center"
    },
    circleWhite: {
      width: 6,
      height: 6,
      borderRadius: 3,
      margin: 5,
      backgroundColor: "#fff"
    }
  });

  return (
    <View style={{flex:1, width: '100%', height: '100%'}}>
        <Text style={styles.titleHeader}>@{profile.username}</Text>
        
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={countCurrentIndex}
          ref={scrollRef}
        >
          {data.map(item => {
            return (<Image
              key={item.id}
              source={{uri: item.media_url}}
              style={styles.imageItem}
            />)
          })}
        </ScrollView>
        <View style={styles.circleContainer}>
          {data.map((image, index) => {
            return (
              <View
              key={image.id}
              style={[styles.circleWhite, {opacity: index === selectedIndex ? 1 : 0.5}]}
              />
            )
          })}
        </View>
    </View>
  );
};
