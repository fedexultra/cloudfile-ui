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

import { CloudItem } from '../types/CloudItemTypes';
import { FileAttrs, Metadata, Request } from '../types/ShimTypes';
import { Requestor } from '../requestors/Requestor';

abstract class ProviderInfo {
  // Constructs a Request object to use in a connect shim call
  public abstract constructDownloadRequest(item: CloudItem, requestor: Requestor): Request;

  // Gets the top-level folder identifier
  public abstract getDefaultFolder(): string;

  // Gets the name of the provider
  public abstract getProviderName(): string;

  // Constructs a FileAttrs object to use in a connect shim call
  public constructFileAttrs(selectedFile: CloudItem): FileAttrs {
    const metadata: Metadata = {'folder': selectedFile.path[selectedFile.path.length - 1].id};
    const fileAttrs: FileAttrs = {'fileName': selectedFile.name, 'fileID': selectedFile.id,
                                  'fileExtension': selectedFile.extension, 'fileMetadata': metadata};

    return fileAttrs;
  }
  public toString(): string {
    return `{providerName=${this.getProviderName()} defaultFolder=${this.getDefaultFolder()}}`;
  }
}

export { ProviderInfo };
