export function randomOnce(list: any[]): any {
	return list[Math.floor(Math.random() * list.length)];
}

export function randomArray(list: any[], count?: number) {
	count = count || list.length;
	return list.sort(() => Math.random() - 0.5).slice(0, count);
}
