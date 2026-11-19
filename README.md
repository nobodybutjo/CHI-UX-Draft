# CHI Digital Experience — draft v1

# CHI Together prototype

A mobile-only, grayscale conference companion with a Luma-inspired visual treatment and familiar platform controls. Built with HTML, CSS and JavaScript; no build step or dependencies.

Layout source: [CHI-Design / Web Wireframe](https://www.figma.com/design/hL5J2c5DcB9a8aIP9ABCKd/CHI-Design?node-id=87-292). The source page is 87:292, distinct from the older page 61:747 now named “not”.

The flow follows pre-registration → role → name → interests and intentions → badge → home. `wireframe.css` restores the source composition: stacked identity cards, centered questions with bottom actions, two badge panels, horizontal home carousel, a separate menu, and the additional map entry during the conference. The three map states are illustrative activities, interest groups and a selected gathering. `luma.css` supplies a grayscale, Luma-inspired visual treatment. Artwork is original; this is not an official Luma component library.

## Mobile design revision

The prototype stays 402 CSS pixels wide in larger windows and centers with gray gutters. Below 402px it fits the available screen width. Page layouts no longer switch to desktop columns. `mobile.css` contains these layout and gray palette overrides.

The welcome masthead uses the official CHI 2027 SVG with a grayscale display treatment. Its floating event cards reference the supplied Luma welcome screenshots; the animation is implemented locally in CSS and respects reduced-motion preferences. Mobbin supplied static screen references, not animation timing data.

Interest selection uses the twelve categories from **Identity Design**, across three separate steps: one required Domain interest, up to two optional Secondary interests (excluding the primary domain), and up to two optional Outside research interests. The assets in `assets/identity` come from the project’s original artwork. Existing stored selections are migrated to a single valid category without clearing the rest of the profile. Name and Bio are saved locally. The profile confirmation control continues the original flow; the original visibility and conversation preferences remain on My badge. An optional profile photo stays in this browser.

## Run

```sh
npm run dev
```

Open http://127.0.0.1:5173. Run `npm run check` for JavaScript syntax checks.

## Explore

Start with pre-registration, choose a role and interests, then create a personal badge. Explore activities, save a personal plan, switch map views, and create a sample gathering. Navigation uses a menu button at the top right (For you, Activities, Map, Plan, Badge, plus Create event), as in the original design.

Profile, saved activities and created gatherings persist in this browser's local storage. Use **My badge → Start the prototype again** to reset them.

This is an independent interaction prototype. There is no real authentication, registration, booking, event publishing, participant tracking or backend. Activity data and the schematic map are illustrative, not an official CHI program or venue map. Interest categories come from the team’s Identity Design page and are not represented as official CHI classifications.

## Verification

Checked onboarding through badge and home, saving and persistence after refresh, map display, activity preview and local creation, and the created activity's detail page in the browser. Checked the revised onboarding, menu, conference stage switch, all three map states, search, saving and activity creation. Verified nine revised views at 375px and 1280px for horizontal overflow and missing images; no browser script errors were reported. Visual checks also used the source mobile size of 402 × 874. Reference screenshots are in `previews/wireframe-mobile-home.jpg` and `previews/wireframe-desktop.jpg`.

Latest checks: twelve category options, single-selection replacement, Name/Bio persistence and profile completion, original-artwork badge download, a 402px layout in both 1280px and 496px windows, and 375px narrow-screen fitting. Browser error log was empty.

## Home PlanC, tickets and calendars

The homepage follows Web Wireframe **Home PlanC (87:334)**: one ranked recommendation, a map entrance, a vertical “More for you” list, popular activities, domain browsing and an example paper session. Domain matches carry more recommendation weight than optional personal interests. Featured and small cards open their own detail page directly.

Community events show free or paid sample ticket prices. Registering goes through ticket selection, review and a locally stored demo registration. Paid checkout is explicitly simulated. Created activities may set a price of zero for free admission or a positive ticket price. Registration adds the item to the personal plan; saving alone does not register. Demo registrations and their demo wallet records can be cancelled independently from the plan.

The calendar chooser offers Apple, Google and other calendar apps, plus optional alerts. Apple/other exports generate actual `.ics` files. Google opens an unsaved draft, where the destination calendar and alerts must be confirmed; the selected reminder is also available via the `.ics` export. The app never claims that generating a file or link has written an event to an account. May 2027 Pittsburgh times are converted from EDT to UTC. The paper-session example has a Calendar action and no ticket registration or Wallet control.

Wallet is a prototype pass preview stored locally, not a signed device pass. No payment processor, native Wallet integration or calendar account access is configured. Native Apple Wallet distribution requires a signed pass: https://developer.apple.com/wallet/get-started/. Google Calendar reminder behavior: https://developers.google.com/workspace/calendar/api/concepts/reminders.

Validation: free registration, paid tier selection and simulated checkout, ticket viewing, demo Wallet state, Google draft generation, actual ICS download with a 30-minute VALARM, paper-only Calendar behavior, optional-interest limit, share preview, registration persistence and cancellation. `npm test` checks UTC conversion, reminder output, text escaping, Unicode line folding and Google draft parameters.

## Crowd map

The map starts with eight fictional domain groups and 65 example people. Grayscale density halos, counts and original identity glyphs distinguish groups. Pinch, wheel, zoom buttons and group selection reveal individual people; drag pans the map. Selecting a person opens a compact card and a detailed fictional profile. Bottom-left filters control people, activities, research domain and shared interests. Locations are schematic, with no live location collection. Map anchor/pinch math, pan bounds, data counts and filters are covered by automated tests.

## draft v1

Snapshot dated 2026-11-16. Includes split domain/secondary/outside-research onboarding, Home PlanC, colored crowd-map dots and participant details, event creation, demo tickets, calendar export and the optional CHI recommendation approval request. The recommendation request is a local prototype state, not a submission to CHI.

Update 2026-11-17: Free community events require registration; free ticket confirmation has no payment step.

## Interaction model (v2)

- **One scroll direction.** Every page scrolls vertically. The only horizontal scroller is the one-line filter chip bar on Activities (sticky, with an edge fade).
- **Tapping never re-plays the page.** Selecting interests, filtering and bookmarking update in place; the page fade-in runs on navigation only.
- **Back means back.** The back button returns to the previous screen and restores its scroll position; from a shared link it falls back to Home. After publishing an event, back skips the create form.
- **One list row** is used on Home, Activities and the programme: topic, title, time, place, price, bookmark.
- **Event detail** keeps the main action (Register / My Ticket / Add to Calendar) fixed at the bottom.
- Layout and type tweaks live in `refine.css`, loaded last.

Run on another port if 5173 is taken: `PORT=5174 npm run dev` (PowerShell: `$env:PORT=5174; npm run dev`).
