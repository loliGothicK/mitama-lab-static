import { z } from "zod";

const VersionZ = z.string().regex(/^v\d+\.\d+\.\d+$/);

export type Version = z.infer<typeof VersionZ>;
export type Versions = z.infer<typeof VersionZ>[];

export default VersionZ;
