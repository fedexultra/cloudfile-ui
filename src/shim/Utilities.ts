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

const SHIM_V1: string = '10.1.2';
const SHIM_DEV: string = '0.0.0';

class VersionNumber {
  private major: number;
  private minor: number;
  private fix: number;

  public constructor(version: string) {
    const components: string[] = version.split('.');
    if (components.length < 3) {
      throw new Error('Invalid number of components. version was "' + version + '"');
    }

    this.major = parseInt(components[0], 10);
    this.minor = parseInt(components[1], 10);
    this.fix = parseInt(components[2], 10);
  }

  public valueOf(): number {
    // "10.1.1" -> 10101
    return this.major * 1000 + this.minor * 100 + this.fix;
  }
}

// This function maps each version of Tableau to the version of the shim
// that must be used to communicate with it.
// $TODO - Make the bridge declare a version and directly use that
// to instantiate the shim. That makes maintenance cleaner and allows
// for debugging older versions of the bridge, since dev builds always
// declare the Tableau version as 0.0.0.
export function shimVersion(tabVersion: string): number {
  const tabVersionNumber: VersionNumber = new VersionNumber(tabVersion);

  // $TODO - Why doesn't implicitly calling the valueOf method overload work?
  if (tabVersionNumber.valueOf() >= new VersionNumber(SHIM_V1).valueOf()) {
    return 1;
  } else if (tabVersionNumber.valueOf() === new VersionNumber(SHIM_DEV).valueOf()) {
    // Use the most recent version of the shim
    return 1;
  } else {
    throw new Error('Invalid Tableau version. Version should be at least ' + SHIM_V1);
  }
}
