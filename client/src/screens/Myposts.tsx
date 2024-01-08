import {View, Text, ScrollView, StyleSheet, Alert} from 'react-native';
import React, {useState, useEffect} from 'react';
import FooterMenu from '../components/Menus/FooterMenu';
import axios from 'axios';
import PostCard from '../components/PostCard';

interface Post {
  _id: string;
  title: string;
  description: string;
}

interface ResponseData {
  userPosts: Post[];
}

const Myposts = () => {
  //state
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);

  //get user post
  const getUserPosts = async () => {
    try {
      setLoading(true);
      const {data} = await axios.get<ResponseData>('/post/get-user-post');
      setLoading(false);
      setPosts(data?.userPosts);
    } catch (error: any) {
      setLoading(false);
      console.log(error);
      Alert.alert(error);
    }
  };

  //initial
  useEffect(() => {
    getUserPosts();
  }, []);
  return (
    <View style={styles.container}>
      <ScrollView>
        <PostCard posts={posts} myPostScreen={true} />
        {/* <Text>{JSON.stringify(posts, null, 4)}</Text> */}
      </ScrollView>
      <View style={{backgroundColor: '#ffffff'}}>
        <FooterMenu />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    justifyContent: 'space-between',
  },
});
export default Myposts;
