import { PostWithUserData, User } from "./types";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type State = {
  posts: PostWithUserData[];
  user: User | null;
};

type Action = {
  setPosts: (posts: PostWithUserData[]) => void;
  removePost: (id: string) => void;
  addPost: (post: PostWithUserData) => void;
  setUser: (user: User) => void;
  clearUser: () => void;
};

// define the initial state
const initialState: State = {
  posts: [],
  user: null,
};

export const useStore = create<State & Action>()(
  immer((set, get) => ({
    ...initialState,

    setPosts: (posts) => set({ posts }),

    removePost: (id) => {
      const newPosts = get().posts.filter((post) => post.id !== id);
      set({ posts: newPosts });
    },

    addPost: (post) => {
      set({ posts: [post, ...get().posts] });
    },

    setUser: (user) => set({ user }),

    clearUser: () => set({ user: null }),
  })),
);
