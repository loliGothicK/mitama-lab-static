import { tocAtom } from './toc';
import { selector } from 'recoil';

export const CurrentHead = selector({
  key: 'Current',
  get: ({ get }) => get(tocAtom),
});
