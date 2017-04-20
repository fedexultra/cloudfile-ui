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

  public static trace(message: string): void {
    shim.log({message: `${message}`}, Severity.Trace);
  }

  public static debug(message: string): void {
    shim.log({message: `${message}`}, Severity.Debug);
  }

  public static info(message: string): void {
    shim.log({message: `${message}`}, Severity.Info);
  }

  public static warn(message: string): void {
    shim.log({message: `${message}`}, Severity.Warn);
  }

  public static error(message: string): void {
    shim.log({message: `${message}`}, Severity.Error);
  }

  public static fatal(message: string): void {
    shim.log({message: `${message}`}, Severity.Fatal);
  }

  public static off(message: string): void {
    shim.log({message: `${message}`}, Severity.Off);
  }

  public static LogDetail(message: string): void {
    shim.log({message: `${message}`}, Severity.LogDetail);
  }

  public static consoleLog(message: string): void {
    // We need this for shim debug
    /* tslint:disable-next-line:no-console */
    console.log(message);
  }
}

export { Logger };
