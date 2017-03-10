interface AuthInfo {
    accessToken: string;
    userId: string;
}
interface Metadata {
    [name: string]: string | undefined;
}
interface BoxMetadata extends Metadata {
    folderId: string;
}
interface Headers {
    [name: string]: string | undefined;
}
interface FileAttrs {
    fileExtension: string;
    fileID: string;
    fileMetadata: Metadata;
    fileName: string;
}
interface Request {
    downloadHeaders: Headers;
    downloadURL: string;
}
interface Environment {
    buildNumber: string;
    edition: string;
    locale: string;
    os: string;
    version: string;
    supportedFileTypes: FileTypeMap;
}
interface FileTypeMap {
    [name: string]: string[];
}
interface CloudFileError {
    message: string;
}
interface LogMessage {
    message: string;
}
declare enum Provider {
    Invalid = 0,
    box = 1,
    dropbox = 2,
    oneDrive = 3,
}
declare enum Severity {
    Trace = 0,
    Debug = 1,
    Info = 2,
    Warn = 3,
    Error = 4,
    Fatal = 5,
    Off = 6,
    LogDetail = 7,
}
export { AuthInfo, Metadata, BoxMetadata, Headers, FileAttrs, FileTypeMap, Request, Environment, CloudFileError, LogMessage, Provider, Severity };
