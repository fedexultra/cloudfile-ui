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

import { getUniqueCellId } from '../src/utils/TestUtilities';

describe('TestUtilities', () => {
  describe('getUniqueCellId function', () => {
    it('should return the unique cell id in the correct format', () => {
      const rowIndex = 2;
      const cellIndex = 3;
      expect(getUniqueCellId(rowIndex, cellIndex)).toBe('r2c3');
    });
  });
});
