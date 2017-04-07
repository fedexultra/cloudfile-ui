# Purpose
This repo is our work for the Cloud File connector UI project.

## Build
Detailed manual build and deploy steps outlined here. In short, run the following from the repo root:
```
python build_deployment.py --clean --build --package
```
## Deploy
1. From this repo's root, clone the gitlab-ci project:
```
rm -rf gitlab-ci; git clone https://gitlab.tableausoftware.com/cloud-connect/gitlab-ci.git; cd gitlab-ci
```
2. Install python3, pip3, and virtualenv if you don't already have these tools. Make a virtual environment, and install modules if necessary. If virtualenv gives you trouble, you can install pip3 modules system-wide (but at your own risk):
```
virtualenv -p python3 gitlab-ci-venv; source gitlab-ci-venv/bin/activate; pip3 install -r requirements.txt
```
3. Using the appropriate arguments, run the deploy script. Sane defaults are provided and use `--help` if needed to determine args:
```
./deploy_scripts/deploy_to_s3.py --dry_run
```
4. Deactivate your virtualenv with `deactivate`

## Contributing guidelines
A [document on sharepoint](https://tableau.sharepoint.com/sites/Development/Online/_layouts/15/WopiFrame.aspx?sourcedoc=%7BB564AB5B-32B0-4F4D-9774-6387EAE24E1B%7D&file=Cloud-Connect%20git%20CI-CD%20workflows.docx&action=default) outlines the details of how we plan to work together and the workflows used in this framework. For the simplest case of adding a feature:
1. Configure git to use Unix line endings
```
git config --global core.autocrlf false; git config --global core.eol lf
```
2. Clone the project to your workstation.
```
git clone https://gitlab.tableausoftware.com/cloud-connect/cloudfile-ui
```
3. Checkout the `dev` branch and pull the latest changes:
```
git checkout dev; git pull
```
4. Create a feature branch for your work as formatted `feature/<TFS_ID>-<feature_name>` like so:
```
git checkout -b feature/123456-my_awesome_feature
```
5. Hack away! Commit work often as you make progress. Push to the remote branch as often as you feel comfortable.
6. When finished with the work, `git push` and create a [Merge Request](https://gitlab.tableausoftware.com/cloud-connect/cloudfile-ui/merge_requests/new) back to `dev` using the gitlab UI.
7. When feedback is addressed and approval is granted from a reviewer, accept the merge request  back to `dev`.

Note: Try to use lower caps in the branch name while creating it.
If you create your branch using capitalized letters, sometimes 'git' internally converts some letters to lower caps.
If you try to 'push' your changes using original branch name (with capitalized letters), git might throw an error.

