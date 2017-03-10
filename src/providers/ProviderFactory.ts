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

import { Box } from './Box';
import { Dropbox } from './Dropbox';
import { OneDrive } from './OneDrive';
import { Provider } from '../types/ShimTypes';
import { ProviderInfo } from './ProviderInfo';

class ProviderInfoFactory {
  public static getProviderInfo(provider: Provider): ProviderInfo {
    if (provider === Provider.box) {
      return new Box();
    } else if (provider === Provider.dropbox) {
      return new Dropbox();
    } else if (provider === Provider.oneDrive) {
      return new OneDrive();
    } else {
      throw new Error('Invalid provider: ' + provider.toString());
    }
  }
}

export { ProviderInfoFactory };
