# Validation notes

The representation was retained throughout. These were implementation and harness corrections, not a failed alternative explanation.

1. Initial screenshot: controls sat below a tall board; the scrubber was moved above it. A resource subtitle was shortened to stay within its tile.
2. First broad browser run: the return anchor let its default navigation override explicit focus. The handler now owns scrolling, URL update and focus together.
3. Cutover screenshot: the external-test label crossed the worker-entry tile; the label and pin moved to the package edge. A static CLI subtitle was also changed to reflect the selected revision.
4. Second browser run: a generic `[data-stage]` test selector also matched the SVG's metadata. Both the control update and browser selector now address buttons specifically.
5. Rapid receipt use exposed a late `close` event restoring focus after the next cell had already been selected. Native dialog restoration now handles focus; the browser harness waits for the dialog to be hidden before continuing.
6. The final pyramid audit found that counting the ten removed scenarios did not name their individual subjects. All ten subjects now appear in the open root strip; the source layer only expands their wording and code.

The final reports distinguish checks of this artifact from checks of symnav itself. No behavioral correctness or test-replacement verdict is produced.
