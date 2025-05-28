export class GithubStrategy {
  private clientId: string;
  private clientSecret: string;

  constructor(clientId: string, clientSecret: string) {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
  }

  async getAccessToken(code: string): Promise<string> {
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_id: this.clientId,
        client_secret: this.clientSecret,
        code,
      }),
    });
    const tokenData = await tokenResponse.json();
    if (!tokenData.access_token) throw new Error('No access token from GitHub');
    return tokenData.access_token;
  }

  async getUserProfile(accessToken: string) {
    const userResponse = await fetch('https://api.github.com/user', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (!userResponse.ok) throw new Error('Failed to fetch user profile');
    const profile = await userResponse.json();
    // Normaliza el perfil a tu formato interno:
    return {
      name: profile.name || profile.login,
      email: profile.email || '',
      avatarUrl: profile.avatar_url,
      provider: 'github',
    };
  }
}
