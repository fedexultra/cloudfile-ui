import { FileAttrs, Request, AuthInfo, CloudFileError, Environment, LogMessage, Severity, Provider } from '../types/ShimTypes';
import { ShimInterface } from './Shim';
export declare class ShimV1 implements ShimInterface {
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
