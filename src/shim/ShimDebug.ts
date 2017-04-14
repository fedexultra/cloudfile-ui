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
import { log } from '../utils/Logger';
import { ShimInterface } from './Shim';

// Basic shim for debugging that is used when this project
// is loaded outside of the Tableau context.
export class ShimDebug implements ShimInterface {
  public cancel(): void {
    log('Cancel shim method invoked. Ending execution.');
    throw new Error('Program termination requested.');
  }

  public connect(file: FileAttrs, request: Request): void {
    log('Connect shim method invoked. Ending execution.');
    throw new Error('Program termination requested.');
  }

  public getAuthInfo(): AuthInfo {
    log('GetAuthInfo shim method invoked. Returning dummy data.');
    const auth: AuthInfo = {
      userId: 'dummy@gmail.com',
      accessToken: '0UQLbIImR4gljBygJcgZT2XBHebz8hqY'
    };
    return auth;
  }

  public getCloudProvider(): Provider {
    log('GetCloudProvider shim method invoked. Returning dummy data.');
    return Provider.box;
  }

  public getConnectedFile(): FileAttrs {
    log('GetConnectedFile shim method invoked. Returning dummy data.');
    const file: FileAttrs = {
      fileName: 'dummy_file.xlsx',
      fileID: 'aj84nfkf9485jnfdnf',
      fileExtension: 'xlsx',
      fileMetadata: {'folder': 'a/b/dummy_file.xlsx'}
    };
    return file;
  }

  public getTableauEnvironment(): Environment {
    log('GetTableauEnvironment shim method invoked. Returning dummy data.');
    const environment: Environment = {
      version: '0.0.0',
      edition: 'None',
      locale: 'en_US',
      os: 'win',
      buildNumber: '0.0.0000',
      supportedFileTypes: {'debug': ['xlsx', 'txt'] },
    };
    return environment;
  }

  public log(message: LogMessage, severity: Severity): void {
    log('Log shim method invoked.');
    log('Message: ' + message.message);
    log('Severity: ' + Severity[severity]);
  }

  public refreshAuth(): string {
    log('RefreshAuth shim method invoked. Returning dummy data.');
    return 'EsbePkzKGaDcSwV9UhQmdUIVSDOwJaGu';
  }

  public reportError(error: CloudFileError): void {
    log('ReportError shim method invoked. Ending execution.');
    throw new Error('Program termination requested.');
  }

  public signOut(): void {
    log('SignOut shim method invoked. Ending execution.');
    throw new Error('Program termination requested.');
  }

}
