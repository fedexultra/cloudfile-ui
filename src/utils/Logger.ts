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
  private static logPrefix: string = 'CloudFile UI:';
  public static trace(message: string): void {
    shim.log({message: `${this.logPrefix} ${message}`}, Severity.Trace);
  }

  public static debug(message: string): void {
    shim.log({message: `${this.logPrefix} ${message}`}, Severity.Debug);
  }

  public static info(message: string): void {
    shim.log({message: `${this.logPrefix} ${message}`}, Severity.Info);
  }

  public static warn(message: string): void {
    shim.log({message: `${this.logPrefix} ${message}`}, Severity.Warn);
  }

  public static error(message: string): void {
    shim.log({message: `${this.logPrefix} ${message}`}, Severity.Error);
  }

  public static fatal(message: string): void {
    shim.log({message: `${this.logPrefix} ${message}`}, Severity.Fatal);
  }

  public static off(message: string): void {
    shim.log({message: `${this.logPrefix} ${message}`}, Severity.Off);
  }

  public static LogDetail(message: string): void {
    shim.log({message: `${this.logPrefix} ${message}`}, Severity.LogDetail);
  }

  public static consoleLog(message: string): void {
    // We need this for shim debug
    /* tslint:disable-next-line:no-console */
    console.log(message);
  }
}

export { Logger };
