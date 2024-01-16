import { Logger } from '@nestjs/common';

export const ExecutionLogger = () => {
  return (target: any, key: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;
    descriptor.value = async function (...args: any[]) {
      const methodName = key;
      const start = Date.now();

      try {
        const result = await originalMethod.apply(this, args);
        const end = Date.now();
        const executionTime = end - start;

        Logger.log(
          `${target.constructor.name}:: ${methodName} executed in ${executionTime}ms`,
        );

        return result;
      } catch (error) {
        const end = Date.now();
        const executionTime = end - start;

        Logger.error(`${methodName} failed after ${executionTime}ms`, error);
        throw error;
      }
    };

    return descriptor;
  };
};
