import { ITodo } from '../models/todo.model';
import { FilterPipe } from "./filter.pipe";

const pipe = new FilterPipe();

const items: ITodo[] = [
    { id: 'test-1-id-1', title: 'Test Todo 1', done: true, edit: false },
    { id: 'test-1-id-2', title: 'Test Todo 2', done: false, edit: true },
];

describe('Testing FilterPipe - Search Filter', () => {

    it('transforms 1', () => {
        expect(pipe.transform(items, '1').length).toBe(1);
    });

    it('transforms 2', () => {
        expect(pipe.transform(items, 'Test').length).toBe(2);
    });

    it('transforms 3', () => {
        expect(pipe.transform(items, '')).toEqual(items);
    });

    it('transforms 4', () => {
        expect(pipe.transform([], '')).toEqual([]);
    });

});

describe('Testing FilterPipe - Pills Filter', () => {

    it('transforms 5', () => {
        expect(pipe.transform(items, 'inprogress').length).toEqual(1);
    });

    it('transforms 6', () => {
        expect(pipe.transform(items, 'completed').length).toEqual(1);
    });

    it('transforms 7', () => {
        expect(pipe.transform(items, 'all').length).toEqual(2);
    });

});