export interface userResponseProps {
  message: string;
  data: {
    _id: string;
    username: string;
    email: string;
    gender: string;
    avatar: string;
    createdAt: string;
    updatedAt: string;
  }[];
}
