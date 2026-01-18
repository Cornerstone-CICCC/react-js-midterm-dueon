import "express-session";

declare module "express-session" {
  interface SessionData {
    isLoggedIn: boolean;
    userId: string;
    username: string;
    role: string;
    status: boolean;
  }
}
