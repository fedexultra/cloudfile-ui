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

import { Severity } from '../types/ShimTypes';
import { shim } from '../shim/Shim';

class Logger {

  // This is used to identify which log messages are from our Cloud file ui
  private static logPrefix: string = 'CloudFile UI';

  private static constructMessage(location: string, message: string): string {
    return `${this.logPrefix} | ${location} | ${message}`;
  }

  public static trace(location: string, message: string): void {
    shim.log({message: this.constructMessage(location, message)}, Severity.Trace);
  }

  public static debug(location: string, message: string): void {
    shim.log({message: this.constructMessage(location, message)}, Severity.Debug);
  }

  public static info(location: string, message: string): void {
    shim.log({message: this.constructMessage(location, message)}, Severity.Info);
  }

  public static warn(location: string, message: string): void {
    shim.log({message: this.constructMessage(location, message)}, Severity.Warn);
  }

  public static error(location: string, message: string): void {
    shim.log({message: this.constructMessage(location, message)}, Severity.Error);
  }

  public static fatal(location: string, message: string): void {
    shim.log({message: this.constructMessage(location, message)}, Severity.Fatal);
  }

  public static off(location: string, message: string): void {
    shim.log({message: this.constructMessage(location, message)}, Severity.Off);
  }

  public static LogDetail(location: string, message: string): void {
    shim.log({message: this.constructMessage(location, message)}, Severity.LogDetail);
  }

  public static consoleLog(message: string): void {
    // We need this for shim debug
    /* tslint:disable-next-line:no-console */
    console.log(message);
  }
}

export { Logger };
