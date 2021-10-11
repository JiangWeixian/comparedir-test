# comparedir-test
*compare dir in jest*

[![npm](https://img.shields.io/npm/v/comparedir-test)](https://github.com/JiangWeixian/comparedir-test) [![GitHub](https://img.shields.io/npm/l/comparedir-test)](https://github.com/JiangWeixian/comparedir-test)

## usage

```console
pnpm i comparedir-test
```

### `compare files count`

```ts
const fixtures = (type) => [
  path.resolve(__dirname, './fixtures', type, 'a'),
  path.resolve(__dirname, './fixtures', type, 'b'),
]
it('file content not match should return false', async () => {
  await compare(...fixtures('files-content-not-match'), {})
})
```

### `compare files content`

```ts
const fixtures = (type) => [
  path.resolve(__dirname, './fixtures', type, 'a'),
  path.resolve(__dirname, './fixtures', type, 'b'),
]
it('file content&count match should return true', async () => {
  await compare(...fixtures('basic'), {})
})
```
