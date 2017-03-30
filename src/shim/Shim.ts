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

import { ShimDebug } from './ShimDebug';
import { FileAttrs, Request, AuthInfo, CloudFileError, Environment, LogMessage, Severity, Provider } from '../types/ShimTypes';
import { ShimV1 } from './ShimV1';
import { shimVersion } from './Utilities';

/* tslint:disable-next-line:no-any */
declare const cloudFileBridge: any;
export declare let shim: ShimInterface;

// This is the public interface that is exposed to the JS code
// In order to ensure that the business logic does not need
// to know the version of Tableau that it is interacting with,
// a common interface needs to be used. Different versions
// of the shim may interact with different bridge methods,
// or may differ in the parameters they pass to and receive
// from the bridge.
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

// This should only be called once. It detects which version of
// Tableau is running and instantiates the proper version of
// the shim as a global variable.
export function createShim(): void {
  try {
    const environment: Environment = cloudFileBridge.GetTableauEnvironment();
    const version: number = shimVersion(environment.version);

    if (version === 1) {
      shim = new ShimV1();
    } else {
      throw new Error('Invalid shim version. Version is ' + version);
    }
  } catch (err) {
    // $TODO - We should only instantiate a debug shim in debug and dev builds
    // Otherwise, this should throw an error so if the user tries to access the
    // UI URL directly, we simply display an error message. Define a plugin in
    // webpack to make this possible.
    shim = new ShimDebug();
  }
}
