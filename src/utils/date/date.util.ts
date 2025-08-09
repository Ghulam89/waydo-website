import dayjs from "dayjs"
import { RangeDateNotDinamycI } from "./date.interface"

const today = dayjs()

export const RangeDate = () => ({
    today: {
        from: today.startOf('day').toString(),
        to: today.endOf('day').toString()
    },
    three_days_ago: {
        from: today.subtract(3, 'day').startOf('day').toString(),
        to: today.subtract(3, 'day').endOf('day').toString()
    },
    one_week_ago: {
        from: today.subtract(1, 'week').startOf('week').toString(),
        to: today.subtract(1, 'week').endOf('week').toString()
    },
    two_weeks_ago: {
        from: today.subtract(2, 'week').startOf('week').toString(),
        to: today.subtract(2, 'week').endOf('week').toString()
    },
    one_month_ago: {
        from: today.subtract(1, 'month').startOf('month').toString(),
        to: today.subtract(1, 'month').endOf('month').toString()
    }
})

export const RangeDateNotDinamyc: RangeDateNotDinamycI = () => {
    return RangeDate()
}