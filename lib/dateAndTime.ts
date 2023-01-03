import { format } from "date-fns"

export function makeReadableDate(
	date: Date,
    customFormat: string = 'h:mm dd/MM/yyyy',
): string {
	return format(date, customFormat)
}

export function sortDate(a: Date, b: Date): number {
	return a.valueOf() - b.valueOf()
}
