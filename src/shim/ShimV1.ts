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

import { FileAttrs, Request, AuthInfo, CloudFileError, Environment, LogMessage, Severity, Provider } from '../types/ShimTypes';
import { ShimInterface } from './Shim';

/* tslint:disable-next-line:no-any */
declare const cloudFileBridge: any;

export class ShimV1 implements ShimInterface {
  public cancel(): void {
    cloudFileBridge.Cancel();
  }

  public connect(file: FileAttrs, request: Request): void {
    cloudFileBridge.Connect(file, request);
  }

  public getAuthInfo(): AuthInfo {
    return cloudFileBridge.GetAuthInfo();
  }

  public getCloudProvider(): Provider {
    const provider: string = cloudFileBridge.GetCloudProvider();
    if (provider === 'box') {
      return Provider.box;
    } else if (provider === 'dropbox') {
      return Provider.dropbox;
    } else if (provider === 'onedrive') {
      return Provider.oneDrive;
    }
    return Provider.Invalid;
  }

  public getConnectedFile(): FileAttrs {
    return cloudFileBridge.GetConnectedFile();
  }

  public getTableauEnvironment(): Environment {
    return cloudFileBridge.GetTableauEnvironment();
  }

  public log(message: LogMessage, severity: Severity): void {
    cloudFileBridge.Log(message.message, Severity[severity]);
  }

  public refreshAuth(): string {
    return cloudFileBridge.RefreshAuth();
  }

  public reportError(error: CloudFileError): void {
    cloudFileBridge.ReportError(error);
  }

  public signOut(): void {
    cloudFileBridge.SignOut();
  }
}
