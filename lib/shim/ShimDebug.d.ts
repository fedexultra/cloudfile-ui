import { AuthInfo, CloudFileError, Environment, FileAttrs, LogMessage, Provider, Request, Severity } from '../types/ShimTypes';
import { ShimInterface } from './Shim';
export declare class ShimDebug implements ShimInterface {
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
