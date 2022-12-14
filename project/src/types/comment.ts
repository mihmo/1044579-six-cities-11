export type Comment = {
  message: string;
  date: string;
  id: number;
  rating: number;
  user: {
    avatarUrl: string;
    id: number;
    isPro: boolean;
    name: string;
  };
};

export type NewComment = Pick<Comment, 'comment' | 'rating'>;
