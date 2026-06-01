import dayjs from 'dayjs';

import {getWeeksInMonth} from './utils';

describe('getWeeksInMonth', () => {
    // 月曆以週一為起始日，週數 = 上個月補滿首週的格數 + 當月天數，向上取整

    it('should return 6 weeks when the month spans six rows (Sep 2024 starts on Sunday)', () => {
        // 2024-09-01 為週日，首週需補 6 格 + 30 天 = 36 → 6 週
        expect(getWeeksInMonth(dayjs('2024-09-01'))).toBe(6);
    });

    it('should return 5 weeks for a leap February starting on Thursday (Feb 2024)', () => {
        // 2024-02-01 為週四，補 3 格 + 29 天 = 32 → 5 週
        expect(getWeeksInMonth(dayjs('2024-02-15'))).toBe(5);
    });

    it('should return 5 weeks for a 28-day February starting on Sunday (Feb 2026)', () => {
        // 2026-02-01 為週日，補 6 格 + 28 天 = 34 → 5 週
        expect(getWeeksInMonth(dayjs('2026-02-10'))).toBe(5);
    });

    it('should return 4 weeks for a 28-day February starting on Monday (Feb 2021)', () => {
        // 2021-02-01 為週一，補 0 格 + 28 天 = 28 → 4 週
        expect(getWeeksInMonth(dayjs('2021-02-01'))).toBe(4);
    });

    it('should be independent of the day-of-month passed in', () => {
        expect(getWeeksInMonth(dayjs('2024-09-01')))
            .toBe(getWeeksInMonth(dayjs('2024-09-30')));
    });
});
