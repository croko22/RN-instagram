import { ScrollView, StyleSheet } from "react-native";
import FeedPost from "./src/components/FeedPost";

const posts = [
  {
    "id": "1",
    "createdAt": "19 December 2021",
    "image": "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/images/1.jpg",
    "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic repellendus unde blanditiis. Eos fugiat dolorem ea fugit aut sapiente corrupti autem dolores deleniti architecto, omnis, amet unde dignissimos quam minima?",
    "user": {
      "id": "u1",
      "image": "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/1.jpg",
      "username": "croko22"
    },
    "nofComments": 11,
    "nofLikes": 34,
    "comments": [
      {
        "id": "1",
        "comment": "Lorem ipsum dolor sit amet consectetur adipisicing elit. H",
        "user": {
          "id": "u1",
          "username": "crok"
        }
      },
      {
        "id": "2",
        "comment": "Lorem ipsum dolor sit amet consectetur adipisicing elit. H",
        "user": {
          "id": "u1",
          "username": "vadimnotjustdev"
        }
      }
    ]
  },
  {
    "id": "2",
    "createdAt": "19 December 2021",
    "image": "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/images/2.jpg",
    "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic repellendus unde blanditiis. Eos fugiat dolorem ea fugit aut sapiente corrupti autem dolores deleniti architecto, omnis, amet unde dignissimos quam minima?",
    "user": {
      "id": "u1",
      "image": "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/2.jpg",
      "username": "amongas"
    },
    "nofComments": 11,
    "nofLikes": 34,
    "comments": [
      {
        "id": "1",
        "comment": "Lorem ipsum dolor sit amet consectetur adipisicing elit. H",
        "user": {
          "id": "u1",
          "username": "vadimnotjustdev"
        }
      },
      {
        "id": "2",
        "comment": "Lorem ipsum dolor sit amet consectetur adipisicing elit. H",
        "user": {
          "id": "u1",
          "username": "vadimnotjustdev"
        }
      }
    ]
  },
  {
    "id": "3",
    "createdAt": "19 December 2021",
    "image": "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/images/3.jpg",
    "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic repellendus unde blanditiis. Eos fugiat dolorem ea fugit aut sapiente corrupti autem dolores deleniti architecto, omnis, amet unde dignissimos quam minima?",
    "user": {
      "id": "u1",
      "image": "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/3.jpg",
      "username": "vadimnotjustdev"
    },
    "nofComments": 11,
    "nofLikes": 34,
    "comments": [
      {
        "id": "1",
        "comment": "Lorem ipsum dolor sit amet consectetur adipisicing elit. H",
        "user": {
          "id": "u1",
          "username": "vadimnotjustdev"
        }
      },
      {
        "id": "2",
        "comment": "Lorem ipsum dolor sit amet consectetur adipisicing elit. H",
        "user": {
          "id": "u1",
          "username": "vadimnotjustdev"
        }
      }
    ]
  },
  {
    "id": "4",
    "createdAt": "19 December 2021",
    "image": "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/images/4.jpg",
    "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic repellendus unde blanditiis. Eos fugiat dolorem ea fugit aut sapiente corrupti autem dolores deleniti architecto, omnis, amet unde dignissimos quam minima?",
    "user": {
      "id": "u1",
      "image": "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/4.jpg",
      "username": "vadimnotjustdev"
    },
    "nofComments": 11,
    "nofLikes": 34,
    "comments": [
      {
        "id": "1",
        "comment": "Lorem ipsum dolor sit amet consectetur adipisicing elit. H",
        "user": {
          "id": "u1",
          "username": "vadimnotjustdev"
        }
      },
      {
        "id": "2",
        "comment": "Lorem ipsum dolor sit amet consectetur adipisicing elit. H",
        "user": {
          "id": "u1",
          "username": "vadimnotjustdev"
        }
      }
    ]
  }
]

const App = () => {
  return (
    <ScrollView style={styles.app}>
      {posts.map((post) => (
        <FeedPost key={post.id} post={post} />
      ))}  
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  app: {
    paddingTop: 50,
    flex: 1,
  },
});

export default App;
