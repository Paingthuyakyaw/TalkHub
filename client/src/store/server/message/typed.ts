export interface GetMessageResponse {
  message: string;
  data: {
    _id: string;
    participants: {
      _id: string;
      username: string;
      email: string;
    }[];
    message: {
      _id: string;
      senderId: string;
      receiverId: string;
      message: string;
    }[];
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
}
