interface Task {
   run: () => Promise<any>;
}

/**
 * request queue
 * Prevent server crash due to high concurrency
 */
export class RequestQueue {
   public taskLimit: number = 10;
   public taskQueue: any[] = [];
   public targetQueue: any[] = [];

   public get taskQueueLen() {
      return this.targetQueue.length;
   }
   public get isLimit() {
      return this.taskQueueLen >= this.taskLimit;
   }

   public push(task: Task) {
      if (!this.taskQueueLen) {
         const len = this.taskQueue.push(task);
         return task.run().then(() => {
            this.pop(len - 1);
         });
      }
      return this.targetQueue.push(task);
   }
   
   public pop(index: number) {
      if (!this.taskQueueLen) return;
      this.taskQueue.splice(index, 1);
      if (this.targetQueue.length)
         return this.push(this.targetQueue.shift());
   }
}
