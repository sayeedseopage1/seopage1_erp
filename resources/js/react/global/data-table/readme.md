# columns structure

*  id:
    type: string
    unique: true,

* heading: 
    type: string

* moveable: 
    type: boolean

* sort: 
    type: function,
    Number of parameter 1, 
        type: object; 
        value: current row value
    return string;
* rowSpan:
    type: 'enum'
    value: 1,2

* searchText: 
    type: function,
    Number of parameter 1, 
        type: object; 
        value: current row value
    return string;

* row
    type: function,
    Number of parameter 1, 
        type: object; 
        contain: {row, table, parent}
        return string or jsx;

