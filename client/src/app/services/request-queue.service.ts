import { Injectable } from '@angular/core';
import {QueuedRequest} from '../classes/queuedRequest';

@Injectable({
  providedIn: 'root'
})
export class RequestQueueService {
  requestQueue: Array<QueuedRequest> = []
  latestRequestID: number = 0;
  constructor() {
    setInterval(() => {
      if (this.requestQueue.length === 0) return
      let highestPriorityIndex = 0;
      for (let i = 0; i < this.requestQueue.length; i++) {
        if (this.requestQueue[i].priority > this.requestQueue[highestPriorityIndex].priority) {
          highestPriorityIndex = i;
        }
      }
      let currentRequest = this.requestQueue[highestPriorityIndex];
      if (currentRequest.running) return;
      currentRequest.fn();
      currentRequest.running = true;
    }, 100)
  }
  addRequest(id: number, priority: number, fn: any, message: string) {
    this.requestQueue.push(new QueuedRequest(id, priority, fn, message));
  }
  getLatestRequestID() {
    let id = this.latestRequestID
    this.latestRequestID += 1;
    return id;
  }
  findRequestByID(id: number): QueuedRequest | null {
    let requestIndex = this.findRequestIndexByID(id)
    if (!requestIndex) return null;
    return this.requestQueue[requestIndex]
  }
  findRequestIndexByID(id: number): number {
    for (let i = 0; i < this.requestQueue.length; i++) {
      if (this.requestQueue[i].id === id) {
        return i;
      }
    }
    return -1;
  }
  requestSuccessful(id: number) {
    let requestIndex = this.findRequestIndexByID(id);
    if (requestIndex === -1) return;
    this.requestQueue.splice(requestIndex, 1);
  }
  requestFailed(id: number, e: any) {
    let requestIndex = this.findRequestIndexByID(id);
    if (requestIndex === -1) return;
    this.requestQueue[requestIndex].running = false;

    this.requestQueue.push(this.requestQueue.splice(requestIndex, 1)[0]);
    console.log(e);
  }
  resetQueue() {
    this.requestQueue = [];
  }
}
