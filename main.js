class HashTable {
    constructor() {
        this.table = new Array(127);
        this.size = 0;
    }

    hash(key) {
        let hash = 0;
        for (let i = 0; i < key.length; i++) {
            hash += key.charCodeAt(i);
        }
        return hash % this.table.length;
    }

    hashTwo(key) {
        let hash = Array.from(key).reduce((sum, key) => {
            return sum + key.charCodeAt(0);
        }, 0);
        return hash % this.table.length;
    }

    set(key, value) {
        const index = this.hash(key);
        if (this.table[index]) {
            for (let i = 0; i < this.table[index].length; i++) {
                if (this.table[index][i][0] === key) {
                    this.table[index][i][1] = value;
                    return;
                }
            }
            this.table[index].push([key, value]);
        } else {
            this.table[index] = [];
            this.table[index].push([key, value]);
        }
        this.size++;
    }
    setTwo(key, value) {
        const index = this.hashTwo(key);
        if (this.table[index]) {
            for (let i = 0; i < this.table[index].length; i++) {
                if (this.table[index][i][0] === key) {
                    this.table[index][i][1] = value;
                    return;
                }
            }
            this.table[index].push([key, value]);
        } else {
            this.table[index] = [];
            this.table[index].push([key, value]);
        }
        this.size++;
    }

    get(key) {
        const index = this.hash(key);
        if (this.table[index]) {
            for (let i = 0; i < this.table.length; i++) {
                if (this.table[index][i][0] === key) {
                    return this.table[index][i][1];
                }
            }
        }
        return undefined;
    }

    remove(key) {
        const index = this.hash(key);

        if (this.table[index] && this.table[index].length) {
            for (let i = 0; i < this.table.length; i++) {
                if (this.table[index][i][0] === key) {
                    this.table[index].splice(i, 1);
                    this.size--;
                    return true;
                }
            }
        } else {
            return false;
        }
    }

    display() {
        this.table.forEach((values, index) => {
            const chainedValues = values.map(
                ([key, value]) => `[ ${key}: ${value} ]`
            );
            console.log(`${index}: ${chainedValues}`);
        });
    }
}

class HashTableLinear {
    constructor() {
        this.table = new Array(127);
        this.size = 0;
    }

    hash(key) {
        let hash = 0;
        for (let i = 0; i < key.length; i++) {
            hash += key.charCodeAt(i);
        }
        return hash % this.table.length;
    }

    set(key, value) {
        let index = this.hash(key);
        if (this.table[index]) {
            while (!!this.table[index]) index += 1
            this.table[index] = [];
            this.table[index].push([key, value]);
        } else {
            this.table[index] = [];
            this.table[index].push([key, value]);
        }
        this.size++;
    }

    display() {
        this.table.forEach((values, index) => {
            const chainedValues = values.map(
                ([key, value]) => `[ ${key}: ${value} ]`
            );
            console.log(`${index}: ${chainedValues}`);
        });
    }
}

var generate = document.getElementById('generate')
var search = document.getElementById('search')
var insert = document.getElementById('insert')
var remove = document.getElementById('delete')
var compare = document.getElementById('compare')
var linear = document.getElementById('linear')

var ht

generate.onclick = () => {
    ht = new HashTable();
    const length = parseFloat(prompt('Введите размер'))
    generateRandom(length, 1)
    ht.display()
}
const generateRandom = (length, variant) => {
    let i = 0;
    const valueArr = _.shuffle(_.range(1, 1001)).slice(0, length)

    while (i < length) {
        if (variant == 1) {
            ht.set(chance.word(), valueArr[i])
        } else {
            ht.setTwo(chance.word(), valueArr[i])
        }
        i++
    }
}
search.onclick = () => {
    let key = prompt('Что найти?')
    console.log('Значение ' + ht.get(key))
    console.log('Индекс ' + ht.hash(key))
}
insert.onclick = () => {
    let key = prompt('Ключ:')
    let value = prompt('Значение:')
    console.log(ht.set(key, value))
    ht.display()
}
remove.onclick = () => {
    let key = prompt('Что удалить?')
    console.log(ht.size);
    ht.remove(key)
    console.log(ht.size);
    ht.display()
}
compare.onclick = () => {
    ht = new HashTable();
    const length = parseFloat(prompt('Введите размер'))
    let start = new Date().getTime();
    generateRandom(length, 1)
    let end = new Date().getTime();
    console.log(`Первая функция: ${end - start}ms`);
    start = new Date().getTime();
    generateRandom(length, 2)
    end = new Date().getTime();
    console.log(`Вторая функция: ${end - start}ms`);
}
linear.onclick = () => {
    ht = new HashTableLinear();
    const length = parseFloat(prompt('Введите размер'))
    generateRandom(length, 1)
    ht.display()
}