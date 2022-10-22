import { z } from 'zod';
import { Version } from '../types/Version';

const releaseNote = z.object({
  wahtsNew: z.array(z.string()),
  bufFix: z.array(z.string()),
  packages: z.object({
    zip: z.string().url(),
  }),
});

type ReleaseNote = z.infer<typeof releaseNote>;

const ReleaseNotes: { [K: Version]: ReleaseNote } = {
  'v0.1.10': releaseNote.parse({
    wahtsNew: ['オーダー自動編成', 'レギオンメンバー管理', '所持オーダー管理'],
    bufFix: ['細かいバグ修正を行いました'],
    packages: {
      zip: 'https://storage.cloud.google.com/mitamatch-operations-installer/MitamatchOperations%20(Package)_0.1.10.0_Test.zip',
    },
  }),
};

export default ReleaseNotes;
