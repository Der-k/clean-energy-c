@echo off
REM Forces git to drop stale uppercase-tracked filenames and re-track the
REM current lowercase files (with their current, re-encoded content).
REM Run this from your repo root: clean-energy-conference\

cd public\images

git rm --cached "conference-registration-desk-welcome.JPG"
git add "conference-registration-desk-welcome.jpg"

git rm --cached "conference-speaker-audience-qa-session.JPG"
git add "conference-speaker-audience-qa-session.jpg"

git rm --cached "delegates-registration-desk-check-in.JPG"
git add "delegates-registration-desk-check-in.jpg"

git rm --cached "energy-conference-delegates-networking.JPG"
git add "energy-conference-delegates-networking.jpg"

git rm --cached "energy-conference-hall-main-venue.JPG"
git add "energy-conference-hall-main-venue.jpg"

git rm --cached "energy-conference-highlight-moment.JPG"
git add "energy-conference-highlight-moment.jpg"

git rm --cached "energy-conference-panel-session-speakers.JPG"
git add "energy-conference-panel-session-speakers.jpg"

git rm --cached "energy-conference-welcome-intro.JPG"
git add "energy-conference-welcome-intro.jpg"

git rm --cached "energy-summit-closing-ceremony.JPG"
git add "energy-summit-closing-ceremony.jpg"

git rm --cached "keynote-speaker-presentation-energy-summit.JPG"
git add "keynote-speaker-presentation-energy-summit.jpg"

cd ..\..

echo.
echo Done. Review with: git status
echo Then commit with:
echo   git commit -m "fix: correct tracked filename casing to match lowercase .jpg"
echo   git push
