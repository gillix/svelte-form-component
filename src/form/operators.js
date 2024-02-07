const operators = {
    equal: (a, b) => a === b,
    contains: (a, b) => {
        if (typeof a !== 'string' || typeof b !== 'string') {
            throw `Invalid type of operands of operator 'contains': searching '${a}' in '${b}'`;
        }
        return b.includes(a);
    },
    regexp: (a, b) => {
        if (typeof a !== 'string' || typeof b !== 'string') {
            throw `Invalid type of operands of operator 'regexp': matching pattern '${a}' to '${b}'`;
        }
        return (new RegExp(a)).test(b);
    },
    in: (a, b) => {
        if (!Array.isArray(a)) {
            throw "Invalid type of second operand of operator 'in': must be array of values";
        }
        return a.includes(b);
    },
    not_equal: (a, b) => !operators.equal(a, b),
    not_in: (a, b) => !operators.in(a, b),
    not_contains: (a, b) => !operators.contains(a, b),
};

export default operators;
