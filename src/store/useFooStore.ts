import { create } from 'zustand';

type FooStore = {
  foo: string;
  setFoo: (foo: string) => void;
};

export const useFooStore = create<FooStore>((set) => ({
  foo: 'bar',
  setFoo: (foo: string) => set({ foo }),
}));
