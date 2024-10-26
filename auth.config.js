export const authConfig = {
  pages: {
    signIn: "/login",
    error: "/error",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const inRoute = nextUrl.pathname;
      if (isLoggedIn) {
        if (inRoute === "/register" || inRoute === "/login") {
          return Response.redirect(new URL("/", nextUrl));
        }
        return true;
      } else {
        if (inRoute === "/register" || inRoute === "/login") return true;
        return false;
      }
    },
    async jwt({ token, user }) {
      // First login, attach user data to the token
      if (user) {
        token.id = user.id; // Add user ID to the token
        token.username = user.username; // Add username to the token
      }
      return token;
    },
    async session({ session, token }) {
      // Attach token data (like user ID and username) to the session object
      session.user.id = token.id; // Pass user ID to the session
      session.user.username = token.username; // Pass username to the session
      return session;
    },
  },
  providers: [],
};
