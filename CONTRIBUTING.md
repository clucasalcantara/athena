# Athena Contributing Guide line

## Git Rules

### Main branches

- `stable`:

  origin: `master`

  what: This branch runs stable code and is directly related to production. Every push in this branch sends this code version to production;

### Branches names

`$branchType/$branch-description`

#### Language

Everything is written in English.

#### \$branchType

- `fix`: fixes a bug;
- `feat`: adds a new feature;
- `refactor`: refactors/improves an existing feature;
- `chore`: config changes, tools/libraries updates, builds adjustments and so forth;
- `docs`: documentation updates, no production code updated.

#### \$branch-description

A short trace separated message describing what is being developed.

#### Good examples of branches names

- `feat/user-preferences`
- `refactor/product-creation`
- `fix/organization-update`
- `chore/remote-signer-secrets`

#### Bad examples of branches names

- `feat/user-preferences-fields-with-validations`: too long, specifications should be in commits
- `refactor/product`: too short and doesn't say anything about what is being refactored
- `fix/add-new-user`: it's ambiguous, we should take care to do not looks like the type is not related to its action
- `feat-user-preferences`: out of convention, the `feat` type and `user-preferences` description should be separated with slash `/`.

### Commit messages

    $action($scope): $commitTitle

    $commitBody

#### \$action

Action type made in the commit in context:

- `fix`: bugs fixes;
- `hotfix`: critical bug fixes passive to be sent to main branches (see Main Branches section) without a Pull Request;
- `refactor`: refactoring or improving existing features;
- `chore`: Config changes, tools/libraries updates, builds adjustments and so forth;
- `test`: Add missing tests or refactoring tests; no production code change;
- `docs`: changes or increments to the documentation;
- `style`: formatting, missing semi colons, etc; no production code changed;
- `feat`: when it adds a new feature or belongs specifically to a feature development and it's not related to any fix, hotfix, refactor or chore in the application.

#### \$scope

The scope you're working on. Good examples of scope are:

- user
- database
- config
- proxy
- server-init

#### \$commitTitle

The first line cannot be longer than 70 characters, the second line is always blank and other lines should be wrapped at 80 characters. The type and scope should always be lowercase as shown below.

#### \$commitBody

- uses the imperative, present tense: "change" not "changed" nor "changes"
- includes motivation for the change and contrasts with previous behavior

### Creating a Pull Request

#### Pull Request Title

First thing in a Pull Request title is its prefix.

`[$ACTION] $message`

##### \$ACTION

The possible actions are:

- `FIX`
- `HOTFIX`
- `FEAT`
- `REFACTOR`
- `DOCS`
- `CHORE`

##### \$message

A simple message of this Pull Request as its title. It must be concise and short.

##### Example

[FIX] Organization Resources loading

#### Pull Request body

It's the release note of this Pull Request. It must be detailed but not lengthened. If you can make it short then do it. Just think it's a message that everyone must understand, from programmers to non-programmers.

The last line of the Pull Request body you place a footer information for relating to the issues it's related and can be closed, like:

```
Closes #234
```

In case of multiple issues:

```
Closes #453, #567
```

### Git flow in a row

Create your branch → Commit → open a Pull Request to `stable` branch → deliver

### Merging

Use `rebase`. Don't use `merge`.

> The git rebase command has a reputation for being magical Git voodoo that beginners should stay away from, but it can actually make life much easier for a development team when used with care.

- Atlassian

We use `rebase` flow, never use `merge` to do not create _merge commits_ and create bubles in the main _tree_.

#### Why not merge?

Merge is great mainly because of traceability but also for making conciliation between your code and upstream code, but its basis for avoiding some conflicts in pieces of complex files diffs are based in that change timestamp. The fourth dimension is great, Einstein proved it farewell, but something being coded earlier doesn't mean it's right.

#### Rebase for the win

Rebase does a recursive verification for every commit you've made with a upstream not tracked in your tree commit and stops you for every conflict it finds. It gives you a little headache rebasing after a while but in this scenario you should do constant rebases and making sure you have up to date code with your changes.

## References (or copy/paste)

[https://karma-runner.github.io/1.0/dev/git-commit-msg.html](https://karma-runner.github.io/1.0/dev/git-commit-msg.html)

[https://gist.github.com/joshbuchea/6f47e86d2510bce28f8e7f42ae84c716](https://gist.github.com/joshbuchea/6f47e86d2510bce28f8e7f42ae84c716)

[https://www.conventionalcommits.org/en/v1.0.0-beta.3/](https://www.conventionalcommits.org/en/v1.0.0-beta.3/)

[https://medium.com/@roalcantara/a-guide-to-improve-the-git-hub-flow-and-commits-messages-b495461e1115](https://medium.com/@roalcantara/a-guide-to-improve-the-git-hub-flow-and-commits-messages-b495461e1115)

[https://www.atlassian.com/git/tutorials/merging-vs-rebasing](https://www.atlassian.com/git/tutorials/merging-vs-rebasing)

[https://www.atlassian.com/git/articles/git-team-workflows-merge-or-rebase](https://www.atlassian.com/git/articles/git-team-workflows-merge-or-rebase)
