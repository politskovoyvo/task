import { A11yModule } from '@angular/cdk/a11y';

export { };

declare global {
  interface Math {
    /**
     * Get a random integer between `min` and `max`.
     *
     * @param min - min number
     * @param max - max number
     * @return number a random integer
     */
    randomRange(min: number, max: number): number;
  }

  interface String {
    contains(predicate: string): boolean;
  }

  // interface Object {
  //   isEqual(p): boolean;
  // }

  interface Array<T> {
    leftJoin(inner: Array<T>, pk?: any, fk?: any): Array<T>;

    /**
     * Возвращает минимальное значение, содержащееся в последовательности значений.
     * @param predicate - function
     */
    minBy(predicate?: (value: T) => unknown): T;

    /**
     * Возвращает максимальное значение, содержащееся в последовательности значений.
     * @param predicate - function
     */
    maxBy(predicate?: (value: T) => unknown): T;

    /**
     * Сортирует элементы последовательности в порядке возрастания.
     * @param predicate - function
     */
    sortBy(predicate?: (value: T) => unknown): Array<T>;

    /**
     * Сортирует элементы последовательности в порядке возрастания.
     * @param predicate - function
     */
    sortSearch(predicate?: (value: T) => unknown, search?): Array<T>;

    /**
     * Возвращает различающиеся элементы последовательности.
     * @param selector - function
     */
    distinct(selector?: (x: T) => unknown): Array<T>;

    differenceWith(array: T[], predicate?: (left: T, right: T) => boolean): Array<T>;

    unionWith(array: T[], predicate?: (left: T, right: T) => boolean): Array<T>;

    /**
     * Группирует элементы последовательности.
     * @param predicate - function
     */
    groupBy(predicate?: (value: T) => unknown): { [key: string]: Array<T> };

    /**
     * Группирует элементы последовательности.
     * @param predicate - function
     */
    groupBy(predicate?: (value: T) => unknown): { [key: number]: Array<T> };

    /**
     * Проецирует каждый элемент последовательности в объект Array<T> и объединяет результирующие последовательности в одну последовательность.
     * @param predicate - function
     */
    selectMany(predicate?: (value: T) => unknown): Array<T>;
  }

  interface Date {
    addDays(days: number): Date;

    addHours(hours: number): Date;

    daysInMonth(): number;
  }
}

String.prototype.contains = function <T>(predicate: string): boolean {
  return this.indexOf(predicate) !== -1;
};

Array.prototype.maxBy = function <T>(predicate?: (value: T) => unknown): T {
  return this.reduce((a, b) => ((predicate ? predicate(a) : a) >= (predicate ? predicate(b) : b) ? a : b), {});
};

Array.prototype.selectMany = function <T>(predicate?: (value: T) => unknown): T {
  return this.map(predicate).reduce((arr, curr) => arr.concat(curr), []);
};


Math.randomRange = (min, max): number => {
  if (isNaN(+min)) {
    throw new Error('Min должен быть числом');
  }
  if (isNaN(+max)) {
    throw new Error('Max должен быть числом');
  }
  if (+min > +max) {
    throw new Error('Max должен быть меньше либо равен min');
  }
  return Math.floor(Math.random() * (+max - +min + 1) + +min);
};

// Object.prototype.isEqual = function <T>(p): boolean {
//   const keysO = Object.keys(this).sort();
//   const keysP = Object.keys(p).sort();
//   if (keysO.length !== keysP.length) {
//     return false;
//   }// not the same nr of keys
//   if (keysO.join('') !== keysP.join('')) {
//     return false;
//   }// different keys
//   for (let i = 0; i < keysO.length; ++i) {
//     if (this[keysO[i]] instanceof Array) {
//       if (!(p[keysO[i]] instanceof Array)) {
//         return false;
//       }
//       // if (compareObjects(o[keysO[i]], p[keysO[i]] === false) return false
//       // would work, too, and perhaps is a better fit, still, this is easy, too
//       if (p[keysO[i]].sort().join('') !== this[keysO[i]].sort().join('')) {
//         return false;
//       }
//     } else if (this[keysO[i]] instanceof Date) {
//       if (!(p[keysO[i]] instanceof Date)) {
//         return false;
//       }
//       if (('' + this[keysO[i]]) !== ('' + p[keysO[i]])) {
//         return false;
//       }
//     } else if (this[keysO[i]] instanceof Function) {
//       if (!(p[keysO[i]] instanceof Function)) {
//         return false;
//       }
//       // ignore functions, or check them regardless?
//     } else if (this[keysO[i]] instanceof Object) {
//       if (!(p[keysO[i]] instanceof Object)) {
//         return false;
//       }
//       if (this[keysO[i]] === this) {// self reference?
//         if (p[keysO[i]] !== p) {
//           return false;
//         }
//       } else if (this[keysO[i]].isEqual(p[keysO[i]]) === false) {
//         return false;
//       }// WARNING: does not deal with circular refs other than ^^
//     }
//     if (this[keysO[i]] !== p[keysO[i]]) {// change !== to != for loose comparison
//       return false;
//     }// not the same value
//   }
//   return true;
// };

Array.prototype.differenceWith = function <T>(array: T[], predicate?: (left: T, right: T) => boolean): Array<T> {
  return [this, array].reduce((a, b) => a.filter((c) => (predicate ? !b.some((d) => predicate(d, c)) : b.includes(c))));
};

Array.prototype.unionWith = function <T>(array: T[], predicate?: (left: T, right: T) => boolean): Array<T> {
  return [this, array].reduce((a, b) => a.filter((c) => (predicate ? b.some((d) => predicate(d, c)) : b.includes(c))));
};

Array.prototype.groupBy = function <T>(predicate?: (value: T) => unknown): { [key: string]: Array<T> } {
  const map: { [key: string]: Array<T> } = {};
  this.forEach((item) => {
    const key = predicate ? `${predicate(item)}` : item;
    const collection = map[key];
    if (!collection) {
      map[key] = [item];
    } else {
      map[key] = [...map[key], item];
    }
  });
  return map;
};

Array.prototype.minBy = function <T>(predicate?: (value: T) => unknown): T {
  return this.reduce((a, b) => ((predicate ? predicate(a) : a) <= (predicate ? predicate(b) : b) ? a : b), {});
};

Array.prototype.sortBy = function <T>(predicate?: (value: T) => unknown): Array<T> {
  return this.sort((a, b) =>
    (predicate ? predicate(a) : a) > (predicate ? predicate(b) : b)
      ? 1
      : (predicate ? predicate(b) : b) > (predicate ? predicate(a) : a)
        ? -1
        : 0,
  );
};

Array.prototype.sortSearch = function <T>(predicate?: (value: T) => unknown, search?): Array<T> {
  return this.sort((a, b) => {
    const ap = ((predicate ? predicate(a) : a).toLowerCase().indexOf(search.toLowerCase()) === 0 ? '\x00' : '') + (predicate ? predicate(a) : a);
    const bp = ((predicate ? predicate(b) : b).toLowerCase().indexOf(search.toLowerCase()) === 0 ? '\x00' : '') + (predicate ? predicate(b) : b);
    return ap > bp ? 1 : bp > ap ? -1 : 0;
  });
};

Array.prototype.distinct = function <T>(selector?: (x: T) => unknown): Array<T> {
  if (!selector) {
    return Array.from<T>(new Set(this));
  }
  const result = [];
  const resultIndex = [];
  const selectedItems = this.map(selector);
  selectedItems.forEach((el, index) => {
    if (!resultIndex.includes(el)) {
      resultIndex.push(el);
      result.push(this[index]);
    }
  });
  return result;
};

Array.prototype.leftJoin = function <T>(array: Array<T>, primaryKey?, foreignKey?): Array<T> {
  const arr = [];
  primaryKey = primaryKey || ((a) => a);
  foreignKey = foreignKey || ((b) => b);

  // tslint:disable-next-line:prefer-for-of
  for (let l = 0; l < this.length; l++) {
    let wasFound = false;
    // tslint:disable-next-line:prefer-for-of
    for (let r = 0; r < array.length; r++) {
      const isMatch = primaryKey(this[l]) === foreignKey(array[r]);
      if (isMatch) {
        wasFound = true;
        arr.push(Object.assign(this[l], array[r]));
      }
    }
  }

  return arr;
};

Date.prototype.addDays = function (days: number): Date {
  const date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

Date.prototype.addHours = function (hours: number): Date {
  const date = new Date(this.valueOf());
  date.setTime(date.getTime() + hours * 60 * 60 * 1000);
  return date;
};

Date.prototype.daysInMonth = function(): number {
    return 33 - new Date(this.getFullYear(), this.getMonth(), 33).getDate();
};
