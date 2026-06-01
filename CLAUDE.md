# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development (watch mode build)
yarn dev

# Production build (clears dist → tsc → vite build)
yarn build

# Run all tests
yarn test

# Run a single test file
yarn test src/WeekDatepicker/utils.spec.ts

# Lint with auto-fix
yarn lint:fix

# Release (patch/minor/major)
yarn release:patch
yarn release:minor
yarn release:major
```

## Architecture

This is a React component library (`@acrool/react-datepicker`) built with Vite + SWC. It exports multiple standalone picker components, all using `dayjs` as the date manipulation engine (peer dependency).

### Entry point and exports

`src/index.ts` is the library entry. All public components and types are re-exported from here. CSS is also imported here (`src/styles.css`), so consumers only need to import the compiled `dist/index.css`.

### Component structure pattern

Each component lives in its own folder with a consistent layout:
```
src/ComponentName/
  ComponentName.tsx   # main component
  types.ts            # component-specific types (extends ICommon from ../typing)
  index.ts            # re-exports default + named types
  utils.ts            # pure date-calculation helpers (unit-testable)
  *.module.scss       # scoped styles
```

### Shared foundations

- **`src/typing.ts`** — shared interfaces (`ICommon`, `IRangeDateValue`, `IRangeDateTimeValue`, `ITimeObj`) and enums used across components
- **`src/el-class-names.ts`** — all BEM class names with prefix `acrool-react-datepicker`. Elements are styled externally via these stable class names.
- **`src/config.ts`** — `weekDay` array (Mon–Sun order: `[1,2,3,4,5,6,0]`) and `month` array used for calendar grid rendering
- **`src/locales.ts`** — built-in i18n for `en-US`, `zh-TW`, `zh-CN`, `ja-JP`. The `useLocale(locale)` hook returns an `i18n(key, {def})` function.
- **`src/hooks/useNow.ts`** — provides a stable `today` `Dayjs` value
- **`src/hooks/useUpdateEffect.ts`** — fires effect only on updates, not on mount
- **`src/hooks.ts`** — shared `useDatepicker` logic and `useLocaleWeekDay` hook (used by `ScrollRangeDatepicker`)

### CSS Modules

Vite is configured with `localsConvention: 'camelCase'` and `generateScopedName: 'acrool-react-datepicker__[name]__[local]'`. Module classes follow this scoped naming. Tests mock all CSS/SCSS imports with `identity-obj-proxy`.

### The Atom pattern

`Datepicker.tsx` exports both `DatepickerAtom` (raw, no root class) and `Datepicker` (wraps Atom and adds the `root` class). `ScrollRangeDatepicker` imports `DatepickerAtom` directly to compose the scrollable calendar.

### ScrollRangeDatepicker

Uses `react-window` (`FixedSizeList`) and `react-virtualized-auto-sizer` to render an infinite scrollable calendar spanning `10 * 12` months. The virtual list renders month panels at a fixed height calculated from `DAY_HEIGHT` and `DAY_GAP` constants.

### Components exported

| Export | Description |
|---|---|
| `Datepicker` | Single date picker |
| `Timepicker` | Scroll-wheel time picker |
| `Timepicker2` | Input-style time picker |
| `DateTimepicker` | Date + Timepicker combined |
| `DateTimepicker2` | Date + Timepicker2 combined |
| `RangeDatepicker` | Two-date range picker |
| `RangeTimeDatepicker` | Range date with time range |
| `ScrollRangeDatepicker` | Infinite-scroll range picker |
| `WeekDatepicker` | Week-unit picker |
| `getWeekRange` | Utility: computes week start from a reference start date |

### Testing

Test files use `.spec.ts` / `.spec.tsx` suffix. Only pure utility logic is unit tested (e.g. `WeekDatepicker/utils.spec.ts`). The transformer is `@swc/jest`; jsdom is the test environment.

### Release

Uses `standard-version` for version bumping and CHANGELOG generation. Commits should follow Conventional Commits (enforced via `commitlint`).
