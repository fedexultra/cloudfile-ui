# -----------------------------------------------------------------------------
#
# This file is the copyrighted property of Tableau Software and is protected
# by registered patents and other applicable U.S. and international laws and
# regulations.
#
# Unlicensed use of the contents of this file is prohibited. Please refer to
# the NOTICES.txt file for further details.
#
# -----------------------------------------------------------------------------

import os
import shutil
import subprocess

# check if the node_modules folder exists before deleting
if os.path.exists('node_modules'):
    shutil.rmtree('node_modules')

subprocess.check_call('npm install', shell=True)
subprocess.check_call('npm run all', shell=True)