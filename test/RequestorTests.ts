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

import { Requestor } from '../src/requestors/Requestor';

describe('Requestor', () => {

  describe('search url regex', () => {

    it('should match against a URL with a http protocol and host name', () => {
      const url = 'http://www.random.com';
      expect(Requestor.searchUrlRegex.test(url)).toBe(true);
    });

    it('should match against a URL with a https protocol and host name', () => {
      const url = 'https://www.random.com';
      expect(Requestor.searchUrlRegex.test(url)).toBe(true);
    });

    it('should match against a URL with a host name but no protocol', () => {
      const url = 'www.random.com';
      expect(Requestor.searchUrlRegex.test(url)).toBe(true);
    });

    it('should not match against a random string', () => {
      const url = 'random string';
      expect(Requestor.searchUrlRegex.test(url)).toBe(false);
    });

  });

});
