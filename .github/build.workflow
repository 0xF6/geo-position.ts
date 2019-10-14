workflow "build and test" {
  on = "push"
  resolves = [
    "test",
    "build",
  ]
}

action "build" {
  uses = "actions/npm@master"
  args = "ci"
}

action "test" {
  needs = "build"
  uses = "actions/npm@master"
  args = "t"
}
