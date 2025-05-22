import express from 'express';

export class App {
  public app: express.Application;

  constructor() {
    this.app = express();
  }

  public listen(port: number): void {
    this.app.listen(port, () => {
      console.log(`🚀 Server running on http://localhost:${port}`);
    });
  }
}
