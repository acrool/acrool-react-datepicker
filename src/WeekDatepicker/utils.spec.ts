import {getWeekRange} from './utils';
import dayjs from 'dayjs';

describe('getWeekRange', () => {
    it('should return the start of the week for the current date based on the start date', () => {
        const startDate = dayjs('2024-01-01'); // 這是週一
        const currentDate = dayjs('2024-01-03'); // 這是週三
        const weekStart = getWeekRange(startDate, currentDate);

        // 預期週開始日應該是2024-01-01
        expect(weekStart.format('YYYY-MM-DD')).toBe('2024-01-01');
    });

    it('should return the start of the week for the second week', () => {
        const startDate = dayjs('2024-01-01'); // 這是週一
        const currentDate = dayjs('2024-01-09'); // 這是下一週的週二
        const weekStart = getWeekRange(startDate, currentDate);

        // 預期週開始日應該是2024-01-08
        expect(weekStart.format('YYYY-MM-DD')).toBe('2024-01-08');
    });

    it('should handle when currentDate is exactly the same as the startDate', () => {
        const startDate = dayjs('2024-01-01');
        const currentDate = dayjs('2024-01-01');
        const weekStart = getWeekRange(startDate, currentDate);

        // 預期週開始日應該是2024-01-01
        expect(weekStart.format('YYYY-MM-DD')).toBe('2024-01-01');
    });

    it('should handle when currentDate is in the middle of the week', () => {
        const startDate = dayjs('2024-01-01');
        const currentDate = dayjs('2024-01-05'); // 這是週五
        const weekStart = getWeekRange(startDate, currentDate);

        // 預期週開始日應該是2024-01-01
        expect(weekStart.format('YYYY-MM-DD')).toBe('2024-01-01');
    });

    it('should correctly calculate weeks when startDate is not a Monday', () => {
        const startDate = dayjs('2024-01-02'); // 這是週二
        const currentDate = dayjs('2024-01-10'); // 下一週的週三
        const weekStart = getWeekRange(startDate, currentDate);

        // 預期週開始日應該是2024-01-09
        expect(weekStart.format('YYYY-MM-DD')).toBe('2024-01-09');
    });

    it('should return the start of the previous week when currentDate is before the startDate', () => {
        const startDate = dayjs('2024-01-01'); // 這是週一
        const currentDate = dayjs('2023-12-28'); // 上週的週四
        const weekStart = getWeekRange(startDate, currentDate);

        // 預期週開始日應該是2023-12-25（上週的週一）
        expect(weekStart.format('YYYY-MM-DD')).toBe('2023-12-25');
    });
});
