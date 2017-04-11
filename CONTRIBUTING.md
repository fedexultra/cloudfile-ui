# Purpose
This doc outlines common ways to work with this project and the practices we're agreeing to use.

## Initial configuration
If this is your first time working with this project or git, configure your git client to use Unix line endings:
```
$ git config --global core.autocrlf false; git config --global core.eol lf
```

## Add a feature
1. Clone the project to your workstation.
```
$ git clone https://gitlab.tableausoftware.com/cloud-connect/cloudfile-ui
```

2. Checkout the `dev` branch and pull the latest changes:
```
$ git checkout dev; git pull
```

3. Create a feature branch for your work as formatted `feature/<TFS_ID>-<feature_name>` like so:
```
$ git checkout -b feature/123456-my_awesome_feature
```

5. Hack away! Commit work often as you make progress and push as often as you want it backed up or able for teammates to review.
6. It's recommended that your work be condensed into a single commit before submitting a merge request. If you're the only one working on this branch, this is mostly straightforward. We do this through `git rebase`:
```
# Show the most recent commits in chronological order - count the number since you started the branch:
$ git log
# The following opens an interactive rebase session for the 4 topmost commits listed in the git log.
$ git rebase -i HEAD~4
# Within this rebase session, change all lines except the first from 'pick' to 's'. Once saved, a second dialog will follow allowing you to alter commit messages. Keep the first message and alter its contents to reflect the overall change.
```

7. Once all feature work has been pushed, create a [Merge Request](https://gitlab.tableausoftware.com/cloud-connect/cloudfile-ui/merge_requests/new) back to `dev` using the gitlab UI.
8. When feedback is addressed and approval is granted from a reviewer, accept the merge request  back to `dev`.
9. When the team wants to release, `dev` should be merged to `beta`, and `beta` to `prod-vn`. This can all be driven from the gitlab UI.

## Best practices
1. Feature branches should always be created from the dev branch, using lowercase alphanumeric characters (plus dash '-' and underscore '_').
2. Feature branches should be named as feature/<TFS_ID>-<feature_title>. In practice, we will hit counterexamples. Use best judgement.
3. The feature branch owner (typically the creator) is responsible for creating merge/pull requests to the dev branch AND executing the merge.
4. All merge/pull requests should be reviewed and approved by at least one code reviewer.
5. Code reviews should be done within a business day if at all possible. Strive to make them small, incremental, and digestible. Adhere to familiar reviewboard practices in comments.
6. Tests are critically important in an automated delivery system and should be included whenever new functionality is added.
7. On point personnel is responsible for any merges in the prod and beta space. This includes hotfixes and the more typical workflow from dev to beta to prod.
8. All team members are able to release to any environment.
9. All beta and prod releases should have a version tag given within gitlab/github.
10. Our projects should conform to [semantic versioning 2.0](http://semver.org/spec/v2.0.0.html).
11. An updated change log file should accompany each release to beta and production. Change log style is guided by the [Keep a CHANGELOG](http://keepachangelog.com/en/0.3.0/) project.
12. Feature branches should be deleted by the feature branch owner when work is complete. There is a checkbox for this in a gitlab merge request page.
13. Commits should ideally be squashed for a merge request and written using conventions on [this style guide](https://chris.beams.io/posts/git-commit/).
