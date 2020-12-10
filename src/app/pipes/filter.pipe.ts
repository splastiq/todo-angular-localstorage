import { Pipe, PipeTransform } from '@angular/core';
import { ITodo } from '../models/todo.model';

enum Filter {
	all = 'all',
	completed = 'completed',
	inprogress = 'inprogress',
}

const filtersMap = {
	[Filter.all]: () => true,
	[Filter.completed]: (item: ITodo) => item.done,
	[Filter.inprogress]: (item: ITodo) => !item.done,
};

@Pipe({ name: 'filter' })
export class FilterPipe implements PipeTransform {
	public transform(items: ITodo[], searchText: any): ITodo[] {
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
