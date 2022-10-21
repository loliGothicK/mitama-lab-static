import { z } from 'zod';
import { Version } from '../types/Version';

const releaseNote = z.object({
  wahtsNew: z.array(z.string()),
  bufFix: z.array(z.string()),
  packages: z.object({
    certificate: z.string().url(),
    appinstaller: z.string().url(),
  }),
});

type ReleaseNote = z.infer<typeof releaseNote>;

const ReleaseNotes: { [K: Version]: ReleaseNote } = {
  'v0.1.10': releaseNote.parse({
    wahtsNew: ['オーダー自動編成', 'レギオンメンバー管理', '所持オーダー管理'],
    bufFix: ['細かいバグ修正を行いました'],
    packages: {
      certificate:
        'https://storage.cloud.google.com/mitamatch-operations-installer/v0.1.10/MitamatchOperations%20(Package)_0.1.10.0_x86_x64_arm64.cer',
      appinstaller:
        'https://storage.cloud.google.com/mitamatch-operations-installer/v0.1.10/MitamatchOperations%20(Package).appinstaller',
    },
  }),
};

export default ReleaseNotes;
