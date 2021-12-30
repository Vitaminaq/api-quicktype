import prettier from 'prettier';
import chalk from 'chalk';
import { createTypesFolder, TypeFile } from './utils';

interface Task {
   run: () => Promise<any>;
}

/**
 * request queue
 * Prevent server crash due to high concurrency
 */
export class RequestQueue {
   public taskLimit: number = 6;
   public taskQueue: any[] = [];
   public targetQueue: any[] = [];
   public writeQueue: WriteQueue;

   public constructor(writeQueue: WriteQueue) {
      this.writeQueue = writeQueue;
   }

   public get taskQueueLen() {
      return this.taskQueue.length;
   }
   public get isLimit() {
      return this.taskQueueLen >= this.taskLimit;
   }
   public get targetQueueLen() {
      return this.targetQueue.length;
   }

   public push(task: Task) {
      if (!this.isLimit) {
         this.taskQueue.push(task);
         return task.run().then(() => {
            this.pop();
         });
      }
      return this.targetQueue.push(task);
   }

   public pop() {
      this.taskQueue.pop();

      if (this.targetQueueLen)
         return this.push(this.targetQueue.shift());

      if (!this.taskQueueLen && !this.targetQueueLen) {
         this.writeQueue.run();
      }
   }
}

interface WriteTask {
   fileName: string;
   content: string;
}
interface Context {
   file: TypeFile;
   content: string;
}
/**
 * write file
 */
export class WriteQueue {
   public contentQueue: Record<string, Context> = {};

   public constructor() {
      createTypesFolder();
   }

   public push({ fileName, content }: WriteTask) {
      const target = this.contentQueue[fileName];
      if (!target) {
         this.contentQueue[fileName] = {
            file: new TypeFile(fileName),
            content
         };
      } else {
         this.contentQueue[fileName].content = target.content + content;
      }
   }
   public run() {
      const { contentQueue } = this;
      Object.keys(contentQueue).forEach((k) => {
         let { file, content } = contentQueue[k];
         const { filePath } = file;
         try {
            content = prettier.format(file.read() + content, { semi: true, tabWidth: 4, parser: "typescript" });
            console.log(chalk.green('[success]'), filePath);
         } catch(e) {
            console.log(chalk.yellow('[prettier fail]'), filePath);
         }
         file.write(content);
      });
   }
}
