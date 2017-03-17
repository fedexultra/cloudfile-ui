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
      accessToken: 'EwBAA8l6BAAU7p9QDpi/D7xJLwsTgCg3TskyTaQAAaHaTB3A xwQOthpE0Hegze2CeYrvwkZbIc/DAraoGdkp6yqQOOWNc4FB9cKr3kP7s6jVgeNtPEjSkAMJYzM7zQ/j/tEtwcpwtk pF6y3c6SawApQenEmroIae yF4bUg16ugJIIrFrjhZGu25suRuO4coSFOehIxZOekAhylTrnaLxhQSBzK//jj4AeuLaVugxyvCWz73K wNb5ssL9Q806LuQ/OsQbtcliuz82XfiJUIsVEW/K L/Jv78/RmKnte4SErs8NNaoXuQ1U7bG9y3YJgAFQ4Nbqi3bowy6wjexmskp3FB /xcGu8b1RJlr3RLwRI5uzeTrTlSYWCYZ YMDZgAACKOdRExa4awmEAI5VuICZkiQ935mkqucCUCtCIBPeybgZrp63EFw5yps9XBxNGBKyn9I8110IrXACgJfxVCkgqkPgDHaAWYmNes6is2fxpSa4sw/XfIOWOv5fC35SmLl0y98df28WilGYqByhWC6gklDZVwcbP6a0jYo2nQAOaWoEWrHOa/L7plO5LPS iGoD4U 2GUZbcARK6n7etQH0tVJoOXXhkxXvpVUM QveJfITpZTzj j7FTpO8gCaHtEOrUqLQwMnLmepUCPhALqlWZKsNkT0ChDexlV4lofi7YSJcjEybjHtjB8fkFt9Bw2fW3kUz5lSakZ5HleV9BJSx40aRR7GtJfDT UHFOK2XhCf17AtW4o 4aoSVFKJh6oLxrYrQ3jt4QjQRO9EzEGEINXEVtetfo014vqHbbCPT5A8rvv4zcZ3doHAnxZnkUpWsjiCfAom0ObDldhdOl4i6Q/FZtEX3H69AHkl16v0/7sZk1juoG0txr4ulYvFq5LqH1Q6So6dxb2tsIXVyVEMEDtnMzEr2liEZCEaC1jraab1vhEMqRwv1G06FXmLvRSBaUM1G48ApquD8OtPHKEp9gAlgkW1RqugVXrdGSnF1PfmxpouoVY1s3ZEtjfz1cEPIw1kewofdU1zb7vZHPdBSSQOcXWF45qgd2PsuJPMj7WDYWjLm ekRGUY3BXvGGvoAdNSzQt73J0nPFDAg=='
    };
    return auth;
  }

  public getCloudProvider(): Provider {
    log('GetCloudProvider shim method invoked. Returning dummy data.');
    return Provider.oneDrive;
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
