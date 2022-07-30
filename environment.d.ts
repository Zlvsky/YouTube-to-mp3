// tell typescript that env variables are strings, not undefined
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      API_KEY: string;
      API_HOST: string
      PORT: string;
    }
  }
}
export {}