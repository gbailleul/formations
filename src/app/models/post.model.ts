export class Post {
  public created_at: Date;
  constructor(public title: string, public content: string, public loveIt: number) {
    this.title = title;
    this.content = content;
    this.loveIt = 0;
    this.created_at = new Date();
  }
}
