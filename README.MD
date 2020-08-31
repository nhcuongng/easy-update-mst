# Easy Update State On Mobx State Tree

*For anyone, who use Mobx and mobx state tree.*

## Why you should use this package?

Normally, in Mobx state tree (MST) if you want to change state of tree/node, you must write so many functions to change them.

For example:

```ts
export const Item = types
  .model("Item", {
    title: types.string,
    price: types.string
  })
  .actions((self) => ({
    changeTitle: (title: string) => {
      self.title = title;
    },
    changePrice: (price: string) => {
      self.price = price;
    }
  }))
```

if you have **n** properties, you must write **n** functions to change them (like ```changeTitle``` and ```changePrice``` in above example), which can make you feel tired because of the long code.

My package is solution. With my package, we can be "lazy", avoid writing so many functions.

## Usage/Examples

In your model

```ts
import { types, Instance } from "mobx-state-tree";
import { ActionUpdate } from 'easy-update-mst';

export const UserModel = types.model("User Model", {
  id: types.identifier,
  name: types.string,
  job: types.model({
    code: types.optional(types.string, 'Javascript'),
    exp: types.optional(types.number, 1.5),
  })
})
  .actions(() => ({
    doSomething() {
      // another action
    }
  }))
  .actions(ActionUpdate); // inject action update to model
```

Now in your component you can use function ```setMobxState``` and ```setMobxDeepState``` to change state.
For example:

```ts
export const UserEntry: React.FC<TProp> = observer(({ user }) => {
  const { name, job, id, setMobxState, setMobxDeepState } = user;

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMobxState({ name: e.target.value });
  };

  const onChangejobLang = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMobxDeepState('job.code', e.target.value)
  };

  const onChangeJobExp = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMobxDeepState('job.exp', Number(e.target.value))
  };

  return (
    <div>
      id: {id}
      <br />
      Name: <input value={name} onChange={onChangeName} />
      <br />
      Job:
      <div style={{  margin: "5px 3px" ,paddingLeft: '10px', borderLeft: '2px solid #ccc' }}>
        Language: <input value={job.code} onChange={onChangejobLang} />
        <br />
        Exp: <input value={job.exp} onChange={onChangeJobExp} type="number" />
      </div>
    </div>
  );
});
```

You can see this [example](https://github.com/nhcuongng/easy-update-mst/tree/master/example).

## Thanks to

- Mobx and Mobx state tree team for ideas.
- **Ernesto Freyre** for awesome [post](https://levelup.gitconnected.com/create-a-npm-module-with-typescript-c99bd0686f69).
- [beau](http://beau.vn/) for everything.
- **#tinaphamhoney** for the translation.

**Author**: [CuongNguyenHuu](https://www.facebook.com/cuong.nguyenhuu.1441/)
