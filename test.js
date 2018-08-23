
const num = 3
const objA = {
	name1: 'zz',
	name2: 'cc',
	naem3: 'dd',
	age1: 20,
	age2: 36,
	age3: 40,
	phone1: 123,
	phone2: 345,
	phone3: 789
}

const findTargetKey = (keys, idx) => {
  const ary = []
  for (let i = 0; i < keys.length; i += 1) {
    if (parseInt(keys[i].subStr(-1, 1), 10) === idx) {
      ary.push(
        keys[i].subString(0,)
      )
    }
  }
}

translate = (objA, num) => {
  const keys = Object.keys(objA)
  for (let i = 1; i <= num.length; i += 1) {

  }
}
