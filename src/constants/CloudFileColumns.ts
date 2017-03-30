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

import { Column } from '../types/DataGridTypes';
import { EmptyIcon} from '../icons/Icons';
import { Formatters, Messages } from '../codegen/Localize';
import { TabStyles } from 'shared-widgets';

// Columns for all cloud providers
// Note: id = array index
// We export a function that returns a column array instead of exporting a static constant.
// The reason is because the array makes references to the localization library, which is
// loaded at run-time.
export function getCloudFileColumns(): Column[] {
  return [
    {
      id: 0,
      title: Messages.name(),
      width: 'auto',
      hasBorder: false,
      getIconFromRow: (row) => row.cloudItem.icon,
      getCellFromRow: (row) => row.cloudItem.name
    },
    {
      id: 1,
      title: Messages.kind(),
      width: `${TabStyles && TabStyles.Sizing && (TabStyles.Sizing.BaseUnit || 6) * 36}px`,
      hasBorder: true,
      getIconFromRow: (row) => EmptyIcon,
      getCellFromRow: (row) => row.cloudItem.displayKind
    },
    {
      id: 2,
      title: Messages.lastModifiedOn(),
      width: `${TabStyles && TabStyles.Sizing && (TabStyles.Sizing.BaseUnit || 6) * 31}px`,
      hasBorder: false,
      getIconFromRow: (row) => EmptyIcon,
      getCellFromRow: (row) => Formatters.formatMediumDate(row.cloudItem.modifiedAt)
    }
  ];
}
