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

import { CSSProperties } from 'react';

const SpinnerStyle: CSSProperties = {
  content: '',
  position: 'absolute',
  width: '100%',
  top: 0,
  left: 0,
  height: '100%',
  backgroundImage: 'url(./src/img/progress-spinner-dark.gif)',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center'
};

export { SpinnerStyle };
