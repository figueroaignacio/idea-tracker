import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github2";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { UsersService } from "../services/auth.service";

export class PassportConfig {
  private userService: UsersService;

  constructor(userService: UsersService) {
    this.userService = userService;
    this.initGitHubStrategy();
    this.initGoogleStrategy();
    this.initSerializeUser();
  }

  private initGitHubStrategy(): void {
    passport.use(
      new GitHubStrategy(
        {
          clientID: process.env.GITHUB_CLIENT_ID || "",
          clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
          callbackURL:
            process.env.GITHUB_CALLBACK_URL ||
            "http://localhost:3000/api/auth/github/callback",
          scope: ["user:email"],
        },
        async (
          accessToken: string,
          refreshToken: string,
          profile: any,
          done: (error: any, user?: any) => void
        ) => {
          try {
            const user = await this.userService.findOrCreateUser({
              providerId: profile.id,
              provider: "github",
              email: profile.emails?.[0]?.value,
              name: profile.displayName,
              avatar: profile.photos?.[0]?.value,
            });
            return done(null, user);
          } catch (error) {
            return done(error);
          }
        }
      )
    );
  }

  private initGoogleStrategy(): void {
    passport.use(
      new GoogleStrategy(
        {
          clientID: process.env.GOOGLE_CLIENT_ID || "",
          clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
          callbackURL:
            process.env.GOOGLE_CALLBACK_URL ||
            "http://localhost:3000/api/auth/google/callback",
          scope: ["profile", "email"],
        },
        async (accessToken, refreshToken, profile, done) => {
          try {
            const user = await this.userService.findOrCreateUser({
              providerId: profile.id,
              provider: "google",
              email: profile.emails?.[0]?.value,
              name: profile.displayName,
              avatar: profile.photos?.[0]?.value,
            });
            return done(null, user);
          } catch (error) {
            return done(error);
          }
        }
      )
    );
  }

  private initSerializeUser(): void {
    passport.serializeUser((user: any, done) => {
      done(null, user.id);
    });

    passport.deserializeUser(async (id: number, done) => {
      try {
        const user = await this.userService.findUserById(id);
        done(null, user);
      } catch (error) {
        done(error);
      }
    });
  }
}
