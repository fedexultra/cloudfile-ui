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

from argparse import ArgumentParser
import os
import shutil
import subprocess
import sys

# Create the argument parser and list of valid arguments
def setup_parser():
    """
    Set up the parser object and the valid arguments. Returns args for later usage.
    """
    parser = ArgumentParser(description="build and package the Cloud File UI")
    parser.add_argument("-c",
                        "--clean",
                        action="store_true",
                        help="delete the node_modules folder")
    parser.add_argument("-b",
                        "--build",
                        action="store_true",
                        help="build the files for deployment")
    parser.add_argument("-p",
                        "--package",
                        action="store_true",
                        help="package the necessary files for deployment")
    parser.add_argument("-t",
                        "--test",
                        action="store_true",
                        help="test the build")
    return parser.parse_args()


def del_dir(dir_name):
    if os.path.exists(dir_name):
        print("Found {}".format(dir_name))
        print("Deleting...")
        shutil.rmtree(dir_name)
        print("Delete has completed successfully!")
    else:
        print("{} was not found. Continuing.".format(dir_name))


def clean():
    """
    Cleans the node_modules folder
    """
    del_dir('node_modules')


def build():
    """
    Build the UI
    """
    if subprocess.check_call('npm install', shell=True) == 0:
        print("Building has completed successfully!")
    else:
        print("Errors detected during building.")
        sys.exit(1)


def test():
    """
    Test the UI
    """
    if subprocess.check_call('npm run all', shell=True) == 0:
        print("Testing has completed successfully")
    else:
        print("Errors detected during testing")
        sys.exit(1)


def package():
    """
    Grab the index.html, css, loc, imgs, and min.js files and put them into folder for easy deployment
    """
    del_dir('deployment_files')

    # Check if the files we want to grab exist
    if validate_files():
        try:
            print("Creating deployment_files directory")
            os.mkdir('deployment_files')

            print("Copying over index.html")
            shutil.copy2('index.html', 'deployment_files/index.html')

            print("Copying over styles.css")
            shutil.copy2('styles.css', 'deployment_files/styles.css')

            print("Copying over contents of src/img")
            shutil.copytree('src/img', 'deployment_files/src/img')

            print("Copying over compiled-locales")
            shutil.copytree('dist/compiled-locales', 'deployment_files/dist/compiled-locales')

            print("Copying over the min.js file")
            shutil.copy2('dist/cloud-file-connector.min.js', 'deployment_files/dist/')

            print("Copying over the New Relic Monitoring min.js file")
            shutil.copy2('new-relic-monitoring.min.js', 'deploymentfiles/new-relic-monitoring.min.js')

            print("Packaging has been successful")

        except:
            print("Unexpected error: rolling back.")
            shutil.rmtree('deployment_files')
    else:
        print("Files for deployment don't exist. Please build first.")


def validate_files():
    """
    Iterate through a list of expected files and paths and determine if they exist.
    For the paths to directories, we don't check if individual files exist since that would be very tedious to maintain.
    Word of warning: this might give a false positive if there are file paths that we should have but are not in list_of_file_paths.
    Another false positive scenario is if there are files missing in the paths that lead to directories since we don't check the contents.
    """
    list_of_file_paths = ["index.html", "styles.css", "src/img", "dist/compiled-locales", "dist/cloud-file-connector.min.js", "new-relic-monitoring.min.js"]
    for paths in list_of_file_paths:
        if not os.path.exists(paths):
            return False
    return True


if __name__ == "__main__":
    args = setup_parser()
    if args.clean:
        clean()
    if args.build:
        build()
    if args.test:
        test()
    if args.package:
        package()
