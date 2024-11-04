export class QueuedRequest {
  id: number;
  running: boolean;
  priority: number;
  fn: any;
  message: string;
  constructor(id: number, priority: number, fn: any, message: string) {
    this.id = id;
    this.running = false;
    this.priority = priority;
    this.fn = fn;
    this.message = message;
  }
}
