// Refer to <build>\modules\web\commenting\typings\globals\mock-promises\index.d.ts for the latest changes
// For now, we are copy-pasting these typings but there are plans to publish these typings to github to
// pull from in the future

declare module 'mock-promises' {
  export function install(promiseClass: any): void;
  export function uninstall(): void;
  // export function reset(): void;

  export function getMockPromise(promiseClass: any) : any;
  export function getOriginalPromise(): any;

  export function executeForPromise(promise: Promise<any>): void;
  export function executeForResolvedPromises(): void;
  export function iterateForPromise(promise: Promise<any>): void;

  export function valueForPromise<T>(promise: Promise<T>): T;
}
