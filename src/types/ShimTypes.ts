// -----------------------------------------------------------------------------
//
// This file is the copyrighted property of Tableau Software and is protected
// by registered patents and other applicable U.S. and international laws and
// regulations.
//
// Unlicensed use of the contents of this file is prohibited. Please refer to
// the NOTICES.txt file for further details.
//
// -----------------------------------------------------------------------------

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

// $TODO - TFSID:591658  Update this to allow passing multiple
// error messages (and more detailed info)
interface CloudFileError {
  message: string;
}

interface LogMessage {
  message: string;
}

enum Provider {
  Invalid,
  box,
  dropbox,
  oneDrive
}

enum Severity {
  Trace,
  Debug,
  Info,
  Warn,
  Error,
  Fatal,
  Off,
  LogDetail
}

export { AuthInfo, Metadata, BoxMetadata, Headers, FileAttrs, FileTypeMap,
  Request, Environment, CloudFileError, LogMessage, Provider, Severity };
