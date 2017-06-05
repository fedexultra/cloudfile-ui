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

import { CloudItem, NullCloudItem } from './CloudItemTypes';
import { IconDefinition } from '../types/IconTypes';

interface Column {
  id: number;
  title: string;
  width: string;
  hasBorder: boolean;
  getIconFromRow: (row: Row) => IconDefinition;
  getCellFromRow: (row: Row) => string;
}

interface Row {
  cloudItem: CloudItem;
}

class NullRow implements Row {
  public cloudItem: CloudItem = new NullCloudItem();
}

export { Row, Column, NullRow }
