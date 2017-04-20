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

import { AuthInfo, CloudFileError, Environment, FileAttrs, LogMessage, Provider, Request, Severity } from '../types/ShimTypes';
import { ShimInterface } from './Shim';

export class ShimMock implements ShimInterface {
  public cancel(): void {
      return;
  }

  public connect(file: FileAttrs, request: Request): void {
      return;
  }

  public getAuthInfo(): AuthInfo {
    const auth: AuthInfo = {
      userId: 'MockUserId',
      accessToken: 'MockAccessToken'
    };
    return auth;
  }

  public getCloudProvider(): Provider {
    return Provider.Invalid;
  }

  public getConnectedFile(): FileAttrs {
    const file: FileAttrs = {
      fileName: 'MockFileName',
      fileID: 'MockFileId',
      fileExtension: 'MockFileExtension',
      fileMetadata: {'MockKey': 'MockValue'}
    };
    return file;
  }

  public getTableauEnvironment(): Environment {
    const environment: Environment = {
      version: 'MockVersion',
      edition: 'MockEdition',
      locale: 'MockLocale',
      os: 'MockOS',
      buildNumber: 'MockBuildNumber',
      supportedFileTypes: {'MockFileType': ['MockExtension1', 'MockExtension2']},
    };
    return environment;
  }

  public log(message: LogMessage, severity: Severity): void {
      return;
  }

  public refreshAuth(): string {
    return 'MockNewAccessToken';
  }

  public reportError(error: CloudFileError): void {
      return;
  }

  public signOut(): void {
      return;
  }

}
