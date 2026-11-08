# hospital-manager-tycoon

> Cyclic roster for a team of nurse anaesthetists. A 1 to 12 week
> cycle, one line per person, every rule the head nurse gave, and
> everyone at exactly their due hours.

![Status](https://img.shields.io/badge/status-stopped-red) ![Repo](https://img.shields.io/badge/repo-private-lightgrey)

## The thing

A head nurse I know had to produce a yearly roster for 20 people:
18 nurse anaesthetists, 2 nurses, full-timers and 80 % contracts.
Weekend blocks, nights followed by two rest days, 44 h max over any
7 days, 12 h between two shifts, two rest days a week, and a 37.5 h
average over the cycle.

The solver is CP-SAT (OR-Tools), in three phases: weekends, then
exact hours, then the rest. The front draws the best roster found
while it computes, with a stop button. PDF export, versions, a
15-day forecast repaired with the fewest changes.

Three days of work, 4 to 6 November 2026.

![The 12-week roster, one row per person](/portfolio/dev/lab/hospital-manager-tycoon/roster.webp)

## How I worked

The code is written by Claude Code, driven by me. I did the research and the state of the art.
A checker independent of the solver re-runs every rule on
every solution, and an audit writes, for each rule, the tightest
case as a calculation you can redo by hand. Tests with
[apte](https://github.com/renaudcepre/apte), 100 % coverage on the pure
modules, ty in strict mode.

![The audit, rule by rule](/portfolio/dev/lab/hospital-manager-tycoon/audit.webp)

## What the solver settled

The team was going to vote between "one night then two rest days"
and "two nights then two rest days", because the first option
supposedly made the hours impossible. Computed: both work, with zero
gap to due hours for all 20 people.

A canon (each line is the one above shifted by a week) comes out in
one second. It is only fair between full-timers and 80 % contracts
if weekend nights are doubled, 36 h of doubling a week.

## Status

Management made its own 9-week canon by hand, without looking at the
PDFs. The app was never used. Private repo, because the docs hold
the rules and quotes of a real team.
