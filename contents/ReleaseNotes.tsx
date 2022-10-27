import Version from '../types/Version';

export const Releases: (keyof typeof ReleaseNotes)[] = ['1.0.0'];

const ReleaseNotes: {
  [K: Version]: {
    whatsNew: string[];
    bufFix: string[];
    packages: {
      zip: `https://storage.cloud.google.com/mitamatch-operations-installer/MitamatchOperations%20(Package)_${typeof K}.0_Test.zip`;
    };
  };
} = {
  '1.0.0': {
    whatsNew: [
      'プロジェクト管理',
      'オーダーコンソール',
      'コントロールダッシュボード',
    ],
    bufFix: [],
    packages: {
      zip: 'https://storage.cloud.google.com/mitamatch-operations-installer/MitamatchOperations%20(Package)_1.0.0.0_Test.zip',
    },
  },
};

export default ReleaseNotes;
