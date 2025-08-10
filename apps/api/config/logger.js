export const createLogger = () => {
  return {
    info: (message, meta) => {
      console.log(`[INFO] ${message}`);
      if (meta) {
        console.log(JSON.stringify(meta, null, 2));
      }
    },
    error: (message, meta) => {
      console.error(`[ERROR] ${message}`);
      if (meta) {
        console.error(JSON.stringify(meta, null, 2));
      }
    },
    warn: (message, meta) => {
      console.warn(`[WARN] ${message}`);
      if (meta) {
        console.warn(JSON.stringify(meta, null, 2));
      }
    }
  };
};