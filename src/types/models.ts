export interface IPost {
  id: string;
  createdAt: string;
  image?: string;
  images?: string[];
  video?: string;
  description: string;
  user: IUser;
  nofComments: number;
  nofLikes: number;
  comments: IComment[];
}

export interface IUser {
  id: string;
  image: string;
  username: string;
}

export interface IComment {
  id: string;
  comment: string;
  user: {
    id: string;
    username: string;
    image?: string;
  };
}
