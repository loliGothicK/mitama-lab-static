import Version from '../types/Version';

const ReleaseNotes: {
  [K: Version]: {
    wahtsNew: string[];
    bufFix: string[];
    packages: {
      zip: `https://storage.cloud.google.com/mitamatch-operations-installer/MitamatchOperations%20(Package)_${typeof K}.0_Test.zip`;
    };
  };
} = {
  '0.1.14': {
    wahtsNew: [],
    bufFix: ['ダッシュボードで5番目のオーダーが読み込まれない不具合を修正'],
    packages: {
      zip: 'https://storage.cloud.google.com/mitamatch-operations-installer/MitamatchOperations%20(Package)_0.1.14.0_Test.zip',
    },
  },
  '0.1.13': {
    wahtsNew: [
      'コントロール ダッシュボード: リアルタイムオーダー指示サポート用ダッシュボード',
    ],
    bufFix: ['オーダー コンソールでドラッグ時にクラッシュする不具合を修正'],
    packages: {
      zip: 'https://storage.cloud.google.com/mitamatch-operations-installer/MitamatchOperations%20(Package)_0.1.13.0_Test.zip',
    },
  },
  '0.1.12': {
    wahtsNew: [
      'レギオン コンソールでメンバーを読み込むように',
      'オーダー担当者をログインレギオンから取得するように',
    ],
    bufFix: ['オーダー保存・読み込み時のクラッシュを修正'],
    packages: {
      zip: 'https://storage.cloud.google.com/mitamatch-operations-installer/MitamatchOperations%20(Package)_0.1.12.0_Test.zip',
    },
  },
  '0.1.11': {
    wahtsNew: ['ライトモード/ダークモードに対応'],
    bufFix: ['初回ロード時のクラッシュを修正'],
    packages: {
      zip: 'https://storage.cloud.google.com/mitamatch-operations-installer/MitamatchOperations%20(Package)_0.1.11.0_Test.zip',
    },
  },
  '0.1.10': {
    wahtsNew: ['オーダー自動編成', 'レギオンメンバー管理', '所持オーダー管理'],
    bufFix: ['細かいバグ修正を行いました'],
    packages: {
      zip: 'https://storage.cloud.google.com/mitamatch-operations-installer/MitamatchOperations%20(Package)_0.1.10.0_Test.zip',
    },
  },
};

export default ReleaseNotes;
