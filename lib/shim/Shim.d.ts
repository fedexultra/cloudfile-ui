import { FileAttrs, Request, AuthInfo, CloudFileError, Environment, LogMessage, Severity, Provider } from '../types/ShimTypes';
export declare let shim: ShimInterface;
export interface ShimInterface {
    cancel(): void;
    connect(file: FileAttrs, request: Request): void;
    getAuthInfo(): AuthInfo;
    getCloudProvider(): Provider;
    getConnectedFile(): FileAttrs;
    getTableauEnvironment(): Environment;
    log(message: LogMessage, severity: Severity): void;
    refreshAuth(): string;
    reportError(error: CloudFileError): void;
    signOut(): void;
}
export declare function createShim(): void;
