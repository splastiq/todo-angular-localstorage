import { Pipe, PipeTransform } from '@angular/core';

enum Filter {
	all = 'all',
	completed = 'completed',
	inprogress = 'inprogress',
}

const filtersMap = {
	[Filter.all]: () => true,
	[Filter.completed]: (item: any) => item.done,
	[Filter.inprogress]: (item: any) => !item.done,
};

@Pipe({ name: 'filter' })
export class FilterPipe implements PipeTransform {
	public transform(items: any[], searchText: any): any[] {
		if (!items) { return []; }
		if (!searchText) { return items; }
		searchText = searchText.toLocaleLowerCase();
		if (Object.values(Filter).includes(searchText)) {
			return items.filter(filtersMap[searchText]);
		} else {
			return items.filter((item: any) => item.title.toLocaleLowerCase().includes(searchText));
		}
	}
}
