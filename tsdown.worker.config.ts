// Worker/CLI build config for the Yuno PaaS image (Dockerfile.worker).
//
// Reuses the repo's default tsdown build but turns OFF .d.ts generation: the
// runtime image only runs the `promptfoo` CLI, it never ships type declarations,
// and tsgo's dts pass is what exhausts memory on an 8 GB builder (SIGKILL /
// "cannot allocate memory"). Disabling dts keeps every JS output (server, CLI,
// library esm+cjs) — which the runtime still needs — while making the build fit.
import { defineConfig } from 'tsdown';

import base from './tsdown.config.ts';

const configs = Array.isArray(base) ? base : [base];

export default defineConfig(
  configs.map((c) => ({ ...c, dts: false, sourcemap: false })),
);
