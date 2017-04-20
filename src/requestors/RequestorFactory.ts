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

import { AuthInfo } from '../types/ShimTypes';
import { BoxRequestor } from './BoxRequestor';
import { DropboxRequestor } from './DropboxRequestor';
import { Logger } from '../utils/Logger';
import { OneDriveRequestor } from './OneDriveRequestor';
import { Provider } from '../types/ShimTypes';
import { ProviderInfo } from '../providers/ProviderInfo';
import { Requestor } from './Requestor';
import { shim } from '../shim/Shim';

class RequestorFactory {
  public static getRequestor(provider: Provider, providerInfo: ProviderInfo): Requestor {
    const authInfo: AuthInfo = shim.getAuthInfo();
    const providerName = providerInfo.getProviderName();
    Logger.info(`Requestor = ${ providerName }`);
    if (provider === Provider.box) {
      return new BoxRequestor(authInfo, providerInfo);
    } else if (provider === Provider.dropbox) {
      return new DropboxRequestor(authInfo, providerInfo);
    } else if (provider === Provider.oneDrive) {
      return new OneDriveRequestor(authInfo, providerInfo);
    } else {
      const errorMessage = `Invalid provider: ${ providerName }`;
      Logger.error(errorMessage);
      throw new Error(errorMessage);
    }
  }
}

export { RequestorFactory };
