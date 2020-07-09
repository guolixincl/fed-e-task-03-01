const allDatas = [
	{
		id: 3,
		name: 'bbbb',
		parendId: null
	},
	{
		id: 2,
		name: 'aaaaa',
		parendId: null
	},
	{
		id: 4,
		name: 'ggggg',
		parendId: 2
	},
	{
		id: 5,
		name: 'hhhhh',
		parendId: 1
	},
	{
		id: 6,
		name: 'jjjj',
		parendId: 3
	},
	{
		id: 1,
		name: 'ccc',
		parendId: null
	}
]

const result = []
const temp = {}
allDatas.forEach((data) => {
	if (!data.parendId) {
		result.push(data)
	} else {
		temp[data.parendId] = data
	}
})
result.forEach((item) => {
	item.children = [ temp[item.id] ]
})

console.dir(JSON.stringify(result))
