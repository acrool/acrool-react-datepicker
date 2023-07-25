export type IRangeDateValue = {startDate?: string, endDate?: string}

export enum EDateRange {
    today = 'today',
    tomorrow = 'tomorrow',
    twoDay = 'twoDay',
    thisWeek = 'thisWeek',
    nextWeek = 'nextWeek',
}
