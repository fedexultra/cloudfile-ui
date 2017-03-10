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
git clone https://gitlab.tableausoftware.com/cloud-connect/gitlab-ci; cd gitlab-ci
```
2. Install python3, make a virtual environment, and install modules if necessary. If virtualenv gives you trouble, you can install pip3 modules system-wide (but at your own risk):
```
virtualenv -p python3 gitlab-ci-venv; source gitlab-ci-venv/bin/activate; pip3 install -r requirements.txt
```
3. Using the appropriate arguments, run the deploy script:
```
./deploy_scripts/deploy_to_s3.py
```

## Contributing guidelines
A [document on sharepoint](https://tableau.sharepoint.com/sites/Development/Online/_layouts/15/WopiFrame.aspx?sourcedoc=%7BB564AB5B-32B0-4F4D-9774-6387EAE24E1B%7D&file=Cloud-Connect%20git%20CI-CD%20workflows.docx&action=default) outlines the details of how we plan to work together and the workflows used in this framework. For the simplest case of adding a feature:
1. Clone the project to your workstation.
```
git clone https://gitlab.tableausoftware.com/cloud-connect/cloudfile-ui
```
2. Checkout the `dev` branch and pull the latest changes:
```
git checkout dev; git pull
```
3. Create a feature branch for your work as formatted `feature/<TFS_ID>-<feature_name>` like so:
```
git checkout -b feature/123456-my_awesome_feature
```
4. Hack away! Commit work often as you make progress. Push to the remote branch as often as you feel comfortable.
5. When finished with the work, `git push` and create a [Merge Request](https://gitlab.tableausoftware.com/cloud-connect/cloudfile-ui/merge_requests/new) back to `dev` using the gitlab UI.
6. When feedback is addressed and approval is granted from a reviewer, accept the merge request  back to `dev`.
